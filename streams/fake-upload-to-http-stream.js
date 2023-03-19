import { Readable } from 'node:stream';


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


fetch('http://localhost:3333', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half' //nas verões novas do nodejs, precisa enviar esse param
});