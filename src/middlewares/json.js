export async function json(req, res) {
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

  res.setHeader('Content-Type', 'application/json');
}