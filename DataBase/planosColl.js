db.planos.drop();
db.planos.insertMany([
    {
        nome: "Plano Equilibrado",
        descricao: "Plano balanceado para uma alimentação saudável com proporções ideais de macronutrientes",
        valorMensal: 899.90,
        listaPratos: [
            "Filé de Salmão com Aspargos",
            "Arroz Integral com Ovo e Vegetais",
            "Wrap de Tofu e Vegetais",
            "Omelete Fit de Espinafre"
        ],
        tipos: ["Equilibrado", "Proteico"],
        objetivo: "manutenção"
    },
    {
        nome: "Plano Low Carb",
        descricao: "Plano para quem busca reduzir a ingestão de carboidratos e aumentar proteínas",
        valorMensal: 949.90,
        listaPratos: [
            "Omelete Fit de Espinafre",
            "Espaguete de Abobrinha com Frango",
            "Filé de Salmão com Aspargos",
            "Bowl de Salmão Energético"
        ],
        tipos: ["Low Carb", "Proteico"],
        objetivo: "emagrecimento"
    },
    {
        nome: "Plano Vegano",
        descricao: "Plano 100% vegano com alta densidade nutricional",
        valorMensal: 879.90,
        listaPratos: [
            "Bowl Vegano Power",
            "Salada Mediterrânea",
            "Curry de Grão-de-Bico",
            "Wrap de Tofu e Vegetais"
        ],
        tipos: ["Vegano", "Plant-based"],
        objetivo: "saúde"
    },
    {
        nome: "Plano Fitness",
        descricao: "Plano com alto teor proteico ideal para praticantes de atividade física",
        valorMensal: 999.90,
        listaPratos: [
            "Bowl de Frango com Quinoa",
            "Bowl de Salmão Energético",
            "Filé de Salmão com Aspargos",
            "Omelete Fit de Espinafre"
        ],
        tipos: ["Fitness", "Hiperproteico"],
        objetivo: "ganho de massa"
    },
    {
        nome: "Plano Econômico",
        descricao: "Plano acessível com boa relação custo-benefício",
        valorMensal: 699.90,
        listaPratos: [
            "Arroz Integral com Ovo e Vegetais",
            "Wrap de Tofu e Vegetais",
            "Curry de Grão-de-Bico",
            "Espaguete de Abobrinha com Frango"
        ],
        tipos: ["Econômico", "Balanceado"],
        objetivo: "manutenção"
    },
    {
        nome: "Plano Desintoxicante",
        descricao: "Plano focado em alimentos que auxiliam na limpeza do organismo",
        valorMensal: 929.90,
        listaPratos: [
            "Smoothie Verde Energético",
            "Bowl de Superfoods",
            "Salada Mediterrânea",
            "Pudim de Chia com Frutas"
        ],
        tipos: ["Detox", "Antioxidante"],
        objetivo: "desintoxicação"
    },
    {
        nome: "Plano Sem Glúten",
        descricao: "Plano especial para pessoas com intolerância ao glúten",
        valorMensal: 939.90,
        listaPratos: [
            "Bowl de Salmão Energético",
            "Salada Mediterrânea",
            "Omelete Fit de Espinafre",
            "Smoothie Verde Energético"
        ],
        tipos: ["Sem Glúten", "Hipoalergênico"],
        objetivo: "saúde"
    }
]);