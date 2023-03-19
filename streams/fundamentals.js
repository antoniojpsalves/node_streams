// Netflix & Spotify

// Impotação de clientes via CSV  (Excel)
// 1GB - 1.000.000
// POST /upload import.csv


// 10mb/s -> 100s

// 100s -> inserções no banco de dados

// 10mb/s -> 10.000 linhas

// Exemplo de stream Readable e Writable
// process.stdin.pipe(process.stdout);



import { Readable, Writable, Transform } from 'node:stream';


//Stream de leitura: serve apenas para ler os dados.
class OneToHundredStream extends Readable {

  index = 1;
  //unica função obrigatória

  _read() {
    const i = this.index++;
    
    setTimeout(() => {
      //Se o i for maior que 100 declaramos o final da stream retornando null
      if (i > 100) return this.push(null);

      //Não podemos retornar um tipo primitivo de dados, precisa ser string, buffer ou array [object]
      //Extrutura de dados específica do NodeJS
      const buff = Buffer.from(String(i));

      //Se não retornamos o i
      return this.push(buff);
    }, 1000);
  }
}

//Stream de escrita: serve apenas para escrever dados
class MultuplyByTenStream extends Writable {

  // chunk -> é o pedaço da stream enviado pela stream de leitura.
  // encoding -> como está codigicado o pedaço recebido.
  // callback -> função que chamamos ao finalizar a stream.
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

// Stream de transformação: obrigatóriamente necessita receber dados de uma stream e enviar para outra. Intermediadora.
class InverseNumberStream extends Transform {

  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString() * -1);

    // Primeiro parametro é o informativo de erro.
    callback(null, Buffer.from(String(transformed)));
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultuplyByTenStream());
