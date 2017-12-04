import { database } from 'firebase-admin';
import { Admin } from './models';

/**
 * Checks if the given user has admin status and will recieve page requests.
 * 
 * @param uid {string} The UID of the acocunt to check
 * @return {Promise<boolean>} True if the given UID has admin privileges
 */
export function checkAdminStatus(uid: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    database().ref(`/admin/${uid}`).once('value')
      .then((snap) => {
        resolve(typeof snap.val() === 'boolean' && snap.val());
      })
      .catch((err) => reject(err));
  });
}

/**
 * Fetches the list of admins from the database.
 * 
 * @return {string[]} A list of current admin UIDs
 */
export function getAdmins(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    database().ref('/admin').once('value')
      .then((snap) => resolve(snap.val() as string[]))
      .catch((err) => reject(err));
  });
}

/**
 * Fetches the FCM token for the given UID.
 * Note: Only works for registered admins.
 * 
 * @param {String} uid The user for whom to fetch the FCM token
 * @return {Promise<string>} A promise that resolves when the database finds the 
 *                           given UID if it exists.
 */
export function fetchFCMToken(uid: string): Promise<string> {
  return new Promise((resolve, reject) => {
    database().ref(`/admin/${uid}`).once('value')
      .then((snap) => {
        if (snap.exists()) {
          resolve(snap.val().fcmToken);
        } else {
          reject(`Given value ${uid} does not exist.`);
        }
      });
  });
}