db = db.getSiblingDB("healthy");
db.clientes.drop();
db.clientes.insertMany([
    { "name":"João da Silva", "cpf": '000.111.222-33' },
    { "name":"Maria Souza", "cpf": '999.111.222-33' }
]);