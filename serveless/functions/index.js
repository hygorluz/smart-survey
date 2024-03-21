
// const { onRequest } = require("firebase-functions/v2/https")
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const app = require("express")();

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

// app.post("/survey", function (request, response) {
//   db.add({ description: request.body.description })
//     .then(function () {
//       response.json({ general: "Works" });
//     })
// })

exports.api = functions.https.onRequest(app)