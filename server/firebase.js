const admin = require('firebase-admin');
const credentials = require("./key.json")

admin.initializeApp({
  credential: admin.credential.cert(credentials)
})

const db = admin.firestore();
console.log("connecting to the database")

module.exports = db