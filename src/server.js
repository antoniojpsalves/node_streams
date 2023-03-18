import http from 'node:http';

//GET => buscar um recurso no backend
//POST => Criar um recurso no backend
//PUT => Atualizar um recurso no backend
//PATCH => Atualizar uma informaçõa específica de um recurso no backend
//DELETE => Deletar um recurso no backend


// Stateful = aplicação depende de informação armazenada em memória. Seu comportamento se altera, ao recarregar a página.
// Stateless -> armazena os dados em alguma outra fonte permanente, como um banco de dados. E se comporta num padrão.

const users = [];

const server = http.createServer((req, res) => {

  const { method, url } = req;

  if(method == 'GET' && url == '/user') {
    return res.setHeader("content-type", "application/json").end(JSON.stringify(users));
  } 

  if(method == 'POST' && url == '/user') {
    users.push({
      id: 1,
      name: "Antonio",
      email: "antonio@gmail.com"
    });

    return res.end("Criação de um novo usuário");
  }

  res.end('Hello World');
});

server.listen(3333);