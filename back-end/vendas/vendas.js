const { query } = require('express')
const conn = require('../db/postgres.js')

function queryPromiseReturn(sql) {
  return new Promise((resolve, reject) => {
    conn().query(sql, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

function findAllByPeriodo(grupoBusca, inicioPeriodo, fimPeriodo) {
  return queryPromiseReturn(`
    WITH imagens_agrupadas AS (
    SELECT 
        produto_id_produto, 
        array_to_string(array_agg(i.nome), ', ') AS imagens
    FROM 
        imagem_produto i
    GROUP BY 
        produto_id_produto
)
SELECT 
	SUM(v.qtd_vendido) as total_vendido,
    p.id_produto, 
    p.nome, 
    p.descricao, 
    p.preco, 
    p.ativo, 
    p.data_criacao, 
    c.nome as categoria, 
    m.nome as marca, 
    CASE 
      WHEN g.nome = 'gamer' THEN 'para gamers'
      WHEN g.nome = 'servidor' THEN 'para empresas'
      WHEN g.nome = 'estudos' THEN 'para estudantes e professores'
      WHEN g.nome = 'trabalho' THEN 'para empresas'
      WHEN g.nome = 'alta performace' THEN 'para entusiastas'
      WHEN g.nome = 'dia_pais' then 'presentes para os pais'
      WHEN g.nome = 'dia_maes' then 'presentes para as mães'
      WHEN g.nome = 'dia_criancas' then 'presentes para as crianças'
      WHEN g.nome = 'dia_natal' then 'presentes de natal'
      WHEN g.nome = 'dia_trabalho' then 'equipe os seus funcionários'
      ELSE 'pode interessar' 
    END AS destaque,
    img.imagens
  FROM 
    produto p 
    LEFT JOIN categoria c ON c.id_categoria = p.categoria_id_categoria  
    LEFT JOIN marca m ON m.id_marca = p.marca_id_marca 
    LEFT JOIN imagens_agrupadas img ON img.produto_id_produto = p.id_produto 
    inner join grupo g on g.id_produto = p.id_produto and g.nome IN (${grupoBusca})
    left join vendas v on p.id_produto = v.id_produto and g.id_produto = v.id_produto
    where v.data_venda between '${inicioPeriodo}' and '${fimPeriodo}' 
  GROUP BY 
    destaque, p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome, m.nome, img.imagens
   order by total_vendido desc;
    `)
}

function insert(dados) {
  const { id_produto, qtd_vendido } = dados
  let sql = `INSERT INTO vendas (id_produto, qtd_vendido) VALUES (${id_produto}, ${qtd_vendido}) RETURNING id`
  return queryPromiseReturn(sql)
}

module.exports = {
  findAllByPeriodo,
  insert,
}
