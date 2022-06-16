// const { getAuth } = require("firebase/auth");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceFirebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://todo-list-anmol.herokuapp.com/",
});

exports.getUid = async function (idToken) {
  try {
    let res = await admin.auth().verifyIdToken(idToken);

    return res;
  } catch (error) {
    console.log(error.message);
  }
};
