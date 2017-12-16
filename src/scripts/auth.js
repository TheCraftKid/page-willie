'use strict';

let lastUser = null;

(function init() {
  firebase.auth().onAuthStateChanged((user) => {
    lastUser = user;
  });
})();

/**
 * Returns the currently signed in user's name if one exists.
 *
 * @return {String} The name of the signed in user
 */
function getDisplayName() {
  return lastUser ? lastUser.displayName : '';
}

/**
 * Returns the currently signed in user's name if one exists.
 *
 * @return {String} The profile URL of the currently signed in user.
 */
function getImageUrl() {
  return lastUser ? lastUser.photoURL : '';
}
