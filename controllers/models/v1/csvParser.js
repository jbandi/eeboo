
const parse = require('csv-parse');
const uuidv4 = require('uuid/v4');

function csv2json(clientArray) {
  const clients = {};
  clientArray.forEach((line) => {
    const id = uuidv4();
    const client = {
      id,
      mail: line[3],
      name: line[0],
      firstname: line[1],
      gender: line[2],
      feedbackers: [],
    };
    clients[id] = client;
  });
  return clients;
}

class Parser {
  static parseClient(input) {
    return new Promise(((resolve, reject) => {
      parse(input, (err, output) => {
        if (err) {
          return reject(new Error('CSV File invalid'));
        }
        const clients = csv2json(output.slice(1, output.length));
        return resolve(clients);
      });
    }));
  }
}

module.exports = Parser;
