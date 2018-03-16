import { database, messaging, firestore } from 'firebase-admin';
import { PageRequest } from './requests';
import { User } from './users';

async function notifyAdmin(adminId: string, request: PageRequest): Promise<void> {
  fetchAdmin(adminId)
}

async function fetchAdmin(adminId: string): Promise<void> {
  return; // TODO
}

async function notifyUser(requestId: string) {
  try {
    const snapshot: firestore.DocumentSnapshot = await firestore().collection('requests')
      .doc(requestId).get();
    const request: PageRequest = snapshot.data() as PageRequest;
    const uid = request.requester;
    const user = await fetchUser(uid);
    const preferredDevice = fetchPreferredDevice(user);
  } catch (e) {
    console.error('Error when fetching request to notify user', e);
    throw e;
  }
}

async function fetchUser(userId: string) {
  return firestore().doc(`users/${userId}`)
    .get()
    .then((snapshot: firestore.DocumentSnapshot): User => {
      return snapshot.data() as User;
    });
}

/**
 * Returns the device to notify for Firebase Cloud Messaging.
 *
 * @param {User} user The user to find a preferred device
 * @return {Device|null} The first preferred device found in the user's devices,
 *        the first device if there are no preferred ones, null if the user has
 *        no devices,
 */
function fetchPreferredDevice(user: User) {
  if (user.devices.length < 1) {
    return null;
  }
  if (user.devices.length === 1) {
    return user.devices[0];
  }
  for (const device of user.devices) {
    if (device.preferred) {
      return device;
    }
  }
  return user.devices[0];
}