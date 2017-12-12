const moment = require('moment');

module.exports = class Picture {
    static get REGEX_VALID_FORMAT() {
        return /([X9])\((\d{0,})\)((V9)\((\d{0,})\)?)?/g;

    }

    static _validarData(value) {
        return `${value}`.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
    }

    /**
     * Valida o formato de um campo de acordo com sua picture
     * @param format {String} Formato do campo
     * @return {boolean}
     */
    static validarFormato(format) {
        return format.match(Picture.REGEX_VALID_FORMAT).length >= 0;
    }

    /**
     * Retorna o tamanho do campo dado seu formato
     * @param format {String} Formato do campo
     * @return {number}
     */
    static getLength(format) {
        let lengthMatches;

        if (lengthMatches = Picture.REGEX_VALID_FORMAT.exec(format)) {
            return +(lengthMatches[2] || 0) + +(lengthMatches[5] || 0);
        } else {
            throw new Error(`O padrão (${format}) não é um formato válido`);
        }
    }

    /**
     * Formata uma string para retornar somente números
     * @param value {String} Valor para formatar
     * @return {string}
     */
    static parseNumber(value) {
        return `${value}`.replace(/[^0-9.]/g, '').replace(/^0+/g, '') || '0';
    }

    /**
     * Encoda um valor baseado em um formato de picture de campo
     * @param value {*} Valor de entrada para o formato
     * @param format {String} Formato do campo do valor de entrada
     * @param options {Object} Opções adicionais do campo
     * @return {*}
     */
    static encode(value, format, options = {}) {
        let matches;

        if (matches = Picture.REGEX_VALID_FORMAT.exec(format)) {
            if (matches[1] === 'X' && !matches[4]) {
                return `${value}`.substr(0, +(matches[2] || 0)).padEnd(+(matches[2] || 0), ' ');
            } else if (matches[1] === '9') {
                let numericValue = value;
                if (Picture._validarData(value)) {
                    if (options.dateFormat) {
                        numericValue = moment(value).format(options.dateFormat);
                    } else {
                        if (+(matches[2] || 0) === 8) {
                            numericValue = moment(value).format('DDMMYYYY');
                        }
                        if (+(matches[2] || 0) === 6) {
                            numericValue = moment(value).format('DDMMYY');
                        }
                    }
                }

                if (isNaN(+numericValue)) {
                    throw new Error(`O valor (${numericValue}) informado deve ser um número no formato ${format}`);
                }

                numericValue = Picture.parseNumber(numericValue);
                let numericExpression = numericValue.split('.');

                if (numericExpression[1] === undefined) {
                    numericExpression[1] = '0';
                }

                if (matches[4] === 'V9') {
                    let tamanhoLeft = +(matches[2] || 0);
                    let tamanhoRigth = +(matches[5] || 0);
                    let valorLeft = numericExpression[0].padStart(tamanhoLeft, '0');

                    if (numericExpression[1].length > tamanhoRigth) {
                        let extra = numericExpression[1].length - tamanhoRigth;
                        let extraPow = Math.pow(10, extra);

                        numericExpression[1] = `${Math.round(numericExpression[1] / extraPow)}`;
                    }

                    let valorRigth = numericExpression[1].padEnd(tamanhoRigth, '0');

                    return `${valorLeft}${valorRigth}`
                } else if (!matches[4]) {
                    return Picture.parseNumber(numericValue).padStart(+(matches[2] || 0), '0');
                } else {
                    throw new Error(`O padrão (${format}) não é um formato válido`);
                }
            }
        }
    }

    /**
     * Decoda um valor baseado em um formato de picture de campo
     * @param value {*} Valor de entrada para o decode
     * @param format {String} Formato do campo do valor de entrada
     * @param options {Object} Opções adicionais do campo
     * @return {*}
     */
    static decode(value, format, options = {}) {
        let matches;

        if (matches = Picture.REGEX_VALID_FORMAT.exec(format)) {
            if (matches[1] === 'X' && !matches[4]) {
                return value.replace(/\s{1,}$/g, '');
            } else if (matches[1] === '9') {
                if (matches[4] === 'V9') {
                    let tamanhoLeft = +(matches[2] || 0);
                    let tamanhoRigth = +(matches[5] || 0);
                    let valorLeft = Picture.parseNumber(value.substr(0, tamanhoLeft));
                    let valorRigth = `0.${value.substr(tamanhoLeft, tamanhoRigth)}`;

                    if (+(valorRigth) > 0) {
                        return +(valorLeft) +(valorRigth);
                    } else {
                        return +(Picture.parseNumber(valorLeft));
                    }
                } else if (!matches[4]) {
                    return +(Picture.parseNumber(value));
                } else {
                    throw new Error(`O padrão (${format}) não é um formato válido`);
                }
            }
        } else {
            throw new Error(`O padrão (${format}) não é um formato válido`);
        }
    }
};