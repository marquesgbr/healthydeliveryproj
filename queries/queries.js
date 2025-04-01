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