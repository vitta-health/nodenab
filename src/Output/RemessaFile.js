import fs from 'fs';
import path from 'path';
import IntercambioBancarioRemessaFileAbstract from '../IntercambioBancarioRemessaFileAbstract'

module.exports = class RemessaFile extends IntercambioBancarioRemessaFileAbstract {
    static get CNAB_EOL() {
        return '\r\n';
    }

    generate() {
        let headerArquivo = this._encodeHeaderArquivo();
        let lotes = this._encodeLotes();
        let trailerArquivo = this._encodeTrailerArquivo();

        let data = [headerArquivo, lotes, trailerArquivo].join(RemessaFile.CNAB_EOL);
        data += RemessaFile.CNAB_EOL;

        return data;
    }

    _encodeHeaderArquivo() {
        if (!this._model.header) return;

        let layout = this._model.getLayout();
        let layoutRemessa = layout.getRemessaLayout();

        return this._encode(layoutRemessa['header_arquivo'], this._model.header._data);
    }

    _encodeLotes() {
        let encoded = [];

        this._model.lotes.forEach((lote) => {
            if (lote.header) {
                encoded.push(this._encodeHeaderLote(lote));
            }

            encoded.push(this._encodeDetalhes(lote));

            if (lote.trailer) {
                encoded.push(this._encodeTrailerLote(lote));
            }
        });

        return encoded.join(RemessaFile.CNAB_EOL);
    }

    _encodeHeaderLote(model) {
        if (!model.header) {
            return;
        }

        let layout  = model.getLayout();

        return this._encode(layout['header_lote'], model.header._data);
    }

    _encodeDetalhes(model) {
        if (!model.detalhes) {
            return;
        }

        let layout = model.getLayout();
        let encoded = [];

        model.detalhes.forEach((detalhe) => {
            Object.keys(detalhe).forEach((segmento) => {
               let segmentoEncoded =  this._encode(layout['detalhes'][segmento], detalhe[segmento]);
               encoded.push(segmentoEncoded);
            });
        });

        return encoded.join(RemessaFile.CNAB_EOL);
    }

    _encodeTrailerLote(model) {
        if (!model.trailer) {
            return;
        }

        let layout = model.getLayout();

        return this._encode(layout['trailer_lote'], model.trailer._data);
    }

    _encodeTrailerArquivo() {
        if (!this._model.trailer) {
            return;
        }

        let layout = this._model.getLayout();
        let layoutRemessa = layout.getRemessaLayout();

        return this._encode(layoutRemessa['trailer_arquivo'], this._model.trailer._data);
    }
};