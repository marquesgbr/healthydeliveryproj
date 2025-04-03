// Drop existing collection
db.avaliacao.drop();

// Helper function to create client ID mapping
const createClientMapping = () => {
  const mapClientes = {};
  const clientesInseridos = db.clientes.find({}).toArray();
  clientesInseridos.forEach((cli) => {
    mapClientes[cli.email] = cli._id;
  });
  return mapClientes;
};

// Helper function to create menu items mapping
const createMenuItemsMapping = () => {
  const mapItensCardapio = {};
  const itensInseridos = db.cardapio.find({}).toArray();
  itensInseridos.forEach((item) => {});
  return mapItensCardapio;
};

// Get mappings
const mapClientes = createClientMapping();
const mapItensCardapio = createMenuItemsMapping();

// Insert orders
db.avaliacao.insertMany([
  {
    cliente: mapClientes["carlos.albuquerque@email.com"],
    itens: [
      {
        item: mapItensCardapio["Bowl de Salmão Energético"],
        quantidade: 1,
        precoUnitario: 42.9,
        observacoes: "Sem cebola",
      },
      {
        item: mapItensCardapio["Smoothie Verde Energético"],
        quantidade: 1,
        precoUnitario: 18.9,
        observacoes: "Adicionar gengibre",
      },
    ],
    enderecoEntrega: {
      rua: "Rua do Sol",
      numero: "100",
      complemento: "Apto 302",
      bairro: "Santo Antônio",
      cidade: "Recife",
      cep: "50010-210",
      pontoReferencia: "Próximo ao mercado Pão Doce",
    },
    dataPedido: new Date("2024-05-28T10:30:00"),
    taxaEntrega: 8.5,
    avaliacao: {
      nota: 5,
      comentario: "Entrega rápida e comida deliciosa!",
    },
  },
  {
    cliente: mapClientes["ana.silva@email.com"],
    itens: [
      {
        item: mapItensCardapio["Salada Caesar Fitness"],
        quantidade: 2,
        precoUnitario: 32.9,
        observacoes: "Molho à parte",
      },
    ],
    enderecoEntrega: {
      rua: "Avenida Boa Viagem",
      numero: "1500",
      complemento: "Bloco B, Apto 1201",
      bairro: "Boa Viagem",
      cidade: "Recife",
      cep: "51011-000",
      pontoReferencia: "Em frente ao posto Shell",
    },
    dataPedido: new Date("2024-05-28T12:45:00"),
    taxaEntrega: 10.0,
    avaliacao: {
      nota: 4,
      comentario: "Boa salada, mas demorou um pouco",
    },
  },
  {
    cliente: mapClientes["pedro.santos@email.com"],
    itens: [
      {
        item: mapItensCardapio["Bowl de Quinoa"],
        quantidade: 1,
        precoUnitario: 38.9,
        observacoes: "Extra de abacate",
      },
    ],
    enderecoEntrega: {
      rua: "Rua das Graças",
      numero: "45",
      complemento: "Casa",
      bairro: "Graças",
      cidade: "Recife",
      cep: "52011-200",
      pontoReferencia: "Próximo à padaria",
    },
    dataPedido: new Date("2024-05-28T13:15:00"),
    taxaEntrega: 7.5,
    avaliacao: {
      nota: 5,
      comentario: "Perfeito! Muito saboroso",
    },
  },
  {
    cliente: mapClientes["julia.costa@email.com"],
    itens: [
      {
        item: mapItensCardapio["Wrap Vegano"],
        quantidade: 2,
        precoUnitario: 28.9,
        observacoes: "Sem pimentão",
      },
    ],
    enderecoEntrega: {
      rua: "Rua da Aurora",
      numero: "789",
      complemento: "Sala 303",
      bairro: "Santo Amaro",
      cidade: "Recife",
      cep: "50030-000",
      pontoReferencia: "Edifício Empresarial",
    },
    dataPedido: new Date("2024-05-28T14:20:00"),
    taxaEntrega: 9.0,
    avaliacao: {
      nota: 4,
      comentario: "Bom wrap, entrega no prazo",
    },
  },
  {
    cliente: mapClientes["roberto.lima@email.com"],
    itens: [
      {
        item: mapItensCardapio["Smoothie Proteico"],
        quantidade: 3,
        precoUnitario: 22.9,
        observacoes: "Sem açúcar",
      },
    ],
    enderecoEntrega: {
      rua: "Avenida Caxangá",
      numero: "1000",
      complemento: "Apto 501",
      bairro: "Iputinga",
      cidade: "Recife",
      cep: "50800-000",
      pontoReferencia: "Próximo ao Shopping",
    },
    dataPedido: new Date("2024-05-28T15:30:00"),
    taxaEntrega: 8.0,
    avaliacao: {
      nota: 5,
      comentario: "Smoothie incrível!",
    },
  },
  {
    cliente: mapClientes["maria.oliveira@email.com"],
    itens: [
      {
        item: mapItensCardapio["Poke de Atum"],
        quantidade: 1,
        precoUnitario: 45.9,
        observacoes: "Picante",
      },
    ],
    enderecoEntrega: {
      rua: "Rua Benfica",
      numero: "234",
      complemento: "Casa 2",
      bairro: "Madalena",
      cidade: "Recife",
      cep: "50720-001",
      pontoReferencia: "Próximo à praça",
    },
    dataPedido: new Date("2024-05-28T16:45:00"),
    taxaEntrega: 7.0,
    avaliacao: {
      nota: 5,
      comentario: "Melhor poke da cidade!",
    },
  },
  {
    cliente: mapClientes["lucas.ferreira@email.com"],
    itens: [
      {
        item: mapItensCardapio["Salada Mediterranean"],
        quantidade: 2,
        precoUnitario: 34.9,
        observacoes: "Sem azeitonas",
      },
    ],
    enderecoEntrega: {
      rua: "Rua das Ninfas",
      numero: "567",
      complemento: "Apto 1002",
      bairro: "Boa Vista",
      cidade: "Recife",
      cep: "50070-050",
      pontoReferencia: "Em frente ao banco",
    },
    dataPedido: new Date("2024-05-28T17:30:00"),
    taxaEntrega: 9.5,
    avaliacao: {
      nota: 4,
      comentario: "Boa salada, entrega pontual",
    },
  },
  {
    cliente: mapClientes["clara.mendes@email.com"],
    itens: [
      {
        item: mapItensCardapio["Bowl Proteico"],
        quantidade: 1,
        precoUnitario: 39.9,
        observacoes: "Sem ovo",
      },
    ],
    enderecoEntrega: {
      rua: "Rua do Futuro",
      numero: "789",
      complemento: "Bloco A, Apto 304",
      bairro: "Graças",
      cidade: "Recife",
      cep: "52050-010",
      pontoReferencia: "Próximo ao colégio",
    },
    dataPedido: new Date("2024-05-28T18:15:00"),
    taxaEntrega: 8.5,
    avaliacao: {
      nota: 5,
      comentario: "Excelente refeição!",
    },
  },
  {
    cliente: mapClientes["bruno.castro@email.com"],
    itens: [
      {
        item: mapItensCardapio["Wrap de Frango"],
        quantidade: 3,
        precoUnitario: 26.9,
        observacoes: "Molho extra",
      },
    ],
    enderecoEntrega: {
      rua: "Avenida Norte",
      numero: "456",
      complemento: "Loja 2",
      bairro: "Casa Amarela",
      cidade: "Recife",
      cep: "52070-000",
      pontoReferencia: "Ao lado da farmácia",
    },
    dataPedido: new Date("2024-05-28T19:00:00"),
    taxaEntrega: 10.0,
    avaliacao: {
      nota: 4,
      comentario: "Muito bom, recomendo",
    },
  },
  {
    cliente: mapClientes["carolina.dias@email.com"],
    itens: [
      {
        item: mapItensCardapio["Smoothie Açaí"],
        quantidade: 2,
        precoUnitario: 24.9,
        observacoes: "Sem granola",
      },
    ],
    enderecoEntrega: {
      rua: "Rua da Hora",
      numero: "123",
      complemento: "Casa",
      bairro: "Espinheiro",
      cidade: "Recife",
      cep: "52020-010",
      pontoReferencia: "Próximo ao hospital",
    },
    dataPedido: new Date("2024-05-28T20:00:00"),
    taxaEntrega: 7.5,
    avaliacao: {
      nota: 5,
      comentario: "Smoothie perfeito!",
    },
  },
  {
    cliente: mapClientes["felipe.martins@email.com"],
    itens: [
      {
        item: mapItensCardapio["Salada Primavera"],
        quantidade: 1,
        precoUnitario: 31.9,
        observacoes: "Sem tomate",
      },
    ],
    enderecoEntrega: {
      rua: "Rua Real da Torre",
      numero: "890",
      complemento: "Apto 601",
      bairro: "Torre",
      cidade: "Recife",
      cep: "50610-000",
      pontoReferencia: "Próximo à academia",
    },
    dataPedido: new Date("2024-05-28T20:45:00"),
    taxaEntrega: 8.0,
    avaliacao: {
      nota: 4,
      comentario: "Ótima salada!",
    },
  },
]);
