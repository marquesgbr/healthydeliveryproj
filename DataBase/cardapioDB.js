db = db.getSiblingDB("healthy");
db.cardapio.drop();
db.cardapio.insertMany([
    { "name":"coxinha", "valor":5.50 },
    { "name":"pastel", "valor":6.50 }
]);