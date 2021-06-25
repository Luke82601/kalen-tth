const db = require('./index.js')

const getAllCompanies = (req, res) => {
  const sql = 'SELECT * FROM clients';
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log('Got all clients');
      res.status(200).send(results);
    }
  });
};

const getAllContacts = (req, res) => {
  const sql = 'SELECT * FROM contacts WHERE client_id = ?';
  const { client_id } = req.params;
  db.query(sql, [ client_id ], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log('Got all contacts');
      res.status(200).send(results);
      console.log(results);
    }
  });
};

const addClient = (req, res) => {
  const sql = 'INSERT INTO clients (company, address, main_phone) VALUES (?, ?, ?)';
  const { company, address, main_phone } = req.body;
  db.query(sql, [ company, address, main_phone ], (err, results) => {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      res.status(500).send(err);
    } else {
      console.log('Added a new category');
      res.status(200).send(results);
    }
  });
};

const addContact = (req, res) => {
  const sql = `
  INSERT INTO contacts (client_id, first_name, last_name, email, phone, position) VALUES (
    (select id from clients where id = ?),?,?,?,?,?) `
  const { client_id, first_name, last_name, email, phone, position } = req.body;
  const { id } = req.params
  db.query(sql, [ id, first_name, last_name, email, phone, position ], (err, results) => {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      res.status(500).send(err);
    } else {
      console.log('Added a new category');
      res.status(200).send(results);
    }
  });
};

module.exports = {
  getAllCompanies,
  getAllContacts,
  addClient,
  addContact
};