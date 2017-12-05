import csv from 'csvtojson';
import uuidv4 from 'uuid/v4';


// parse a CSV string of clients to JSON
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
      role: line[4],
    };
    clients.push(client);
  });
  return clients;
}

// parse a CSV string of feedbackers to JSON
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

// parse a CSV string of questionaires to json
// return an isArray
function questionCSV2json(questionArray) {
  const questions = [];
  questionArray.forEach((line, index) => {
    if (line[2] !== '') {
      const question = {
        id: index,
        scores: 5,
        context: line[2],
        contents: [{
          content: line[5],
          female: line[7],
          lan: 'de',
          role: 'foreign',
        }, {
          content: line[11],
          female: line[11],
          lan: 'de',
          role: 'self',
        }, {
          content: line[18],
          female: line[20],
          lan: 'en',
          role: 'foreign',
        }, {
          content: line[22],
          female: line[22],
          lan: 'de',
          role: 'self',
        }],
      };
      questions.push(question);
    }
  });
  return questions;
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

  // return an array of question objects
  static parseQuestions(input) {
    return new Promise(((resolve, reject) => {
      const questions = [];
      csv({ noheader: false })
        .fromString(input)
        .on('csv', (csvRow) => {
          questions.push(csvRow);
        })
        .on('done', (error) => {
          if (error) {
            return reject(new Error('CSV File invalid'));
          }
          return resolve(questionCSV2json(questions));
        });
    }));
  }
}

export default Parser;
