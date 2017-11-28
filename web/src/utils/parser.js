import csv from 'csv';
import uuidv4 from 'uuid/v4';


function clientCSV2json(clientArray) {
  const clients = [];
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
    clients.push(client);
  });
  return clients;
}

class Parser {
  // return an array of client objects
  static parseClients(input) {
    return new Promise(((resolve, reject) => {
      csv.parse(input, (err, output) => {
        if (err) {
          return reject(new Error('CSV File invalid'));
        }
        const clients = clientCSV2json(output.slice(1, output.length));
        return resolve(clients);
      });
    }));
  }
}

export default Parser;
