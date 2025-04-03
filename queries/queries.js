// Mostra o total de pedidos para cada categoria de item do cardápio
db.pedidos.aggregate([
  { $unwind: "$itens" },
  {
    $lookup: {
      from: "cardapio",
      localField: "itens.item",
      foreignField: "_id",
      as: "detalheItem",
    },
  },
  { $unwind: "$detalheItem" },
  {
    $group: {
      _id: "$detalheItem.categoria",
      totalVendas: { $sum: "$itens.precoUnitario" },
      pedidosCount: { $sum: 1 },
    },
  },
  { $sort: { totalVendas: -1 } },
]);

// Lista todos os items do cardápio que só possuem ingredientes veganos mas NÃO estão na categoria vegano
db.cardapio.aggregate([
  {
    $lookup: {
      from: "ingredientes",
      localField: "ingredientes",
      foreignField: "_id",
      as: "detalhesIngredientes",
    },
  },
  {
    $match: {
      "detalhesIngredientes.vegano": { $eq: true },
      categoria: { $ne: "Vegano" },
    },
  },
  {
    $project: {
      _id: 0,
      nome: 1,
      categoria: 1,
      ingredientes: {
        $map: {
          input: "$detalhesIngredientes",
          as: "ing",
          in: "$$ing.nome",
        },
      },
    },
  },
]);

// procura os 3 clientes que têm mais pedidos
db.pedidos.aggregate([
  {
    $group: {
      _id: "$cliente",
      totalPedidos: { $sum: 1 },
      valorTotal: {
        $sum: {
          $sum: {
            //passa por cada pedido e pelos intens de cada produto somando o valor
            $map: {
              input: "$itens",
              as: "item",
              in: { $multiply: ["$$item.quantidade", "$$item.precoUnitario"] },
            },
          },
        },
      },
    },
  },
  {
    $lookup: {
      from: "clientes",
      localField: "_id",
      foreignField: "_id",
      as: "cliente",
    },
  },
  { $sort: { totalPedidos: -1, valorTotal: -1 } },
  { $limit: 3 },
  {
    $project: {
      _id: 0,
      cliente: { $arrayElemAt: ["$cliente.nome", 0] },
      totalPedidos: 1,
      valorTotal: { $round: ["$valorTotal", 2] },
      valorMedio: {
        $round: [{ $divide: ["$valorTotal", "$totalPedidos"] }, 2],
      },
    },
  },
]);

// procura os produtos mais pedidos
db.pedidos.aggregate([
  { $unwind: "$itens" },
  {
    $group: {
      _id: "$itens.item",
      nome: { $first: "$itens.nome" },
      totalPedidos: { $sum: "$itens.quantidade" },
    },
  },
  { $sort: { totalPedidos: -1 } },
  { $limit: 3 },
]);

// Encontra os 15 ingredientes mais caros, agrupando por tipo de ingrediente
// e gerando relatório de estoque para cada tipo
db.ingredientes.aggregate([
    { $sort: { precoPorUn: -1 } },
    { $limit: 15 },
    {
      $group: {
        _id: "$tipo",
        totalIngredientes: { $count: {} },
        valorMaximoEstoque: {
          $max: { $multiply: ["$precoPorUn", "$estoque"] },
        },
        precoMedio: { $avg: "$precoPorUn" },
        ingredientes: {
          $push: {
            nome: "$nome",
            preco: "$precoPorUn",
            estoque: "$estoque",
          },
        },
      },
    },
    { $sort: { valorMaximoEstoque: -1, precoMedio: -1 } },
]).pretty();

// Atualizar os planos com as informacoes nutricionais, mas
// somente aqueles que possuem os nomes corretos dos pratos na sua lista
db.planos.aggregate([
  {
    $lookup: {
      from: "cardapio",
      localField: "listaPratos",
      foreignField: "nome",
      as: "pratosFiltrados",
    },
  },
  {
    $match: {
      $expr: {
        $eq: [{ $size: "$pratosFiltrados" }, { $size: "$listaPratos" }],
      },
    },
  },
  {
    $set: {
      intakeDiario: { $sum: "$pratosFiltrados.calorias" },
      macronutrientes: {
        proteinas: { $sum: "$pratosFiltrados.proteinas" },
        carboidratos: { $sum: "$pratosFiltrados.carboidratos" },
        gorduras: { $sum: "$pratosFiltrados.gorduras" },
      },
    },
  },
  {
    $unset: "pratosFiltrados",
  },
  {
    $merge: {
      into: "planos",
      whenMatched: "merge",
      whenNotMatched: "discard",
    },
  },
]);
//Para visualizar o resultado da query acima
db.planos.find({ intakeDiario: { $exists: true } }).pretty();

// Encontra os pedidos com itens que têm mais de 30 reais de valor e
// que têm alguma avaliação, mostrando se ficaram se os clientes ficaram satisfeitos ou não (nota>=4)
db.pedidos.aggregate([
  { $match: { avaliacao: { $exists: true } } },
  {
    $lookup: {
      from: "clientes",
      localField: "cliente",
      foreignField: "_id",
      as: "clienteInfo",
    },
  },
  { $unwind: "$clienteInfo" },
  {
    $project: {
      _id: 0,
      nomeCliente: "$clienteInfo.nome",
      dataPedido: 1,
      itens: {
        $filter: {
          input: "$itens",
          as: "item",
          cond: { $gte: ["$$item.precoUnitario", 30] },
        },
      },
      avaliacao: 1,
      satisfacao: {
        $cond: {
          if: { $gte: ["$avaliacao.nota", 4] },
          then: "Cliente Satisfeito",
          else: "Necessita Atenção",
        },
      },
    },
  },
  {
    $match: { "itens.0": { $exists: true } },
  },
]);

// Buscar nome, quantidade de proteinas e preco depratos relacionados a proteína animal
// necessário criar índice antes (rodar uma vez após carregada base de dados):
db.cardapio.createIndex({ nome: "text", descricao: "text" });

db.cardapio
  .find(
    { $text: { $search: "frango salmão filé carne" } },
    { nome: 1, proteinas: 1, preco: 1, _id: 0 }
  )
  .sort({ proteinas: -1 })
  .limit(5)
  .pretty();

/**
 * Aggregation Pipeline: Menu Category Sales Analysis
 * @description Shows the total orders and sales for each menu category.
 * Groups orders by menu item category, calculating total sales revenue and order count.
 * Results are sorted by total sales in descending order.
 */

db.cardapio
  .find({
    $where: function () {
      return this.categoria !== "Vegano";
    },
  })
  .limit(5)
  .pretty();

// Lista todos os itens do menu que contêm apenas ingredientes veganos, mas NÃO estão categorizados como veganos.
db.cardapio.aggregate([
  {
    $lookup: {
      from: "ingredientes",
      localField: "ingredientes",
      foreignField: "_id",
      as: "ingredientesInfo",
    },
  },
  {
    $match: {
      ingredientesInfo: {
        $all: [{ $elemMatch: { vegano: true } }],
      },
    },
  },
  {
    $group: {
      _id: "$categoria",
      pratos: { $addToSet: "$nome" },
      mediaPreco: { $avg: "$preco" },
      totalCalorias: { $sum: "$calorias" },
      ingredientesUsados: {
        $addToSet: "$ingredientesInfo.nome",
      },
    },
  },
  {
    $project: {
      _id: 1,
      pratos: 1,
      mediaPreco: { $round: ["$mediaPreco", 2] },
      totalCalorias: 1,
      ingredientesUsados: {
        $reduce: {
          input: "$ingredientesUsados",
          initialValue: [],
          in: { $setUnion: ["$$value", "$$this"] },
        },
      },
    },
  },
  {
    $sort: { mediaPreco: -1 },
  },
]);

// Análise de padrões de consumo por período do dia
db.pedidos.mapReduce(
  // Map function - classifica pedidos por período e calcula valor total
  function () {
    var hora = this.dataPedido.getHours();
    var periodo;

    if (hora >= 6 && hora < 11) periodo = "Café da Manhã";
    else if (hora >= 11 && hora < 15) periodo = "Almoço";
    else if (hora >= 15 && hora < 19) periodo = "Lanche da Tarde";
    else periodo = "Jantar";

    var valorTotal = 0;
    if (this.itens && this.itens.length > 0) {
      for (var i = 0; i < this.itens.length; i++) {
        var item = this.itens[i];
        valorTotal += item.quantidade * item.precoUnitario;
      }
    }

    emit(periodo, {
      count: 1,
      valor: Math.round(valorTotal * 100) / 100,
      itensCount: this.itens ? this.itens.length : 0,
    });
  },

  // Reduce function - combina os dados por período
  function (key, values) {
    var resultado = {
      count: 0,
      valor: 0,
      itensCount: 0,
    };

    for (var i = 0; i < values.length; i++) {
      resultado.count += values[i].count;
      resultado.valor += values[i].valor;
      resultado.itensCount += values[i].itensCount;
    }

    return resultado;
  },

  {
    out: { replace: "analise_periodos" },
    finalize: function (key, resultado) {
      resultado.valorMedio =
        Math.round((resultado.valor / resultado.count) * 100) / 100;
      resultado.itensPorPedido =
        Math.round((resultado.itensCount / resultado.count) * 10) / 10;
      return resultado;
    },
  }
);
//Visualziar coleção criada/atualizada pela query acima
db.analise_periodos.find().sort({ "value.valor": -1 }).pretty();

// Split avaliações into different collections by year and month

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1; // Months are zero-based
db.adminCommand({
  renameCollection: "healthydelivery." + avaliacoao,
  to: "healthydelivery.avaliacoes_" + year + "_" + month,
});



/* 
Analisa pedidos para identificar padrões alimentares relacionados a controle de peso e recomendar planos
1. Encontra clientes que realizaram mais de um pedido
2. Para cada cliente, identifica os pedidos únicos 
4. Cria um perfil nutricional para cada cliente baseado nas infos dos pedidos
5. Vê qual plano de refeição melhor se adequa ao perfil e adiciona como recomendado 
*/ 
db.pedidos.aggregate([
    { $unwind: "$itens" },
    { $group: {
        _id: "$cliente" ,
        totalQtd: { $sum: "$itens.quantidade" },
        listaNomeItens: {$addToSet: "$itens.nome"}
    }},
    { $match: { totalQtd: { $gt: 2 } } },
    { $out: "clientesAnalisados" }
])

db.clientesAnalisados.find().forEach(function(cliente) {
    
    var perfilNutricional = db.cardapio.find({
        nome: { $in: cliente.listaNomeItens },
        $where: "this.proteinas != null && this.carboidratos != null"
    }).toArray();
    
    var totalProt = 0;
    var totalCarb = 0;
    var totalCal = 0;
    
    perfilNutricional.forEach(function(item) {
        totalProt += (item.proteinas || 0);
        totalCarb += (item.carboidratos || 0);
        totalCal += (item.calorias || 0);
    });
    
    var perfilAlimentar = "Balanceado";
    var objetivoRecomendado = "manutenção";
    
    if (totalProt > totalCarb * 1.5) {
        perfilAlimentar = "Hiperproteico";
        objetivoRecomendado = "ganho de massa";
    } else if (totalCarb < 100) {
        perfilAlimentar = "Low Carb";
        objetivoRecomendado = "emagrecimento";
    } else if (totalCal < 1500) {
        perfilAlimentar = "Baixa Caloria";
        objetivoRecomendado = "emagrecimento";
    }
    
    var planoRecomendado = db.planos.findOne({
        $where: function(perfilAlimentar, objetivoRecomendado) {
        if (this.tipos.includes(perfilAlimentar)) return true;
        if (this.objetivo === objetivoRecomendado) return true;
        return false;
        }
    });
    
    if (!planoRecomendado) {planoRecomendado = db.planos.findOne({ objetivo: objetivoRecomendado });}
    
    db.clientes.updateOne(
        { _id: cliente._id},
        {
        $set: {
            perfilAlimentar: perfilAlimentar,
            ultimaAnalise: new Date()
        },
        $addToSet: {
            planoRecomendado: {
            id: planoRecomendado._id,
            nome: planoRecomendado.nome,
            valorMensal: planoRecomendado.valorMensal,
            dataRecomendacao: new Date(),
            pratosCompativeis: planoRecomendado.listaPratos.filter(prato => 
                listaNomeItens.includes(prato)
            )
            }
        }
        }
    );
});

db.clientesAnalisados.find({ planoRecomendado: { $exists: true } }).pretty();

db.clientesAnalisados.renameCollection(
  "clientesAnalisados_" + 
  (new Date()).getFullYear() + "_" + 
  ((new Date()).getMonth() + 1));