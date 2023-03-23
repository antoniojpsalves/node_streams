import { randomUUID } from 'node:crypto';
import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';

//GET => buscar um recurso no backend
//POST => Criar um recurso no backend
//PUT => Atualizar um recurso no backend
//PATCH => Atualizar uma informaçõa específica de um recurso no backend
//DELETE => Deletar um recurso no backend


// Stateful = aplicação depende de informação armazenada em memória. Seu comportamento se altera, ao recarregar a página.
// Stateless -> armazena os dados em alguma outra fonte permanente, como um banco de dados. E se comporta num padrão.

const database = new Database();

const server = http.createServer( async (req, res) => {

  const { method, url } = req;

  // console.log(body.name);

  await json(req, res);

  if(method == 'GET' && url == '/users') {
    // Toda rota encontrada tem como padrão o status code 200 como resposta.
    const users = database.selectAllData('users');
    return res.setHeader("Content-type", "application/json").end(JSON.stringify(users));
  } 

  if(method == 'POST' && url == '/users') {
    //adicionando o json vindo pelo body
    const user ={
      id: randomUUID(),
      ...req.body
    };

    database.insert('users', user);

    return res.writeHead(201).end();
  }

  res.writeHead(404).end();
});

server.listen(3333);