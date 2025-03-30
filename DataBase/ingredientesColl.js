db.ingredientes.drop();
const resultado = db.ingredientes.insertMany([
    // Fontes de Proteína
    { 
        nome: "Peito de Frango Orgânico", 
        tipo: "Proteína Animal", 
        vegano: false, 
        alergenos: ["Proteína Animal"], 
        estoque: 50,
        unidade: "kg",
        precoPorUn: 35.00,
        nutrientes100g: {
            calorias: 165,
            proteinas: 31,
            carboidratos: 0,
            gorduras: 3.6
        }
    },
    { 
        nome: "Filé Mignon", 
        tipo: "Proteína Animal", 
        vegano: false, 
        alergenos: ["Proteína Animal"], 
        estoque: 25,
        unidade: "kg",
        precoPorUn: 95.00,
        nutrientes100g: {
            calorias: 143,
            proteinas: 22,
            carboidratos: 0,
            gorduras: 5.9
        }
    },
    { 
        nome: "Patinho Bovino", 
        tipo: "Proteína Animal", 
        vegano: false, 
        alergenos: ["Proteína Animal"], 
        estoque: 30,
        unidade: "kg",
        precoPorUn: 45.00,
        nutrientes100g: {
            calorias: 133,
            proteinas: 21.5,
            carboidratos: 0,
            gorduras: 4.8
        }
    },
    { 
        nome: "Salmão Selvagem", 
        tipo: "Proteína Animal", 
        vegano: false, 
        alergenos: ["Peixe"], 
        estoque: 20,
        unidade: "kg",
        precoPorUn: 80.00,
        nutrientes100g: {
            calorias: 208,
            proteinas: 22,
            carboidratos: 0,
            gorduras: 13
        }
    },
    { 
        nome: "Tilápia", 
        tipo: "Proteína Animal", 
        vegano: false, 
        alergenos: ["Peixe"], 
        estoque: 25,
        unidade: "kg",
        precoPorUn: 35.00,
        nutrientes100g: {
            calorias: 96,
            proteinas: 20.1,
            carboidratos: 0,
            gorduras: 1.7
        }
    },
    { 
        nome: "Bacalhau Fresco", 
        tipo: "Proteína Animal", 
        vegano: false, 
        alergenos: ["Peixe"], 
        estoque: 15,
        unidade: "kg",
        precoPorUn: 75.00,
        nutrientes100g: {
            calorias: 82,
            proteinas: 18.3,
            carboidratos: 0,
            gorduras: 0.7
        }
    },
    { 
        nome: "Ovos Caipiras", 
        tipo: "Proteína Animal", 
        vegano: false, 
        alergenos: ["Ovo"], 
        estoque: 120,
        unidade: "un",
        precoPorUn: 0.8,
        nutrientes100g: {
            calorias: 155,
            proteinas: 13,
            carboidratos: 1.1,
            gorduras: 11
        }
    },
    { 
        nome: "Tofu Orgânico", 
        tipo: "Proteína Vegetal", 
        vegano: true, 
        alergenos: ["Soja"], 
        estoque: 15,
        unidade: "kg",
        precoPorUn: 25.00,
        nutrientes100g: {
            calorias: 76,
            proteinas: 8,
            carboidratos: 1.9,
            gorduras: 4.8
        }
    },
    
    // Grãos e Cereais
    { 
        nome: "Grão-de-Bico Cozido", 
        tipo: "Proteína Vegetal", 
        vegano: true, 
        alergenos: [], 
        estoque: 10,
        unidade: "kg",
        precoPorUn: 15.00,
        nutrientes100g: {
            calorias: 164,
            proteinas: 8.9,
            carboidratos: 27.4,
            gorduras: 2.6
        }
    },
    { 
        nome: "Quinoa Real", 
        tipo: "Grão", 
        vegano: true, 
        alergenos: [], 
        estoque: 20,
        unidade: "kg",
        precoPorUn: 30.00,
        nutrientes100g: {
            calorias: 368,
            proteinas: 14.1,
            carboidratos: 64.2,
            gorduras: 6.1
        }
    },
    { 
        nome: "Arroz Integral", 
        tipo: "Grão", 
        vegano: true, 
        alergenos: [], 
        estoque: 30,
        unidade: "kg",
        precoPorUn: 10.00,
        nutrientes100g: {
            calorias: 350,
            proteinas: 7.5,
            carboidratos: 77.2,
            gorduras: 2.7
        }
    },
    { 
        nome: "Aveia em Flocos", 
        tipo: "Grão", 
        vegano: true, 
        alergenos: ["Glúten"], 
        estoque: 10,
        unidade: "kg",
        precoPorUn: 18.00,
        nutrientes100g: {
            calorias: 389,
            proteinas: 16.9,
            carboidratos: 66.3,
            gorduras: 6.9
        }
    },
    { 
        nome: "Cevada", 
        tipo: "Grão", 
        vegano: true, 
        alergenos: ["Glúten"], 
        estoque: 15,
        unidade: "kg",
        precoPorUn: 22.00,
        nutrientes100g: {
            calorias: 354,
            proteinas: 12.5,
            carboidratos: 73.5,
            gorduras: 2.3
        }
    },
    { 
        nome: "Arroz Branco", 
        tipo: "Grão", 
        vegano: true, 
        alergenos: [], 
        estoque: 30,
        unidade: "kg",
        precoPorUn: 8.00,
        nutrientes100g: {
            calorias: 360,
            proteinas: 6.7,
            carboidratos: 79.0,
            gorduras: 0.7
        }
    },
    { 
        nome: "Feijão Preto", 
        tipo: "Leguminosa", 
        vegano: true, 
        alergenos: [], 
        estoque: 30,
        unidade: "kg",
        precoPorUn: 12.00,
        nutrientes100g: {
            calorias: 324,
            proteinas: 21.3,
            carboidratos: 58.8,
            gorduras: 1.2
        }
    },

    // Vegetais
    { 
        nome: "Brócolis Orgânico", 
        tipo: "Vegetal", 
        vegano: true, 
        alergenos: [], 
        estoque: 4,
        unidade: "kg",
        precoPorUn: 12.00,
        nutrientes100g: {
            calorias: 34,
            proteinas: 2.8,
            carboidratos: 7.0,
            gorduras: 0.4
        }
    },
    { 
        nome: "Abóbora Japonesa", 
        tipo: "Vegetal", 
        vegano: true, 
        alergenos: [], 
        estoque: 6,
        unidade: "kg",
        precoPorUn: 6.00,
        nutrientes100g: {
            calorias: 26,
            proteinas: 1.0,
            carboidratos: 6.5,
            gorduras: 0.1
        }
    },
    { 
        nome: "Espinafre", 
        tipo: "Folha", 
        vegano: true, 
        alergenos: [], 
        estoque: 2,
        unidade: "kg",
        precoPorUn: 15.00,
        nutrientes100g: {
            calorias: 23,
            proteinas: 2.9,
            carboidratos: 3.6,
            gorduras: 0.4
        }
    },
    { 
        nome: "Tomate Cereja", 
        tipo: "Vegetal", 
        vegano: true, 
        alergenos: [], 
        estoque: 4,
        unidade: "kg",
        precoPorUn: 20.00,
        nutrientes100g: {
            calorias: 18,
            proteinas: 0.9,
            carboidratos: 3.9,
            gorduras: 0.2
        }
    },

    // Gorduras Saudáveis
    { 
        nome: "Abacate Hass", 
        tipo: "Gordura Saudável", 
        vegano: true, 
        alergenos: [], 
        estoque: 50,
        unidade: "un",
        precoPorUn: 4.50,
        nutrientes100g: {
            calorias: 160,
            proteinas: 2.0,
            carboidratos: 8.5,
            gorduras: 14.7
        }
    },
    { 
        nome: "Azeite de Oliva Extra Virgem", 
        tipo: "Gordura Saudável", 
        vegano: true, 
        alergenos: [], 
        estoque: 5,
        unidade: "l",
        precoPorUn: 40.00,
        nutrientes100g: {
            calorias: 884,
            proteinas: 0,
            carboidratos: 0,
            gorduras: 100
        }
    },
    { 
        nome: "Castanha-do-Pará", 
        tipo: "Oleaginosa", 
        vegano: true, 
        alergenos: ["Castanhas"], 
        estoque: 4,
        unidade: "kg",
        precoPorUn: 80.00,
        nutrientes100g: {
            calorias: 656,
            proteinas: 14.3,
            carboidratos: 12.3,
            gorduras: 67.1
        }
    },
    { 
        nome: "Pistache", 
        tipo: "Oleaginosa", 
        vegano: true, 
        alergenos: ["Pistache"], 
        estoque: 10,
        unidade: "kg",
        precoPorUn: 120.00,
        nutrientes100g: {
            calorias: 562,
            proteinas: 20,
            carboidratos: 28,
            gorduras: 45
        }
    },

    // Temperos e Ervas
    { 
        nome: "Cúrcuma em Pó", 
        tipo: "Tempero", 
        vegano: true, 
        alergenos: [], 
        estoque: 2, 
        precoPorUnidade: 0.08 
    },
    { 
        nome: "Gengibre Fresco", 
        tipo: "Raiz", 
        vegano: true, 
        alergenos: [], 
        estoque: 3, 
        precoPorUnidade: 0.04 
    },
    { 
        nome: "Alho Orgânico", 
        tipo: "Tempero", 
        vegano: true, 
        alergenos: [], 
        estoque: 4, 
        precoPorUnidade: 0.03 
    },

    // Laticínios e Alternativas
    { 
        nome: "Iogurte Natural Integral", 
        tipo: "Laticínio", 
        vegano: false, 
        alergenos: ["Leite"], 
        estoque: 20,
        unidade: "l",
        precoPorUn: 3.50,
        nutrientes100g: {
            calorias: 63,
            proteinas: 3.5,
            carboidratos: 4.7,
            gorduras: 3.3
        }
    },
    { 
        nome: "Leite de Coco", 
        tipo: "Vegetal", 
        vegano: true, 
        alergenos: ["Coco"], 
        estoque: 30,
        unidade: "l",
        precoPorUn: 4.00,
        nutrientes100g: {
            calorias: 230,
            proteinas: 2.3,
            carboidratos: 5.4,
            gorduras: 23.8
        }
    },

    // Sementes
    { 
        nome: "Chia", 
        tipo: "Semente", 
        vegano: true, 
        alergenos: [], 
        estoque: 5,
        unidade: "kg",
        precoPorUn: 60.00,
        nutrientes100g: {
            calorias: 486,
            proteinas: 16.5,
            carboidratos: 42.1,
            gorduras: 30.7
        }
    },
    { 
        nome: "Gergelim Preto", 
        tipo: "Semente", 
        vegano: true, 
        alergenos: ["Gergelim"], 
        estoque: 3,
        unidade: "kg",
        precoPorUn: 40.00,
        nutrientes100g: {
            calorias: 573,
            proteinas: 17.7,
            carboidratos: 23.5,
            gorduras: 49.7
        }
    },

    // Frutas
    { 
        nome: "Mirtilos", 
        tipo: "Fruta", 
        vegano: true, 
        alergenos: [], 
        estoque: 4,
        unidade: "kg",
        precoPorUn: 70.00,
        nutrientes100g: {
            calorias: 57,
            proteinas: 0.7,
            carboidratos: 14.5,
            gorduras: 0.3
        }
    },
    { 
        nome: "Banana-da-Terra", 
        tipo: "Fruta", 
        vegano: true, 
        alergenos: [], 
        estoque: 30,
        unidade: "un",
        precoPorUn: 2.00,
        nutrientes100g: {
            calorias: 122,
            proteinas: 1.3,
            carboidratos: 31.9,
            gorduras: 0.4
        }
    },

    // Proteínas Alternativas
    { 
        nome: "Seitan", 
        tipo: "Proteína Vegetal", 
        vegano: true, 
        alergenos: ["Glúten"], 
        estoque: 20,
        unidade: "kg",
        precoPorUn: 40.00,
        nutrientes100g: {
            calorias: 370,
            proteinas: 75.0,
            carboidratos: 14.0,
            gorduras: 2.0
        }
    },
    { 
        nome: "Lentilha Verde", 
        tipo: "Leguminosa", 
        vegano: true, 
        alergenos: [], 
        estoque: 20,
        unidade: "kg",
        precoPorUn: 18.00,
        nutrientes100g: {
            calorias: 353,
            proteinas: 24.6,
            carboidratos: 63.4,
            gorduras: 1.1
        }
    },
]);
