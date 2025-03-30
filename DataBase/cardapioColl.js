db.cardapio.drop();

// para acessar o id dos ingredientes pelo nome deles:
const mapaNomeIngredientesParaIds = {};
const ingredientesInseridos = db.ingredientes.find({}).toArray(); // Busca todos os ingredientes
ingredientesInseridos.forEach(ingrediente => { mapaNomeIngredientesParaIds[ingrediente.nome] = ingrediente._id; }); //coloca todos no map

db.cardapio.insertMany([
    {
        nome: "Bowl de Salmão Energético",
        descricao: "Salmão grelhado com quinoa, abóbora assada e espinafre",
        ingredientes: [
            mapaNomeIngredientesParaIds["Salmão Selvagem"],
            mapaNomeIngredientesParaIds["Quinoa Real"],
            mapaNomeIngredientesParaIds["Abóbora Japonesa"],
            mapaNomeIngredientesParaIds["Espinafre"]
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
            mapaNomeIngredientesParaIds["Tofu Orgânico"],
            mapaNomeIngredientesParaIds["Quinoa Real"],
            mapaNomeIngredientesParaIds["Abóbora Japonesa"],
            mapaNomeIngredientesParaIds["Couve Kale"]
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
            mapaNomeIngredientesParaIds["Ovos Caipiras"],
            mapaNomeIngredientesParaIds["Espinafre"],
            mapaNomeIngredientesParaIds["Tofu Orgânico"]
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
            mapaNomeIngredientesParaIds["Quinoa Real"],
            mapaNomeIngredientesParaIds["Tomate Cereja"],
            mapaNomeIngredientesParaIds["Azeite de Oliva Extra Virgem"],
            mapaNomeIngredientesParaIds["Espinafre"]
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
            mapaNomeIngredientesParaIds["Abacate Hass"],
            mapaNomeIngredientesParaIds["Ovos Caipiras"],
            mapaNomeIngredientesParaIds["Gergelim Preto"]
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
            mapaNomeIngredientesParaIds["Frango Orgânico"],
            mapaNomeIngredientesParaIds["Tomate Cereja"],
            mapaNomeIngredientesParaIds["Azeite de Oliva Extra Virgem"]
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
            mapaNomeIngredientesParaIds["Espinafre"],
            mapaNomeIngredientesParaIds["Abacate Hass"],
            mapaNomeIngredientesParaIds["Leite de Coco"]
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
            mapaNomeIngredientesParaIds["Frango Orgânico"],
            mapaNomeIngredientesParaIds["Quinoa Real"],
            mapaNomeIngredientesParaIds["Brócolis Orgânico"]
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
            mapaNomeIngredientesParaIds["Grão-de-Bico Cozido"],
            mapaNomeIngredientesParaIds["Leite de Coco"],
            mapaNomeIngredientesParaIds["Cúrcuma em Pó"]
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
            mapaNomeIngredientesParaIds["Tofu Orgânico"],
            mapaNomeIngredientesParaIds["Tomate Cereja"],
            mapaNomeIngredientesParaIds["Espinafre"]
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
            mapaNomeIngredientesParaIds["Chia"],
            mapaNomeIngredientesParaIds["Leite de Coco"],
            mapaNomeIngredientesParaIds["Mirtilos"]
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
            mapaNomeIngredientesParaIds["Salmão Selvagem"],
            mapaNomeIngredientesParaIds["Quinoa Real"],
            mapaNomeIngredientesParaIds["Azeite de Oliva Extra Virgem"]
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
            mapaNomeIngredientesParaIds["Arroz Integral"],
            mapaNomeIngredientesParaIds["Ovos Caipiras"],
            mapaNomeIngredientesParaIds["Brócolis Orgânico"]
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
            mapaNomeIngredientesParaIds["Quinoa Real"],
            mapaNomeIngredientesParaIds["Abacate Hass"],
            mapaNomeIngredientesParaIds["Chia"],
            mapaNomeIngredientesParaIds["Couve Kale"]
        ],
        calorias: 420,
        proteinas: 15,
        vegano: true,
        preco: 37.90,
        categoria: "Superfoods"
    }
]);