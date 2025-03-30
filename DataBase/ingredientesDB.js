db.ingredientes.drop();
const resultado = db.ingredientes.insertMany([
    { 
        nome: "Peito de Frango Orgânico", 
        tipo: "Proteína Animal", 
        vegano: false, 
        alergenos: ["Proteína Animal"], 
        estoque: 5000, 
        precoPorUnidade: 0.035 
    },
    { 
        nome: "Salmão Selvagem", 
        tipo: "Proteína Animal", 
        vegano: false, 
        alergenos: ["Peixe"], 
        estoque: 2500, 
        precoPorUnidade: 0.08 
    },
    { 
        nome: "Ovos Caipiras", 
        tipo: "Proteína Animal", 
        vegano: false, 
        alergenos: ["Ovo"], 
        estoque: 120,  // unidades
        precoPorUnidade: 1.20 
    },
    { 
        nome: "Tofu Orgânico", 
        tipo: "Proteína Vegetal", 
        vegano: true, 
        alergenos: ["Soja"], 
        estoque: 3000, 
        precoPorUnidade: 0.025 
    },
    { 
        nome: "Grão-de-Bico Cozido", 
        tipo: "Proteína Vegetal", 
        vegano: true, 
        alergenos: [], 
        estoque: 6000, 
        precoPorUnidade: 0.015 
    },

    // Grãos e Cereais
    { 
        nome: "Quinoa Real", 
        tipo: "Grão", 
        vegano: true, 
        alergenos: [], 
        estoque: 4000, 
        precoPorUnidade: 0.03 
    },
    { 
        nome: "Arroz Integral", 
        tipo: "Grão", 
        vegano: true, 
        alergenos: [], 
        estoque: 8000, 
        precoPorUnidade: 0.01 
    },
    { 
        nome: "Aveia em Flocos", 
        tipo: "Grão", 
        vegano: true, 
        alergenos: ["Glúten"], 
        estoque: 3500, 
        precoPorUnidade: 0.018 
    },
    { 
        nome: "Cevada", 
        tipo: "Grão", 
        vegano: true, 
        alergenos: ["Glúten"], 
        estoque: 2000, 
        precoPorUnidade: 0.022 
    },

    // Vegetais
    { 
        nome: "Brócolis Orgânico", 
        tipo: "Vegetal", 
        vegano: true, 
        alergenos: [], 
        estoque: 1500, 
        precoPorUnidade: 0.012 
    },
    { 
        nome: "Abóbora Japonesa", 
        tipo: "Vegetal", 
        vegano: true, 
        alergenos: [], 
        estoque: 2500, 
        precoPorUnidade: 0.01 
    },
    { 
        nome: "Espinafre", 
        tipo: "Folha", 
        vegano: true, 
        alergenos: [], 
        estoque: 1000, 
        precoPorUnidade: 0.015 
    },
    { 
        nome: "Tomate Cereja", 
        tipo: "Vegetal", 
        vegano: true, 
        alergenos: [], 
        estoque: 800,  // gramas
        precoPorUnidade: 0.02 
    },

    // Gorduras Saudáveis
    { 
        nome: "Abacate Hass", 
        tipo: "Gordura Saudável", 
        vegano: true, 
        alergenos: [], 
        estoque: 50,  // unidades
        precoPorUnidade: 4.50 
    },
    { 
        nome: "Azeite de Oliva Extra Virgem", 
        tipo: "Gordura Saudável", 
        vegano: true, 
        alergenos: [], 
        estoque: 500,  // ml
        precoPorUnidade: 0.10 
    },
    { 
        nome: "Castanha-do-Pará", 
        tipo: "Oleaginosa", 
        vegano: true, 
        alergenos: ["Castanhas"], 
        estoque: 800, 
        precoPorUnidade: 0.05 
    },

    // Temperos e Ervas
    { 
        nome: "Cúrcuma em Pó", 
        tipo: "Tempero", 
        vegano: true, 
        alergenos: [], 
        estoque: 200, 
        precoPorUnidade: 0.08 
    },
    { 
        nome: "Gengibre Fresco", 
        tipo: "Raiz", 
        vegano: true, 
        alergenos: [], 
        estoque: 300, 
        precoPorUnidade: 0.04 
    },
    { 
        nome: "Alho Orgânico", 
        tipo: "Tempero", 
        vegano: true, 
        alergenos: [], 
        estoque: 400, 
        precoPorUnidade: 0.03 
    },

    // Laticínios e Alternativas
    { 
        nome: "Iogurte Natural Integral", 
        tipo: "Laticínio", 
        vegano: false, 
        alergenos: ["Leite"], 
        estoque: 20,  // potes de 200g
        precoPorUnidade: 3.50 
    },
    { 
        nome: "Leite de Coco", 
        tipo: "Vegetal", 
        vegano: true, 
        alergenos: ["Coco"], 
        estoque: 30,  // latas de 200ml
        precoPorUnidade: 4.00 
    },

    // Sementes
    { 
        nome: "Chia", 
        tipo: "Semente", 
        vegano: true, 
        alergenos: [], 
        estoque: 500, 
        precoPorUnidade: 0.06 
    },
    { 
        nome: "Gergelim Preto", 
        tipo: "Semente", 
        vegano: true, 
        alergenos: ["Gergelim"], 
        estoque: 300, 
        precoPorUnidade: 0.04 
    },

    // Frutas
    { 
        nome: "Mirtilos", 
        tipo: "Fruta", 
        vegano: true, 
        alergenos: [], 
        estoque: 400, 
        precoPorUnidade: 0.07 
    },
    { 
        nome: "Banana-da-Terra", 
        tipo: "Fruta", 
        vegano: true, 
        alergenos: [], 
        estoque: 15,  // unidades
        precoPorUnidade: 2.00 
    },

    // Proteínas Alternativas
    { 
        nome: "Seitan", 
        tipo: "Proteína Vegetal", 
        vegano: true, 
        alergenos: ["Glúten"], 
        estoque: 2000, 
        precoPorUnidade: 0.04 
    },
    { 
        nome: "Lentilha Verde", 
        tipo: "Leguminosa", 
        vegano: true, 
        alergenos: [], 
        estoque: 3000, 
        precoPorUnidade: 0.018 
    }
]);
