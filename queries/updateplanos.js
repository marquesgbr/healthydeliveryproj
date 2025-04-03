
  
  
// Atualiza múltiplos documentos, categorizando-os dinamicamente
db.cardapio.updateMany(
    { proteinas: { $exists: true } },
    [
        { 
        $set: { 
            taxaProteica: {
            $cond: {
                if: { $gte: ["$proteinas", 40] },
                then: "Alta",
                else: {
                $cond: {
                    if: { $gte: ["$proteinas", 20] },
                    then: "Média",
                    else: "Baixa"
                }
                }
            }
            },
            atualizadoEm: new Date()
        } 
        }
    ]
    );
    
    // Verifica os resultados
    db.cardapio.find(
    { classificacaoProteica: { $exists: true } },
    { nome: 1, proteinas: 1, classificacaoProteica: 1, _id: 0 }
    ).pretty();
    
    
    
    // Identifica planos que atendem requisitos nutricionais completos
    // e cria pacotes promocionais com base nessa análise
    
    // Primeiro, cria um índice de texto no cardápio se não existir
    db.cardapio.createIndex({ nome: "text", descricao: "text" });
    
    // Encontra planos que contêm todos os pratos específicos e os atualiza
    db.planos.find({
    // Verifica se o plano contém TODOS os pratos essenciais
    listaPratos: { 
        $all: ["Filé de Frango Grelhado", "Salada Verde Completa", "Bowl de Açaí Premium"] 
    }
    }).forEach(function(plano) {
        // Calcula perfil nutricional detalhado
        var perfilNutricional = db.cardapio.aggregate([
            { $match: { nome: { $in: plano.listaPratos } } },
            { 
            $group: {
                _id: null,
                totalCal: { $sum: "$calorias" },
                totalProt: { $sum: "$proteinas" },
                totalCarb: { $sum: "$carboidratos" },
                totalGorduras: { $sum: "$gorduras" },
                ratioCarbProteina: { $avg: { $divide: ["$carboidratos", { $add: ["$proteinas", 0.1] }] } }
            } 
            }
        ]).toArray()[0];
    
        // Determina a categoria do plano com base no perfil nutricional
        var categoria;
        if (perfilNutricional.totalProt > 120 && perfilNutricional.ratioCarbProteina < 1.5) {
            categoria = "Alto Proteico";
        } else if (perfilNutricional.totalCarb < 150) {
            categoria = "Low Carb";
        } else {
            categoria = "Balanceado";
        }
    
    // Insere ou atualiza o registro promocional
    db.planos_promocao.updateOne(
        { planoOriginalId: plano._id },
        {
        $set: {
            nomePlano: plano.nome,
            descricao: "Versão promocional do plano " + plano.nome + " - Categoria " + categoria,
            valorPromocional: plano.valorMensal * 0.85,
            perfilNutricional: perfilNutricional,
            categoria: categoria,
            validadePromocao: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            planoOriginalId: plano._id
        }
        },
        { upsert: true }
    );
    });
    
    // Verificação de quantos planos promocionais foram criados
    db.planos_promocao.find().count();
    
    
    
    
    
    
    
    
    // Identifica pratos com eficiência nutricional excepcional e gera relatório mensal
    // Utiliza $where para cálculos complexos de eficiência e renomeCollection para armazenamento
    
    // Cria uma coleção temporária com os pratos que têm melhor relação nutricional
    db.cardapio.find({
        // Usa $where para calcular eficiência nutricional personalizada
        $where: function() {
          // Verifica se tem todos os campos necessários
          if (!this.proteinas || !this.calorias || !this.preco || this.proteinas <= 0) {
            return false;
          }
          
          // Calcula métricas de eficiência
          var proteinaPorReal = this.proteinas / this.preco;           // Proteína por R$
          var proteinaPorCaloria = this.proteinas / this.calorias;     // Densidade proteica
          var custo100Calorias = (this.preco / this.calorias) * 100;   // Custo por 100 calorias
          
          // Retorna verdadeiro para pratos com bom equilíbrio
          return proteinaPorReal > 0.8 && 
                 proteinaPorCaloria > 0.07 && 
                 custo100Calorias < 15;
        }
      }).forEach(function(prato) {
        // Para cada prato eficiente, insere na coleção de análise
        db.analise_eficiencia_temp.insertOne({
          _id: prato._id,
          nome: prato.nome,
          categoria: prato.categoria,
          metricas: {
            proteinaPorReal: (prato.proteinas / prato.preco).toFixed(2),
            proteinaPorCaloria: (prato.proteinas / prato.calorias).toFixed(2),
            custo100Calorias: ((prato.preco / prato.calorias) * 100).toFixed(2)
          },
          dadosNutricionais: {
            calorias: prato.calorias,
            proteinas: prato.proteinas,
            carboidratos: prato.carboidratos || 0,
            gorduras: prato.gorduras || 0
          },
          preco: prato.preco,
          classificacao: prato.proteinas > 30 ? "Alto Proteico" : "Balanceado",
          dataAnalise: new Date()
        });
      });
      
      // Conta quantos pratos eficientes foram identificados
      var totalPratosEficientes = db.analise_eficiencia_temp.count();
      
      // Adiciona um documento de resumo com estatísticas
      db.analise_eficiencia_temp.insertOne({
        _id: "resumo",
        totalPratos: totalPratosEficientes,
        medidasGerais: db.analise_eficiencia_temp.aggregate([
          { $match: { classificacao: { $exists: true } } },
          { 
            $group: {
              _id: "$classificacao",
              precoMedio: { $avg: "$preco" },
              proteinaMedia: { $avg: "$dadosNutricionais.proteinas" },
              contagem: { $sum: 1 }
            } 
          }
        ]).toArray(),
        dataGeracao: new Date()
      });
      
      // Renomeia a coleção com a data atual para registro histórico
      db.analise_eficiencia_temp.renameCollection("relatorio_eficiencia_" + new Date().toISOString().slice(0,7));
      
      // Consulta o resultado do relatório
      db.getCollection("relatorio_eficiencia_" + new Date().toISOString().slice(0,7)).find().pretty();
    
    
    
    
    
    
    
    // Primeiro, verifica quantos clientes gastaram mais de X valor em pedidos
    db.pedidos.aggregate([
        {
          $group: {
            _id: "$cliente",
            totalGasto: { $sum: "$valorTotal" }
          }
        },
        {
          $match: {
            totalGasto: { $gt: 1000 }
          }
        }
      ]).forEach(function(clienteVip) {
        
        // Encontra pratos adequados ao perfil com $where
        var pratosRecomendados = db.cardapio.find({
          $where: "this.proteinas > 25 && this.carboidratos < 30 && this.calorias < 450"
        }).limit(5).map(function(prato) {
          return prato.nome;
        });
        
        // Atualiza perfil do cliente com recomendações
        db.clientes.updateOne(
          { _id: clienteVip._id },
          {
            $set: {
              statusFidelidade: "VIP",
              gastoTotal: clienteVip.totalGasto,
              ultimaAtualizacao: new Date()
            },
            $addToSet: {
              recomendacoesPratos: { $each: pratosRecomendados },
              beneficiosVip: { $each: ["Entrega Grátis", "15% Desconto"] }
            }
          }
        );
    });
      
    // Exibe quantidade de clientes VIP
    db.clientes.find({ statusFidelidade: "VIP" }).count();
      
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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