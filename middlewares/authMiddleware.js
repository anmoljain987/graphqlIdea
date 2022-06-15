export function getUuid(idToken) {
  getAuth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      // ...
    })
    .catch((error) => {
      console.log(error.message);
    });
}
