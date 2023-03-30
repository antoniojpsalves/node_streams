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



//Três formas de invio de informação para o backend

// Query Parameters: -> parametros nomeados que enviamos no próprio endereço da request (utilizado quando a url precisa ser Stateful)
// Utilizada para modificar a resposta apresentada, sem conter informações sensíveis, tipo filtros, paginação etc. Não é obrigatório.
// EX: http://localhost/users?group=123&status=ativo

// Route parameters: -> parametros não nomeados que enviamos diretamente via ROTA.
// Utilizado para identificação de um recurso.
// EX: http://localhost/users/1


// Request body: utilizado para envio de informações de um formulário
// Os dados enviados via body, não são fáceis de interceptar e passam pelo protocolo HTTPS.
//


const server = http.createServer( async (req, res) => {

  const { method, url } = req;

  await json(req, res);

  const route = routes.find( route => {
    return route.method === method && route.path === url;
  });

  if(route) 
    return route.handle(req, res);

  res.writeHead(404).end();
});

server.listen(3333);