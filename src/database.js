import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  //definindo um obj para guardar as tabelas do banco
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
    .then(data => {
      this.#database = JSON.parse(data);
    })
    .catch(() => {
      this.#persist();
    });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  //metodo que busca todos os items da tabela criada. Caso não exista, retorna um array vazio
  selectAllData(tabela) {
    const data = this.#database[tabela] ?? [];
    return data;
  }

  //metodo que registra a informação na tabela, verificando se já existe e agindo de acordo
  insert(tabela, dados) {

    if(Array.isArray(this.#database[tabela])) {
      this.#database[tabela].push(dados);
      return true;
    }

    this.#database[tabela] = [dados];


    this.#persist();
    return true;
  }
}