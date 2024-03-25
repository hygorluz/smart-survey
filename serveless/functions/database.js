const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore()
db.settings({ ignoreUndefinedProperties: true })


module.exports = db