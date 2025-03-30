db.cardapio.drop();

// para acessar o id dos ingredientes pelo nome deles:
const mapNomeIngredientesParaIds = {};
const ingredientesInseridos = db.ingredientes.find({}).toArray(); // Busca todos os ingredientes
ingredientesInseridos.forEach(ingrediente => { mapNomeIngredientesParaIds[ingrediente.nome] = ingrediente._id; }); //coloca todos no map

db.cardapio.insertMany([
    {
        nome: "Bowl de Salmão Energético",
        descricao: "Salmão grelhado com quinoa, abóbora assada e espinafre",
        ingredientes: [
            mapNomeIngredientesParaIds["Salmão Selvagem"],
            mapNomeIngredientesParaIds["Quinoa Real"],
            mapNomeIngredientesParaIds["Abóbora Japonesa"],
            mapNomeIngredientesParaIds["Espinafre"]
        ],
        calorias: 520,
        proteinas: 38,
        carboidratos: 45,
        gorduras: 22,
        vegano: false,
        vegetariano: false,
        semGluten: true,
        semLactose: true,
        preco: 42.90,
        categoria: "Proteico",
        tempoPreparo: 20 // minutos
    },
    {
        nome: "Bowl Vegano Power",
        descricao: "Quinoa, tofu grelhado, abóbora e mix de folhas com molho de gergelim",
        ingredientes: [
            mapNomeIngredientesParaIds["Tofu Orgânico"],
            mapNomeIngredientesParaIds["Quinoa Real"],
            mapNomeIngredientesParaIds["Abóbora Japonesa"],
            mapNomeIngredientesParaIds["Couve Kale"]
        ],
        calorias: 480,
        proteinas: 32,
        carboidratos: 50,
        gorduras: 18,
        vegano: true,
        vegetariano: true,
        semGluten: true,
        semLactose: true,
        preco: 36.90,
        categoria: "Vegano",
        tempoPreparo: 15
    },
    {
        nome: "Omelete Fit de Espinafre",
        descricao: "Omelete com ovos caipiras, espinafre e tofu",
        ingredientes: [
            mapNomeIngredientesParaIds["Ovos Caipiras"],
            mapNomeIngredientesParaIds["Espinafre"],
            mapNomeIngredientesParaIds["Tofu Orgânico"]
        ],
        calorias: 320,
        proteinas: 28,
        carboidratos: 8,
        gorduras: 20,
        vegano: false,
        vegetariano: true,
        semGluten: true,
        semLactose: false,
        preco: 28.50,
        categoria: "Low Carb",
        tempoPreparo: 10
    },
    {
        nome: "Salada Mediterrânea",
        descricao: "Mix de folhas, quinoa, tomate seco e azeite",
        ingredientes: [
            mapNomeIngredientesParaIds["Quinoa Real"],
            mapNomeIngredientesParaIds["Tomate Cereja"],
            mapNomeIngredientesParaIds["Azeite de Oliva Extra Virgem"],
            mapNomeIngredientesParaIds["Espinafre"]
        ],
        calorias: 380,
        proteinas: 12,
        carboidratos: 30,
        gorduras: 25,
        vegano: true,
        vegetariano: true,
        semGluten: true,
        semLactose: true,
        preco: 32.00,
        categoria: "Light",
        tempoPreparo: 12
    },
    {
        nome: "Avocado Toast Integral",
        descricao: "Pão integral com abacate amassado, ovos pochê e sementes de gergelim",
        ingredientes: [
            mapNomeIngredientesParaIds["Abacate Hass"],
            mapNomeIngredientesParaIds["Ovos Caipiras"],
            mapNomeIngredientesParaIds["Gergelim Preto"]
        ],
        calorias: 350,
        proteinas: 15,
        vegano: false,
        preco: 22.90,
        categoria: "Café da Manhã"
    },
    {
        nome: "Espaguete de Abobrinha com Frango",
        descricao: "Abobrinha em tiras, frango grelhado e molho de tomate natural",
        ingredientes: [
            mapNomeIngredientesParaIds["Frango Orgânico"],
            mapNomeIngredientesParaIds["Tomate Cereja"],
            mapNomeIngredientesParaIds["Azeite de Oliva Extra Virgem"]
        ],
        calorias: 280,
        proteinas: 30,
        preco: 38.50,
        categoria: "Low Carb"
    },
    {
        nome: "Smoothie Verde Energético",
        descricao: "Espinafre, abacate, banana e leite de coco",
        ingredientes: [
            mapNomeIngredientesParaIds["Espinafre"],
            mapNomeIngredientesParaIds["Abacate Hass"],
            mapNomeIngredientesParaIds["Leite de Coco"]
        ],
        calorias: 320,
        proteinas: 8,
        vegano: true,
        preco: 18.90,
        categoria: "Bebidas"
    },
    {
        nome: "Bowl de Frango com Quinoa",
        descricao: "Frango grelhado, quinoa, brócolis e molho de iogurte",
        ingredientes: [
            mapNomeIngredientesParaIds["Frango Orgânico"],
            mapNomeIngredientesParaIds["Quinoa Real"],
            mapNomeIngredientesParaIds["Brócolis Orgânico"]
        ],
        calorias: 450,
        proteinas: 40,
        preco: 39.90,
        categoria: "Proteico"
    },
    {
        nome: "Curry de Grão-de-Bico",
        descricao: "Grão-de-bico cozido com leite de coco e especiarias",
        ingredientes: [
            mapNomeIngredientesParaIds["Grão-de-Bico Cozido"],
            mapNomeIngredientesParaIds["Leite de Coco"],
            mapNomeIngredientesParaIds["Cúrcuma em Pó"]
        ],
        calorias: 380,
        proteinas: 18,
        vegano: true,
        preco: 34.90,
        categoria: "Vegano"
    },
    {
        nome: "Wrap de Tofu e Vegetais",
        descricao: "Tofu grelhado, folhas e tomate em wrap integral",
        ingredientes: [
            mapNomeIngredientesParaIds["Tofu Orgânico"],
            mapNomeIngredientesParaIds["Tomate Cereja"],
            mapNomeIngredientesParaIds["Espinafre"]
        ],
        calorias: 290,
        proteinas: 20,
        vegano: true,
        preco: 26.50,
        categoria: "Lanche"
    },
    {
        nome: "Pudim de Chia com Frutas",
        descricao: "Semente de chia com leite de coco e mirtilos",
        ingredientes: [
            mapNomeIngredientesParaIds["Chia"],
            mapNomeIngredientesParaIds["Leite de Coco"],
            mapNomeIngredientesParaIds["Mirtilos"]
        ],
        calorias: 210,
        proteinas: 6,
        vegano: true,
        preco: 16.90,
        categoria: "Sobremesa"
    },
    {
        nome: "Filé de Salmão com Aspargos",
        descricao: "Salmão grelhado com aspargos e quinoa",
        ingredientes: [
            mapNomeIngredientesParaIds["Salmão Selvagem"],
            mapNomeIngredientesParaIds["Quinoa Real"],
            mapNomeIngredientesParaIds["Azeite de Oliva Extra Virgem"]
        ],
        calorias: 480,
        proteinas: 42,
        preco: 49.90,
        categoria: "Fitness"
    },
    {
        nome: "Arroz Integral com Ovo e Vegetais",
        descricao: "Arroz integral, ovo mexido e legumes no vapor",
        ingredientes: [
            mapNomeIngredientesParaIds["Arroz Integral"],
            mapNomeIngredientesParaIds["Ovos Caipiras"],
            mapNomeIngredientesParaIds["Brócolis Orgânico"]
        ],
        calorias: 320,
        proteinas: 22,
        preco: 24.90,
        categoria: "Econômico"
    },
    {
        nome: "Bowl de Superfoods",
        descricao: "Quinoa, abacate, sementes e vegetais",
        ingredientes: [
            mapNomeIngredientesParaIds["Quinoa Real"],
            mapNomeIngredientesParaIds["Abacate Hass"],
            mapNomeIngredientesParaIds["Chia"],
            mapNomeIngredientesParaIds["Couve Kale"]
        ],
        calorias: 420,
        proteinas: 15,
        vegano: true,
        preco: 37.90,
        categoria: "Superfoods"
    }
]);