import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getAdmins, fetchFCMToken, checkAdminStatus } from './data/database';
import { pageAdmin } from './notify/notify';
import { Admin } from './data/models';
import { Request, Response } from 'express';

admin.initializeApp(functions.config().firebase as admin.AppOptions);

export const notifyWillie = functions.database.ref('/requests/{uid}')
  .onCreate(async (event) => {
    const requestId = event.params!.uid;
    const admins = await getAdmins();
    admins.forEach(async (adminId: string) => {
      await pageAdmin(requestId, adminId);
    });
  });

export const adminStatus = functions.https
  .onRequest(async (req: Request, res: Response) => {
    const uid = req.params.uid;
    try {
      res.json({
        isAdmin: await checkAdminStatus(uid),
      });
    } catch (err) {
      console.error(err);
      res.send(500);
    }
  });
