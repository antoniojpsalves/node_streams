import { Database } from './database.js';
import { randomUUID } from 'node:crypto';


const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handle: (req, res) => {
      
      const users = database.selectAllData('users');
      return res.setHeader("Content-type", "application/json").end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path: '/users',
    handle: (req, res) => {
      
      //adicionando o json vindo pelo body
      const user = {
        id: randomUUID(),
        ...req.body
      };

      database.insert('users', user);

      return res.writeHead(201).end();
    }
  },

];