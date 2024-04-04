const { json } = require('express'); 
const db = require('../database/connection'); 

module.exports = {
    async listarProdutos(request, response) {
        try {

            // instruções SQL
            const sql = `SELECT * FROM produtos`;
            // executa instruções SQL e armazena o resultado na variável usuários
            const produtos = await db.query(sql);
            // armazena em uma variável o número de registros retornados
            const nItens = produtos[0].length;            

            // throw new Error('Eu causei o erro!');
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de produtos.', 
                dados: produtos[0],
                nItens
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async cadastrarProdutos(request, response) {
        try {

            // parâmetros recebidos no corpo da requisição
            const { prd_id, prd_nome, prd_valor, prd_unidade, ptp_id, prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao } = request.body;
            // instrução SQL
            const sql = `INSERT INTO produtos 
                (prd_id, prd_nome, prd_valor,prd_unidade, ptp_id, prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            // definição dos dados a serem inseridos em um array
            const values = [prd_id, prd_nome, prd_valor,prd_unidade, ptp_id, prd_disponivel, prd_img, prd_destaque, prd_img_destaque, prd_descricao];
            // execução da instrução sql passando os parâmetros
            const execSql = await db.query(sql, values);
            // identificação do ID do registro inserido
            const pd_id = execSql[0].insertId;

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de produtos.', 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async editarProdutos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Editar produtos.', 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
    async apagarProdutos(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Apagar produtos.', 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: `Erro na requisição. -${error}`, 
                dados: null
            });
        }
    }, 
}

