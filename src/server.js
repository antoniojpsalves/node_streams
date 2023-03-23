import { randomUUID } from 'node:crypto';
import http from 'node:http';

//GET => buscar um recurso no backend
//POST => Criar um recurso no backend
//PUT => Atualizar um recurso no backend
//PATCH => Atualizar uma informaçõa específica de um recurso no backend
//DELETE => Deletar um recurso no backend


// Stateful = aplicação depende de informação armazenada em memória. Seu comportamento se altera, ao recarregar a página.
// Stateless -> armazena os dados em alguma outra fonte permanente, como um banco de dados. E se comporta num padrão.

const users = [];

const server = http.createServer( async (req, res) => {

  const { method, url } = req;


  //criando um array para receber os chunks da stream
  const buffers = [];

  //usando o await para pegar cada chunk e inserir no array antes de seguir
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  //Esqueminha usando try/catch para caso o body não exista no request
  try {
    //Para poder acessar precisamos usar JSON.parse()
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  // console.log(body.name);

  if(method == 'GET' && url == '/users') {
    // Toda rota encontrada tem como padrão o status code 200 como resposta.
    return res.setHeader("Content-type", "application/json").end(JSON.stringify(users));
  } 

  if(method == 'POST' && url == '/users') {
    //adicionando o json vindo pelo body
    users.push({
      id: randomUUID(),
      ...req.body
    });

    return res.writeHead(201).end();
  }

  res.writeHead(404).end();
});

server.listen(3333);