import { messaging } from 'firebase-admin';
import { fetchFCMToken } from '../data/database';
import { PageRequest } from "../data/models";

/**
 * Sends out a message using Firebase Cloud Messaging to the given UID.
 * Note: this will fail if the given UID isn't an admin.
 *
 * @param {PageRequest} request The content of the request
 * @param {String} uid The user ID to page; this will
 * @return {Promise} A promise that resolves when FCM pushes notifications
 */
export function pageAdmin(request: PageRequest, uid: string): Promise<messaging.MessagingDevicesResponse> {
  return new Promise<messaging.MessagingDevicesResponse>((resolve, reject) => {
    fetchFCMToken(uid).then((fcmToken) => {
      const payload = {
        data: {
          title: `There's a request for ${request.name}.`,
        },
      };
      messaging().sendToDevice(fcmToken, payload).then(response => {
        console.log('Successfully sent message:', response);
        resolve(response);
      }).catch((err) => {
        reject(err);
        console.error('Error when sending message', err);
      });
    }).catch((err) => {
      console.error(`Error when fetching FCM token for user ${uid}:`, err);
      reject(err);
    });
  });
}