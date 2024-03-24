// const { onRequest } = require("firebase-functions/v2/https")
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const app = require("express")();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

admin.initializeApp();

const db = admin.firestore()

app.get("/survey", function (request, response) {
  db
    .collection("survey")
    .get()
    .then(function (docs) {
      let surveyList = [];
      docs.forEach(function (doc) {
        surveyList.push({
          id: doc.data().id,
          title: doc.data().title,
          description: doc.data().description,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
          expiresAt: doc.data().expiresAt,
          options: doc.data().options
        })
      })

      response.json(surveyList);
    });
})

app.post('/login', (req, res) => {
  const { login, password } = req.body;
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

  db.collection('users').where('login', '==', login).where('password', '==', passwordHash).get()
    .then(snapshot => {
      if (snapshot.empty) {
        return res.status(401).send('Unauthorized');
      }

      const user = snapshot.docs[0].data();
      const token
        = jwt.sign({ login: user.login, role: user.role },
          'secret',
          { expiresIn: '1h' });

      return res.json({ token });
    })
});



// app.post("/survey", function (request, response) {
//   db.add({ description: request.body.description })
//     .then(function () {
//       response.json({ general: "Works" });
//     })
// })

exports.api = functions.https.onRequest(app)