
// Atualizar os planos com as informacoes nutricionais
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
            whenNotMatched: "insert"
        }
    }
]);
