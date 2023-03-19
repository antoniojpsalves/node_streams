import http from 'node:http';
import { Transform } from 'node:stream';

// Stream de transformação: obrigatóriamente necessita receber dados de uma stream e enviar para outra. Intermediadora.
class InverseNumberStream extends Transform {

  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString() * -1);


    //Verificando se os dados estão chegando corretamente.
    console.log(transformed);

    // Primeiro parametro é o informativo de erro.
    callback(null, Buffer.from(String(transformed)));
  }
}


// req => podemos entender como sendo uma ReadableStream
// res => podemos entender como sendon uma WritableStream

const server = http.createServer((req, res) => {
  return req
    .pipe(new InverseNumberStream())
    .pipe(res);
});


server.listen(3334);