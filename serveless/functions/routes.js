const app = require("express")();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authMiddleware = require('./auth-middleware');
const db = require('./database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/survey", function (request, response) {
  db
    .collection("survey")
    .get()
    .then(function (docs) {
      let surveyList = [];
      docs.forEach(function (doc) {
        surveyList.push({
          id: doc.id,
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

app.get("/survey/:id", function (request, response) {
  db
    .collection("survey")
    .doc(request.params.id)
    .get()
    .then(function (doc) {
      response.json({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt,
        expiresAt: doc.data().expiresAt,
        options: doc.data().options
      });
    })
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

//================================================================================================
// ENDPOINTS PROTEGIDOS
//================================================================================================

app.use(authMiddleware);

app.post("/survey", function (request, response) {
  const { title, description, expiresAt, options } = request.body;

  const survey = {
    title,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiresAt,
    options
  }

  db
    .collection("survey")
    .add(survey)
    .then(function () {
      response.json(survey);
    })
})

app.put("/survey/:id", function (request, response) {
  const { title, description, expiresAt, options } = request.body;

  const survey = {
    title,
    description,
    updatedAt: new Date().toISOString(),
    expiresAt,
    options
  }

  db
    .collection("survey")
    .doc(request.params.id)
    .update(survey)
    .then(function () {
      response.json(survey);
    })
})

app.delete("/survey/:id", function (request, response) {
  db
    .collection("survey")
    .doc(request.params.id)
    .delete()
    .then(function () {
      response.json({ id: request.params.id });
    })
})

module.exports = app