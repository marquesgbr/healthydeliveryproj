
// Função que conta a quantidade de pedidos dentro de um intervalo de tempo
function countPedidosPorPeriodo(dataInicio, dataFim) {
    return db.pedidos.countDocuments({
        "dataPedido": {
            $gte: new Date(dataInicio),
            $lte: new Date(dataFim)
        }
    });
}
  // Testa para ver qual ano teve mais pedidos
console.log("Pedidos em 2023: " + countPedidosPorPeriodo('2023-01-01', '2023-12-31'))
console.log("Pedidos em 2024: " + countPedidosPorPeriodo('2024-01-01', '2024-12-31'));
console.log("Pedidos em 2025: " + countPedidosPorPeriodo('2025-01-01', '2025-12-31'));


// cria e atualiza novo pedido
const novoPedido = {
    clienteId: db.clientes.findOne({}, {_id:1})._id,
    itens: [
        { nome: "Pizza de Calabresa", quantidade: 1, precoUnitario: 50.0 },
        { nome: "Coca-Cola 2L", quantidade: 1, precoUnitario: 10.0 }
    ],
    dataPedido: new Date()
};

// insere
const resultado = db.pedidos.insertOne(novoPedido);
console.log("Pedido inserido com id: " + resultado.insertedId );

// atualiza
db.pedidos.updateOne(
    { _id: resultado.insertedId }, // Busca pelo ID gerado no insert
    { $set: { avaliacao: 5 } } // Cliente avaliou com nota 5
);
console.log("Pedido atualizado com sucesso!");
  

console.log("Pedidos em 2025: " + countPedidosPorPeriodo('2025-01-01', '2025-12-31'));

// remover dados
console.log("Deletando pedidos de abril de 2025 do sistema...")
db.pedidos.deleteMany({ dataPedido: { $gte: new Date("2025-04-01"), $lte : new Date('2025-04-30') } });

console.log("Pedidos em 2025: " + countPedidosPorPeriodo('2025-01-01', '2025-12-31'))