const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage} = require('firebase-admin/storage');
const serviceAccount = require('./key_firebase.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'anonymous-b685e.appspot.com'
});

const bucket = getStorage().bucket()
module.exports = { bucket }