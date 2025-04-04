db.pedidos.drop();

// pra acessar o id dos clientes pelo email deles:
const mapClientes = {};
const clientesInseridos = db.clientes.find({}).toArray(); // Busca todos os ingredientes
clientesInseridos.forEach(cli => { mapClientes[cli.email] = cli._id; }); //coloca todos no map

// pra acessar o id dos clientes pelo email deles:
const mapItensCardapio = {};
const itensInseridos = db.cardapio.find({}).toArray(); // Busca todos os ingredientes
itensInseridos.forEach(item => { mapItensCardapio[item.nome] = item._id; }); //coloca todos no map


// inserir
db.pedidos.insertMany([
    {
        cliente: mapClientes["carlos.albuquerque@email.com"],
        itens: [
            {
                item: mapItensCardapio["Bowl de Salmão Energético"],
                nome: "Bowl de Salmão Energético",
                quantidade: 1,
                precoUnitario: 42.90,
                observacoes: "Sem cebola"
            },
            {
                item: mapItensCardapio["Smoothie Verde Energético"],
                nome: "Smoothie Verde Energético",
                quantidade: 1,
                precoUnitario: 18.90,
                observacoes: "Adicionar gengibre"
            }
        ],
        enderecoEntrega: {
            rua: "Rua do Sol",
            numero: "100",
            complemento: "Apto 302",
            bairro: "Santo Antônio",
            cidade: "Recife",
            cep: "50010-210",
            pontoReferencia: "Próximo ao mercado Pão Doce"
        },
        dataPedido: new Date("2024-05-28T10:30:00"),
        taxaEntrega: 8.50,
        avaliacao: {
            nota: 5,
            comentario: "Entrega rápida e comida deliciosa!"
        }
    },
    {
        cliente: mapClientes["ana.montenegro@email.com"],
        itens: [
            {
                item: mapItensCardapio["Bowl Vegano Power"],
                nome: "Bowl Vegano Power",
                quantidade: 2,
                precoUnitario: 36.90,
                observacoes: "Molho à parte"
            }
        ],
        enderecoEntrega: {
            rua: "Avenida Boa Viagem",
            numero: "1500",
            bairro: "Boa Viagem",
            cidade: "Recife",
            cep: "51020-000",
            pontoReferencia: "Edifício Mar Azul, portaria 2"
        },
        dataPedido: new Date("2025-05-28T12:15:00"),
        taxaEntrega: 10.00,
        avaliacao: {
            nota: 4,
            comentario: "Sabor ótimo, mas atrasou 15 minutos"
        }
    },
    {
        cliente: mapClientes["roberto.cavalcanti@email.com"],
        itens: [
            {
                item: mapItensCardapio["Omelete Fit de Espinafre"],
                nome: "Omelete Fit de Espinafre",
                quantidade: 1,
                precoUnitario: 28.50,
                observacoes: "Bem passado"
            },
            {
                item: mapItensCardapio["Avocado Toast Integral"],
                nome: "Avocado Toast Integral",
                quantidade: 1,
                precoUnitario: 22.90,
                observacoes: "Sem gergelim"
            }
        ],
        enderecoEntrega: {
            rua: "Rua da Aurora",
            numero: "245",
            bairro: "Santo Amaro",
            cidade: "Recife",
            cep: "50070-055",
            pontoReferencia: "Ao lado da farmácia Pague Menos"
        },
        dataPedido: new Date("2023-05-29T08:45:00"),
        taxaEntrega: 7.00
    },
    {
        cliente: mapClientes["juliana.santos@email.com"],
        itens: [
            {
                item: mapItensCardapio["Wrap de Tofu e Vegetais"],
                nome: "Wrap de Tofu e Vegetais",
                quantidade: 1,
                precoUnitario: 26.50,
                observacoes: "Sem tomate"
            },
            {
                item: mapItensCardapio["Smoothie Verde Energético"],
                nome: "Smoothie Verde Energético",
                quantidade: 1,
                precoUnitario: 18.90,
                observacoes: "Adicionar gengibre"
            }
        ],
        enderecoEntrega: {
            rua: "Rua Domingos Ferreira",
            numero: "405",
            bairro: "Pina",
            cidade: "Recife",
            cep: "51011-020",
            pontoReferencia: "Condomínio Praia Linda"
        },
        dataPedido: new Date("2024-05-29T19:20:00"),
        taxaEntrega: 9.00,
        avaliacao: {
            nota: 5,
            comentario: "Perfeito para uma janta leve!"
        }
    },
    {
        cliente: mapClientes["juliana.santos@email.com"],
        itens: [
            {
                item: mapItensCardapio["Bowl Vegano Power"],
                nome: "Bowl Vegano Power",
                quantidade: 2,
                precoUnitario: 36.90,
                observacoes: "Extra tofu"
            },
            {
                item: mapItensCardapio["Pudim de Chia com Frutas"],
                nome: "Pudim de Chia com Frutas",
                quantidade: 1,
                precoUnitario: 16.90,
                observacoes: "Sem mel"
            }
        ],
        enderecoEntrega: {
            rua: "Rua Domingos Ferreira",
            numero: "405",
            bairro: "Pina",
            cidade: "Recife",
            cep: "51011-020",
            pontoReferencia: "Condomínio Praia Linda"
        },
        dataPedido: new Date("2024-05-29T19:20:00"),
        taxaEntrega: 9.00,
        avaliacao: {
            nota: 5,
            comentario: "Perfeito para uma janta leve!"
        }
    },
    {
        cliente: mapClientes["marcos.oliveira@email.com"],
        itens: [
            {
                item: mapItensCardapio["Espaguete de Abobrinha com Frango"],
                nome: "Espaguete de Abobrinha com Frango",
                quantidade: 1,
                precoUnitario: 38.50,
                observacoes: "Molho extra"
            }
        ],
        enderecoEntrega: {
            rua: "Rua do Riachuelo",
            numero: "78",
            bairro: "Boa Vista",
            cidade: "Recife",
            cep: "50050-220",
            pontoReferencia: "Próximo ao Banco do Brasil"
        },
        dataPedido: new Date("2024-05-30T12:45:00"),
        taxaEntrega: 7.50
    },
    {
        cliente: mapClientes["fernanda.lima@email.com"],
        itens: [
            {
                item: mapItensCardapio["Avocado Toast Integral"],
                nome: "Avocado Toast Integral",
                quantidade: 2,
                precoUnitario: 22.90,
                observacoes: "Ovos bem cozidos"
            },
            {
                item: mapItensCardapio["Smoothie Verde Energético"],
                nome: "Smoothie Verde Energético",
                quantidade: 1,
                precoUnitario: 18.90,
                observacoes: "Sem banana"
            }
        ],
        enderecoEntrega: {
            rua: "Avenida Caxangá",
            numero: "2200",
            bairro: "Cordeiro",
            cidade: "Recife",
            cep: "50711-000",
            pontoReferencia: "Portão azul"
        },
        dataPedido: new Date("2024-05-30T08:15:00"),
        taxaEntrega: 8.00,
        avaliacao: {
            nota: 4,
            comentario: "O smoothie veio sem gengibre, mas o toast estava ótimo!"
        }
    },
    {
        cliente: mapClientes["ricardo.ferreira@email.com"],
        itens: [
            {
                item: mapItensCardapio["Bowl de Frango com Quinoa"],
                nome: "Bowl de Frango com Quinoa",
                quantidade: 3,
                precoUnitario: 39.90,
                observacoes: "Brócolis al dente"
            },
            {
                item: mapItensCardapio["Pudim de Chia com Frutas"],
                nome: "Pudim de Chia com Frutas",
                quantidade: 4,
                precoUnitario: 16.90,
                observacoes: "Sem mel"
            }
        ],
        enderecoEntrega: {
            rua: "Rua do Futuro",
            numero: "950",
            bairro: "Graças",
            cidade: "Recife",
            cep: "50050-010",
            pontoReferencia: "Sala 304"
        },
        dataPedido: new Date("2024-05-30T13:00:00"),
        taxaEntrega: 10.00,
        avaliacao: {
            nota: 2,
            comentario: "O frango estava ruim e o pudim veio com mel. Mais atenção na próxima."
        }
    },
    {
        cliente: mapClientes["patricia.melo@email.com"],
        itens: [
            {
                item: mapItensCardapio["Curry de Grão-de-Bico"],
                nome: "Curry de Grão-de-Bico",
                quantidade: 1,
                precoUnitario: 34.90,
                observacoes: "Picante"
            },
            {
                item: mapItensCardapio["Bowl Vegano Power"],
                nome: "Bowl Vegano Power",
                quantidade: 1,
                precoUnitario: 36.90,
                observacoes: "Extra tofu"
            }
        ],
        enderecoEntrega: {
            rua: "Rua da Hora",
            numero: "320",
            bairro: "Espinheiro",
            cidade: "Recife",
            cep: "52020-010",
            pontoReferencia: "Interfone 205"
        },
        dataPedido: new Date("2023-05-30T20:00:00"),
        taxaEntrega: 9.50,
        avaliacao: {
            nota: 5,
            comentario: "Adorei o sabor do curry! Entrega super rápida."
        }
    },
]);