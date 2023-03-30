import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';


//GET => buscar um recurso no backend
//POST => Criar um recurso no backend
//PUT => Atualizar um recurso no backend
//PATCH => Atualizar uma informaçõa específica de um recurso no backend
//DELETE => Deletar um recurso no backend


// Stateful = aplicação depende de informação armazenada em memória. Seu comportamento se altera, ao recarregar a página.
// Stateless -> armazena os dados em alguma outra fonte permanente, como um banco de dados. E se comporta num padrão.



const server = http.createServer( async (req, res) => {

  const { method, url } = req;

  // console.log(body.name);

  await json(req, res);

  const route = routes.find( route => {
    return route.method === method && route.path === url;
  });

  if(route) {
    return route.handle(req, res);
  }

  // console.log(route);

  res.writeHead(404).end();
});

server.listen(3333);