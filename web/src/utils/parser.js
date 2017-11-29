import csv from 'csvtojson';
import uuidv4 from 'uuid/v4';


// parse a CSV file of clients to JSON
// return an array
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

// parse a CSV file of feedbackers to JSON
// return an array
function feedbackerCSV2json(feedbackerArray) {
  const feedbackers = [];
  feedbackerArray.forEach((line) => {
    const feedbacker = {
      name: line[0],
      firstname: line[1],
      gender: line[2],
      mail: line[3],
      role: line[4],
    };
    feedbackers.push(feedbacker);
  });
  return feedbackers;
}

class Parser {
  // return an array of client objects
  static parseClients(input) {
    return new Promise(((resolve, reject) => {
      const clients = [];
      csv({ noheader: false })
        .fromString(input)
        .on('csv', (csvRow) => {
          clients.push(csvRow);
        })
        .on('done', (error) => {
          if (error) {
            return reject(new Error('CSV File invalid'));
          }
          return resolve(clientCSV2json(clients));
        });
    }));
  }

  // return an array of feedbacker objects
  static parseFeedbackers(input) {
    return new Promise(((resolve, reject) => {
      const feedbackers = [];
      csv({ noheader: false })
        .fromString(input)
        .on('csv', (csvRow) => {
          feedbackers.push(csvRow);
        })
        .on('done', (error) => {
          if (error) {
            return reject(new Error('CSV File invalid'));
          }
          return resolve(feedbackerCSV2json(feedbackers));
        });
    }));
  }
}

export default Parser;
