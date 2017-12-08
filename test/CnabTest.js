import moment from 'moment';

import Layout from '../src/Parser/Layout';
import Remessa from '../src/Model/Remessa';
import RemessaFile from '../src/Output/RemessaFile';

module.exports = () => {
    const remessaLayout = new Layout(341, '240', 'cobranca', './test/layoutsTest');
    let remessa = new Remessa(remessaLayout);

    remessa.header.set('codigo_banco', 341);
    remessa.header.set('tipo_inscricao', 2);
    remessa.header.set('inscricao_numero', '05346078000186');
    remessa.header.set('agencia', 2932);
    remessa.header.set('conta', 24992);
    remessa.header.set('dac', 9);
    remessa.header.set('nome_empresa', 'MACWEB SOLUTIONS LTDA');
    remessa.header.set('data_geracao', moment().format('YYYY-MM-DD'));
    remessa.header.set('hora_geracao', moment().format('HHmmss'));
    remessa.header.set('numero_sequencial_arquivo_retorno', 1);


    // criar um novo lote de serviço para a remessa
    // informando o código sequencial do lote
    let lote = remessa.novoLote(1);

    lote.header.set('codigo_banco', 341);
    lote.header.set('lote_servico', lote.sequencial);
    lote.header.set('tipo_registro', 1);
    lote.header.set('tipo_operacao', 'R');
    lote.header.set('tipo_servico', '01');
    lote.header.set('zeros_01', 0);
    lote.header.set('versao_layout_lote', '030');
    lote.header.set('brancos_01', '');
    lote.header.set('tipo_inscricao', 2);
    lote.header.set('inscricao_empresa', '05346078000186');
    lote.header.set('brancos_02', '');
    lote.header.set('zeros_02', 0);
    lote.header.set('agencia', 2932);
    lote.header.set('brancos_03', '');
    lote.header.set('zeros_03', 0);
    lote.header.set('conta', '24992');
    lote.header.set('brancos_04', '');
    lote.header.set('dac', 9);
    lote.header.set('nome_empresa', 'MACWEB SOLUTIONS LTDA');
    lote.header.set('brancos_05', '');
    lote.header.set('numero_sequencial_arquivo_retorno', 1);
    lote.header.set('data_gravacao', moment().format('YYYY-MM-DD'));
    lote.header.set('data_credito', moment().format('YYYY-MM-DD'));
    lote.header.set('brancos_06', '');

    let detalhe = lote.novoDetalhe();
    detalhe.segmento_p.lote_servico = lote.sequencial;
    detalhe.segmento_p.numero_sequencial_registro_lote = 1;
    detalhe.segmento_p.codigo_ocorrencia = '01';
    detalhe.segmento_p.agencia = 2932;
    detalhe.segmento_p.conta = 24992;
    detalhe.segmento_p.dac = 9;
    detalhe.segmento_p.carteira = 109;
    detalhe.segmento_p.nosso_numero = 12345678;
    detalhe.segmento_p.dac_nosso_numero = 3;
    detalhe.segmento_p.numero_documento = 1;
    detalhe.segmento_p.vencimento = '2016-05-10';
    detalhe.segmento_p.valor_titulo = 1000;
    detalhe.segmento_p.agencia_cobradora = 0;
    detalhe.segmento_p.dac_agencia_cobradora = 0;
    detalhe.segmento_p.especie = '05';
    detalhe.segmento_p.aceite = 'N';
    detalhe.segmento_p.data_emissao = moment().format('YYYY-MM-DD');
    detalhe.segmento_p.data_juros_mora = '2016-05-11';
    detalhe.segmento_p.juros_1_dia = 0;
    detalhe.segmento_p.data_1o_desconto = '00000000';
    detalhe.segmento_p.valor_1o_desconto = 0;
    detalhe.segmento_p.valor_iof = 38;
    detalhe.segmento_p.valor_abatimento = 0;
    detalhe.segmento_p.identificacao_titulo_empresa = '';
    detalhe.segmento_p.codigo_negativacao_protesto = 0;
    detalhe.segmento_p.prazo_negativacao_protesto = 0;
    detalhe.segmento_p.codigo_baixa = 0;
    detalhe.segmento_p.prazo_baixa = 0;

    //segmento q
    detalhe.segmento_q.lote_servico = lote.sequencial;
    detalhe.segmento_q.numero_sequencial_registro_lote = 2;
    detalhe.segmento_q.codigo_ocorrencia = '01';
    detalhe.segmento_q.tipo_inscricao = 2;
    detalhe.segmento_q.inscricao_numero = '05346078000186';
    detalhe.segmento_q.nome_pagador = 'GLAUBER PORTELLA';
    detalhe.segmento_q.logradouro = 'RUA ALVARENGA';
    detalhe.segmento_q.bairro = 'GUARANI';
    detalhe.segmento_q.cep = 31814;
    detalhe.segmento_q.sufixo_cep = 500;
    detalhe.segmento_q.cidade = 'BELO HORIZONTE';
    detalhe.segmento_q.uf = 'MG';
    detalhe.segmento_q.tipo_inscricao_sacador = 2;
    detalhe.segmento_q.inscricao_sacador = '05346078000186';
    detalhe.segmento_q.nome_sacador = 'MACWEB SOLUTIONS LTDA';

    delete detalhe.segmento_r;
    delete detalhe.segmento_y;

    lote.inserirDetalhe(detalhe);

    lote.trailer.set('lote_servico', lote.sequencial);
    lote.trailer.set('quantidade_registros_lote', 2);
    lote.trailer.set('quantidade_cobranca_simples', 1);
    lote.trailer.set('valor_total_cobranca_simples', 10000);
    lote.trailer.set('quantidade_cobranca_vinculada', 0);
    lote.trailer.set('valor_total_cobranca_vinculada', 0);
    lote.trailer.set('aviso_bancario', '00000000');

    remessa.inserirLote(lote);


    remessa.trailer.set('total_lotes', 1);
    remessa.trailer.set('total_registros', 6);

    const remessaFile = new RemessaFile(remessa);
    remessaFile.generate(`./test/out/CB${moment().format('DDMMYY')}.txt`);
};