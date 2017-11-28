const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * @return {Array} A list of current admin UIDs
 */
function getAdmins() {
  return admin.database().ref('/admin').once('value')
    .then((snap) => {
      return snap.val();
    });
}

/**
 * Sends out a message using Firebase Cloud Messaging to the given UID.
 * Note: this will fail if the given UID isn't an admin.
 *
 * @param {Object} request The content of the request
 * @param {String} uid The user ID to page; this will
 * @return {Promise} A promise that resolves when FCM pushes notifications
 */
function pageAdmin(request, uid) {
  return fetchFCMToken(uid).then((fcmToken) => {
    const payload = {
      data: {
        title: `There's a request for ${request.title}.`,
      },
    };
    return admin.messaging().sendToDevice(payload, fcmToken)
      .then((response) => {
        conosle.log('Successfully sent message:', response);
      }).catch((err) => {
        console.error('Error when sending message:', err);
      });
  }).catch((err) => {
    console.error(err);
  });
}

/**
 * @param {String} uid The user for whom to fetch the FCM token
 * @return {Promise} A promise that resolves when the database finds the given
 *                   UID if it exists.
 */
function fetchFCMToken(uid) {
  return admin.database().ref(`/admin/${uid}`).once('value')
    .then((snap) => {
      if (snap.exists()) {
        return snap.val().fcmToken;
      } else {
        return Promise.reject(`Given value ${uid} does not exist.`);
      }
    });
}

module.exports.notifyWillie = functions.database.ref('/requests/{uid}')
  .onCreate((event) => {
    const requestId = event.params.uid;
    return getAdmins().forEach((adminId) => {
      pageAdmin(requestId, adminId);
    });
  });

exports.adminStatus = functions.https.onRequest((req, res) => {
  const uid = req.params.uid;
  admin.database().ref(`/admin/${uid}`).once('value')
  .then((snap) => {
    if (typeof snap.val() == Boolean && snap.val()) {
      res.json({
        isAdmin: true,
      });
    } else {
      res.json({
        isAdmin: false,
      });
    }
  }).catch((err) => {
    console.error(err);
    res.send(500);
  });
});
