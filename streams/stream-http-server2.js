import http from 'node:http';
import { Transform } from 'node:stream';

class InvertNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString() * -1);

    console.log(`Recebendo... ${transformed}`);

    callback(null, Buffer.from(String(transformed)));
  }
}

//Caso necessário trabalhar com a stream completa antes de processar, da pra usar o await como já estou acostumado no react

const server = http.createServer(async (req, res) => {

  // Array com cada chunk do buffer
  const buffers = [];

  // utilizando await no for, ele espera receber todos os pedaços do buffer antes de seguir em frente no código
  for await (const chunk of req) {
    buffers.push(chunk);
  }


  //Usando o concat, consigo unir de volta os chunks no buffer completo
  const fullStreamContent = Buffer.concat(buffers).toString();

  // return req.pipe(new InvertNumberStream()).pipe(res);

  console.log(fullStreamContent);

  return res.end(fullStreamContent);

});

server.listen(3334);