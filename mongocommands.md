1. $lookup
O operador $lookup permite buscar documentos de outra coleção dentro de uma aggregação. (Equivalente a JOIN no SQL).

* Exemplo a partir de "pedidos":
db.pedidos.aggregate([
  {
    $lookup: {
    from: "clientes", // Coleção a ser associada
    localField: "cliente\_id", // Campo na coleção "pedidos"
    foreignField: "\_id", // Campo correspondente em "clientes"
    as: "cliente\_info" // Nome do campo de saída
    }
  }
])