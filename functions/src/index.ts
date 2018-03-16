import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as flamelink from 'flamelink';
import { handleHttpRequest, handleNewRequest, handleUpdatedRequest } from './requests';
import { fetchAdminList } from './admin';
import { createUserRecord, deleteUserRecord } from './users';
import { fetchBlogPosts } from './posts';

const firebaseApp = admin.initializeApp(functions.config().firebase)
const flamelinkApp = flamelink({
  firebaseApp,
  isAdminApp: true,
});

export const fulfillRequest = functions.https.onRequest(handleHttpRequest);

export const getAdmins = functions.https.onRequest(fetchAdminList);

export const getBlogPosts = functions.https.onRequest(fetchBlogPosts);

export const onUserCreated = functions.auth.user().onCreate(createUserRecord);

export const onUserDeleted = functions.auth.user().onCreate(deleteUserRecord);

export const onDbRequest = functions.firestore.document('requests/{requestId}')
  .onCreate(handleNewRequest);

export const onRequestUpdate = functions.firestore.document('requests/{requestId}')
  .onUpdate(handleUpdatedRequest);