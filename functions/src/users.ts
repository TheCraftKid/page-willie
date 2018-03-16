import * as admin from 'firebase-admin';
import { Event } from 'firebase-functions';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

// TODO: Replace me with stock image
const DEFAULT_IMAGE = 'https://lorempixel.com/192/192';

/**
 * Creates a user record in Cloud Firestore.
 * 
 * This initializes a user with an id, a name, an email, and an image.
 *
 * @param event {Event<UserRecord>} A Cloud Functions event containing the
 *        updated user
 * @return {Promise} A promise that resolves after the user is initialized
 */
export function createUserRecord(event: Event<UserRecord>) {
  const user = event.data;
  const uid = user.uid;
  const userData = {
    name: user.displayName,
    id: uid,
    email: user.email,
    imageUrl: generateUserImage(user.displayName),
  };
  return admin.firestore().collection('users').doc(uid)
    .set(userData)
    .then(() => {
      afterCreateUser(user);
    })
    .catch((e) => {
      console.error(`Error when building data for user ${uid}`);
    });
}

/**
 * Removes a user record in Cloud Firestore.
 * 
 * For archival purposes, this scrubs a user's data database except the
 * requests the user has sent.
 *
 * @param {Event<UserRecord>} email A Cloud Functions event containing the
 *        updated user
 * @return {Promise} A promise that resolves after the user is deleted
 */
export function deleteUserRecord(event: Event<UserRecord>) {
  const user = event.data;
  const uid = user.uid;

  return admin.firestore().collection('users').doc(uid).delete()
    .then(() => console.log(`User ${uid} deleted.`))
    .catch((e) => {
      console.error(`Couldn't delete user ${uid}.`, e);
    });
}

/**
 * Generates a profile image (192x192) based off the given name seed. 
 *
 * @param {String} name The name to generate an image off of
 */
function generateUserImage(name: string) {
  // TODO: Generate image based off name
  return DEFAULT_IMAGE;
}

/**
 * Attempts to verify the given user's email and sends a welcome message.
 *
 * @param {UserRecord} user The user to notify
 */
function afterCreateUser(user: UserRecord) {
  console.log(`Successfully created user record for ${user.uid}`);
  ensureVerifiedEmail(user.email, user.emailVerified)
    .then((verified) => {
      sendWelcomeEmail(user.email);
    })
    .catch((e) => {
      console.error(`Couldn't send verification email to user ${user}`, e);
    });
}

/**
 * Sends an email to the given email address to ask for verification. 
 *
 * @param {String} email The email address to verify
 * @param {Boolean} isVerified True if a user's email has been verified
 *                    through authentication
 */
function ensureVerifiedEmail(email: string, isVerified: boolean): Promise<void> {
  if (!isVerified) {
    // TODO: Send email 
  }
  return Promise.resolve();
}

/**
 * Sends a welcoming email to the given email address.
 * 
 * This email offers a description of what Page Willie is, a call to action to
 * page an admin, and the ability to opt out of emails.
 *
 * @param {String} email A real email address to send a message
 */
function sendWelcomeEmail(email: string) {
  // TODO: Send email
}

/**
 * Sends a farewell email to the given email address.
 *
 * This email thanks the user for using the service and encourages
 * the user to come back soon. 
 *
 * @param {String} email A real email address to send a message
 */
function sendGoodbyeEmail(email: string) {
  // TODO: Send email
}

/**
 * A model representing a user stored in the database, not used for auth.
 */
export interface User {
  readonly id: string,
  readonly name: string,
  readonly email: string,
  readonly imageUrl: String,
  readonly devices: Array<Device>,
}

export interface Device {
  readonly preferred: boolean,
  readonly fcmToken: string,
}