// Mostra o total de pedidos para cada categoria de item do cardápio
db.pedidos.aggregate([
    { $unwind: "$itens" },
    { 
        $lookup: {
            from: "cardapio",
            localField: "itens.item",
            foreignField: "_id",
            as: "detalheItem"
        }
    },
    { $unwind: "$detalheItem" },
    {
        $group: {
            _id: "$detalheItem.categoria",
            totalVendas: { $sum: "$itens.precoUnitario" },
            pedidosCount: { $sum: 1 }
        }
    },
    { $sort: { totalVendas: -1 } }
]);



// Lista todos os items do cardápio que só possuem ingredientes veganos mas NÃO estão na categoria vegano
db.cardapio.aggregate([
    {
      $lookup: {
        from: "ingredientes",
        localField: "ingredientes",
        foreignField: "_id",
        as: "detalhesIngredientes"
      }
    },
    {
        $match: {
            "detalhesIngredientes.vegano": { $eq : true },
            "categoria": { $ne: "Vegano" }
        }
    },
    {
      $project: {
        _id: 0,
        nome: 1,
        categoria: 1,
        "ingredientes": {
          $map: {
            input: "$detalhesIngredientes",
            as: "ing",
            in: "$$ing.nome"
          }
        }
      }
    }
]);



// procura os 3 clientes que têm mais pedidos
db.pedidos.aggregate([
    {
      $group: {
        _id: "$cliente",
        totalPedidos: { $sum: 1 },
        valorTotal: {
            $sum:{ $sum:{  //passa por cada pedido e pelos intens de cada produto somando o valor
                $map: {
                    input: "$itens", as: "item",
                    in: { $multiply: ["$$item.quantidade", "$$item.precoUnitario"] }
                }
            }}
        }
      }
    },
    {
        $lookup : {
            from: 'clientes',
            localField : '_id',
            foreignField: '_id',
            as : "cliente"
        }
    },
    { $sort: { totalPedidos: -1, valorTotal : -1 }},
    { $limit: 3 },
    {
        $project : {
            _id: 0,
            cliente : { $arrayElemAt: ["$cliente.nome", 0]},
            totalPedidos : 1,
            valorTotal : {$round: ["$valorTotal", 2]},
            valorMedio : {$round: [{$divide: ["$valorTotal", "$totalPedidos"]}, 2]},
        }
    }
]);



// Encontra os ingredientes mais caros e analisa métricas
db.ingredientes.aggregate([
  { $sort: { precoPorUn: -1 } },
  { $limit: 15 },
  { $group: {
      _id: "$tipo",
      totalIngredientes: { $count: {} },
      valorMaximoEstoque: { $max: { $multiply: ["$precoPorUn", "$estoque"]}},
      precoMedio: {$avg: "$precoPorUn"},
      ingredientes: { 
        $push: { 
          nome: "$nome", 
          preco: "$precoPorUn", 
          estoque: "$estoque" 
        } 
      }
  }},
  { $sort: { valorMaximoEstoque: -1, precoMedio: -1 } }
]).pretty();



// Atualizar os planos com as informacoes nutricionais, mas 
// somente aqueles que possuem os nomes corretos dos pratos na sua lista
db.planos.aggregate([
  {
      $lookup: {
          from: "cardapio",
          localField: "listaPratos",
          foreignField: "nome",
          as: "pratosFiltrados"
      }
  },
  {
      $match: { 
          $expr: { $eq: [{ $size: "$pratosFiltrados" }, { $size: "$listaPratos" }]}
      }
  },
  {
      $set: {
          intakeDiario: { $sum: "$pratosFiltrados.calorias" },
          macronutrientes: {
              proteinas: { $sum: "$pratosFiltrados.proteinas" },
              carboidratos: { $sum: "$pratosFiltrados.carboidratos" },
              gorduras: { $sum: "$pratosFiltrados.gorduras" }
          }
      }
  },
  { 
      $unset: "pratosFiltrados" 
  },
  {
      $merge: {
          into: "planos",
          whenMatched: "merge",
          whenNotMatched: "discard"
      }
  }
]);
//Para visualizar o resultado da query acima
db.planos.find({$exists: "intakeDiario"}).pretty();



// Encontra os pedidos com itens que têm mais de 30 reais de valor e
// que têm alguma avaliação, mostrando se ficaram satisfeitos ou não (nota>=4)
db.pedidos.aggregate([
  { $match: { "avaliacao": { $exists: true } } },
  { $lookup: {
      from: "clientes",
      localField: "cliente",
      foreignField: "_id",
      as: "clienteInfo"
  }},
  { $unwind: "$clienteInfo" },
  { $project: {
      _id: 0,
      nomeCliente: "$clienteInfo.nome",
      dataPedido: 1,
      itens: {
        $filter: {
          input: "$itens",
          as: "item",
          cond: { $gte: ["$$item.precoUnitario", 30] }
        }
      },
      avaliacao: 1,
      satisfacao: {
        $cond: {
          if: { $gte: ["$avaliacao.nota", 4] },
          then: "Cliente Satisfeito",
          else: "Necessita Atenção"
        }
      }
  }}
]);


// Buscar nome, quantidade de proteinas e preco depratos relacionados a proteína animal
// necessário criar índice antes (rodar uma vez após carregada base de dados):
db.cardapio.createIndex({ nome: "text", descricao: "text" });
db.cardapio.find(
  { $text: { $search: "frango salmão filé carne" } }, 
  { nome: 1, proteinas: 1, preco: 1, _id: 0 }     
).sort({ proteinas: -1 }).limit(5).pretty();  
