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

app.post("/survey",  async (request, response) => {
  const body = request.body;

  const survey = {
    title: body?.title,
    description: body?.description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiresAt: body?.expiresAt,
    options: body?.options?.map(option => ({ ...option, votes: 0, id: crypto.randomUUID() }))
  }

  try {
    const docRef = await db.collection("survey").doc(); 
    await docRef.set(survey);
  
    return response.json(survey); 
  
  } catch (error) {
    console.error(error);
  
    const errorMessage = error.message || "Unknown Firestore Error";
    const errorCode = error.code || "UNKNOWN";
  
    return response.status(500).json({
      success: false,
      message: "Failed to set document in Firestore.",
      error: {
        message: errorMessage,
        code: errorCode
      }
    });
  }

})

app.put("/survey/:id", async (request, response) => {
  const body = request.body;

  const survey = {
    title: body?.title,
    description: body?.description,
    updatedAt: new Date().toISOString(),
    expiresAt: body?.expiresAt,
    options: body?.options
  }

  try {
    const docRef = await db.collection("survey").doc(request.params.id)
    await docRef.update(survey);

    return response.json(survey);
  } catch (error) {
    console.error(error);

    const errorMessage = error.message || "Unknown Firestore Error";
    const errorCode = error.code || "UNKNOWN";

    return response.status(500).json({
      success: false,
      message: "Failed to update document in Firestore.",
      error: {
        message: errorMessage,
        code: errorCode
      }
    })
  }

})

app.put('/survey/:id/vote', (req, res) => {
  const { optionId } = req.body;
  const surveyId = req.params.id;

  db.collection('survey').doc(surveyId).get()
    .then(doc => {
      const survey = doc.data();
      const option = survey.options.find(option => option.id === optionId);

      if (!option) {
        return res.status(400).send('Invalid option');
      }

      option.votes = option.votes + 1;

      db.collection('survey').doc(surveyId).update({ options: survey.options })
        .then(() => res.json(survey));
    });
});

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