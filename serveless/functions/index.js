// const { onRequest } = require("firebase-functions/v2/https")
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const app = require("express")();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

admin.initializeApp();

const db = admin.firestore().collection("survey");

app.get("/survey", function (request, response) {
  db.get()
    .then(function (docs) {
      let surveyList = [];
      docs.forEach(function (doc) {
        surveyList.push({
          title: doc.data().title,
          description: doc.data().description,
        })
      })

      response.json(surveyList);
    });
})

app.post('/login', (req, res) => {
  const { login, password } = req.body;
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

  db.collection('users').doc(login).get().then((doc) => {
    if (!doc.exists) {
      return res.status(404).send('Usuário não encontrado.');
    }

    const user = doc.data();
    if (user.password === passwordHash) {
      const token = jwt.sign({ login }, 'SmartSurvey', { expiresIn: '1h' })
      res.json({ token });
    } else {
      res.status(401).send('Login ou senha incorretos.');
    }
  }).catch((error) => {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).send('Erro interno do servidor.');
  });
});


// app.post("/survey", function (request, response) {
//   db.add({ description: request.body.description })
//     .then(function () {
//       response.json({ general: "Works" });
//     })
// })

exports.api = functions.https.onRequest(app)