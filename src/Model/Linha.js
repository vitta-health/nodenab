const Picture = require("../Format/Picture");

module.exports = class Linha {
  constructor(linhaStr, layout, tipo = "remessa") {
    this.linhaStr = linhaStr;
    this.layout = layout;
    this.tipo = tipo.toLowerCase();
  }

  getDadosSegmento(segmentoKey) {
    const layout =
      this.tipo === "remessa"
        ? this.layout.getRemessaLayout()
        : this.layout.getRetornoLayout();

    if (layout["detalhes"][segmentoKey] === undefined) {
      throw new Error(
        `Erro ao processar o seguimento ${segmentoKey}. Não foi possível identificar um layout válido para o mesmo`
      );
    }

    const campos = layout["detalhes"][segmentoKey];
    let dados = {};

    Object.keys(campos).forEach(nome => {
      dados[nome] = this.obterValorCampo(campos[nome]);
    });

    return dados;
  }

  obterValorCampo(definicao) {
    let tipo;

    if ((tipo = Picture.REGEX_VALID_FORMAT.exec(definicao["picture"]))) {
      const inicio = definicao["pos"][0] - 1;
      const tamanho = Picture.getLength(definicao["picture"]);

      return Picture.decode(
        this.linhaStr.substr(inicio, tamanho),
        definicao["picture"]
      );
    } else {
      throw new Error(
        `Erro ao obter valor de campo. O padrão (${format}) não é um formato válido`
      );
    }
  }

  getLayout() {
    return this.layout;
  }

  getTipo() {
    return this.tipo;
  }
};
