const functions = require('firebase-functions');
const routes = require('./routes');

exports.api = functions.https.onRequest(routes)