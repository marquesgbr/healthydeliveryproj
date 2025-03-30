db.clientes.drop();
db.clientes.insertMany([
    {
        nome: "Carlos Albuquerque",
        email: "carlos.albuquerque@email.com",
        endereco: {
            rua: "Rua do Sol",
            numero: 100,
            bairro: "Santo Antônio",
            cidade: "Recife",
            cep: "50010-210"
        },
        telefone: "81987654321"
    },
    {
        nome: "Ana Beatriz Montenegro",
        email: "ana.montenegro@email.com",
        endereco: {
            rua: "Avenida Boa Viagem",
            numero: 1500,
            bairro: "Boa Viagem",
            cidade: "Recife",
            cep: "51020-000"
        },
        telefone: "81991234567"
    },
    {
        nome: "Roberto Cavalcanti",
        email: "roberto.cavalcanti@email.com",
        endereco: {
            rua: "Rua da Aurora",
            numero: 245,
            bairro: "Santo Amaro",
            cidade: "Recife",
            cep: "50070-055"
        },
        telefone: "81999887766"
    },
    {
        nome: "Juliana Santos",
        email: "juliana.santos@email.com",
        endereco: {
            rua: "Rua Domingos Ferreira",
            numero: 405,
            bairro: "Pina",
            cidade: "Recife",
            cep: "51011-020"
        },
        telefone: "81988776655"
    },
    {
        nome: "Marcos Oliveira",
        email: "marcos.oliveira@email.com",
        endereco: {
            rua: "Rua do Riachuelo",
            numero: 78,
            bairro: "Boa Vista",
            cidade: "Recife",
            cep: "50050-220"
        },
        telefone: "81977665544"
    },
    {
        nome: "Fernanda Lima",
        email: "fernanda.lima@email.com",
        endereco: {
            rua: "Avenida Caxangá",
            numero: 2200,
            bairro: "Cordeiro",
            cidade: "Recife",
            cep: "50711-000"
        },
        telefone: "81966554433"
    },
    {
        nome: "Ricardo Ferreira",
        email: "ricardo.ferreira@email.com",
        endereco: {
            rua: "Rua do Futuro",
            numero: 950,
            bairro: "Graças",
            cidade: "Recife",
            cep: "50050-010"
        },
        telefone: "81955443322"
    },
    {
        nome: "Patrícia Melo",
        email: "patricia.melo@email.com",
        endereco: {
            rua: "Rua da Hora",
            numero: 320,
            bairro: "Espinheiro",
            cidade: "Recife",
            cep: "52020-010"
        },
        telefone: "81944332211"
    },
    {
        nome: "Lucas Andrade",
        email: "lucas.andrade@email.com",
        endereco: {
            rua: "Avenida Norte",
            numero: 500,
            bairro: "São José",
            cidade: "Recife",
            cep: "50030-010"
        },
        telefone: "81933221100"
    },
    {
        nome: "Amanda Costa",
        email: "amanda.costa@email.com",
        endereco: {
            rua: "Rua do Sossego",
            numero: 150,
            bairro: "Soledade",
            cidade: "Recife",
            cep: "50070-040"
        },
        telefone: "81922110099"
    }
]);