const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });
const profilesRef = admin.firestore().collection('profiles');

// exports.createProfile = functions.auth.user().onCreate((user) => {
//   return profilesRef.doc(user.uid).set({
//     handle: '',
//     displayName: user.displayName,
//     createdAt: new Date(),
//   });
// });

exports.deleteProfile = functions.auth.user().onDelete((user) => {
  return profilesRef.doc(user.uid).delete();
});
