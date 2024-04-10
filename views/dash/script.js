function ola() {
  console.log("Olá mundo");
}

function criaCompra() {
  // Fazer uma solicitação para obter os dados necessários após o carregamento da página
  let valor = document.getElementById("valor").value;
  let quantidade = document.getElementById("quantidade").value;
  let status = document.getElementById("status").value;
  let produto = document.getElementById("produto").value;

  console.log(valor, quantidade, status);
  let token = localStorage.getItem("token");
  let email = localStorage.getItem("email");
  let userId = localStorage.getItem("userId");
  //console.log(userId,email,token)
  fetch("/user/cadastraProduto", {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      valor: valor,
      quantidade: quantidade,
      status: status,
      email: email,
      userId: userId,
      nome: produto,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
    });
}

function cardCadastroCompra() {
  console.log("criado");

  let body = (document.getElementById("body").innerHTML = `
  <div class="container">
    <div class="row justify-content-center align-items-center align-content-center rowCard">
      <div class="col-md-6 cardEdit">
      <div class="container mt-5">
      <h1>Criação do Pedido</h1>
      <form>
        <div class="mb-3">
        <label for="noProdutome" class="form-label">Produto:</label>
        <input type="text" class="form-control" id="produto" name="produto" enable>
        </div>
        <div class="mb-3">
          <label for="quantidade" class="form-label">Quantidade:</label>
          <input type="number" class="form-control" id="quantidade" name="quantidade" enable>
        </div>
        <div class="mb-3">
        <label for="valor" class="form-label">Valor:</label>
        <input type="text" class="form-control" id="valor" name="valor" enable>
        </div>
        <div class="mb-3">
          <label for="status" class="form-label" desable>Status:</label>
          <select class="form-select" id="status" name="status">
            <option value="Em andamento">Em andamento</option>
          </select>
        </div>
        <button type="submit" class="btn btn-warning">Voltar</button>
        <button type="submit" class="btn btn-success" onclick="criaCompra()">Salvar</button>

      </form>
    </div>
      </div>
    </div>
  </div>
`);
  console.log(valor, quantidade, status);
  body = document.getElementById("body").style.backgroundColor =
    "rgb(163 188 209";
  console.log(body);
}

function cardEditproduct() {
  addEventListener("click", (e) => {
    const Productid = e.target.parentElement.id;
    if (Productid) {
      fetch("/user/Produtos", {
        method: "GET",
        headers: {
          //Authorization: `${token}`,
          //"Content-Type": "application/json"
          id: Productid,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          document.getElementById("produto").value = data.nome;
          document.getElementById("quantidade").value = data.quantidade;
          document.getElementById("valor").value = data.valor;
          document.getElementById("status").value = data.status;
          document.getElementById("status").value = data.status;
          localStorage.setItem("produto.id", data._id);
        });
    }
  });
  let body = (document.getElementById("body").innerHTML = `
    <div class="container">
      <div class="row justify-content-center align-items-center align-content-center rowCard">
        <div class="col-md-6 cardEdit">
        <div class="container mt-5">
        <h1>informações do Pedido</h1>
        <form>
          <div class="mb-3">
          <label for="noProdutome" class="form-label">Produto:</label>
          <input type="text" class="form-control" id="produto" name="produto" disabled>
          </div>
          <div class="mb-3">
            <label for="quantidade" class="form-label">Quantidade:</label>
            <input type="number" class="form-control" id="quantidade" name="quantidade" disabled>
          </div>
          <div class="mb-3">
          <label for="valor" class="form-label">Valor:</label>
          <input type="text" class="form-control" id="valor" name="valor" disabled>
          </div>
          <div class="mb-3">
            <label for="status" class="form-label">Status:</label>
            <select class="form-select" id="status" name="status">
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          <button type="submit" class="btn btn-warning">Voltar</button>
          <button type="submit" class="btn btn-danger">Excluir</button>
          <button type="submit" class="btn btn-success" onclick="editProduct()">Salvar</button>
        </form>
      </div>
        </div>
      </div>
    </div>
  `);
  
  body = document.getElementById("body").style.backgroundColor =
    "rgb(163 188 209";
  console.log(body);
}

function cancelar() {
  window.location.reload(); // Recarrega a página ao clicar em "Cancelar"
}

function editProduct() {
  let valor = document.getElementById("valor").value;
  let quantidade = document.getElementById("quantidade").value;
  let status = document.getElementById("status").value;
  let produto = document.getElementById("produto").value;
  let Productid = localStorage.getItem("produto.id");
  let token = localStorage.getItem("token");
  console.log(Productid);
  fetch(`/user/${Productid}`, {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: status,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      //console.log(main, "main");
      window.location.reload()
    });
}