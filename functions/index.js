const functions = require('firebase-functions');


exports.adminStatus = functions.https.onRequest((req, res) => {
  res.status(200).send('<p>Hello world!</p');
});
