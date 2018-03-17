import * as firebase from 'firebase-admin';
import { Request, Response } from 'express';
import { User } from './users';
import { requestIsJson } from './http-utils';
import { DeltaDocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { Event } from 'firebase-functions';


export function handleHttpRequest(request: Request, response: Response) {
  if (!requestIsJson(request)) {
    sendError(ErrorType['content-type'], response);
  }
  const reqData = JSON.parse(request.body);
  try {
    databasifyRequest(reqData);
    response.send(200);
  } catch (e) {
    console.error('Error when uploading request to database', e);
    response.send(500);
  }
}

export function handleNewRequest(event: Event<DeltaDocumentSnapshot>) {
  const request = event.data;
}

export function handleUpdatedRequest(event: Event<DeltaDocumentSnapshot>) {
  if (event.data.previous) {
    // TODO: Send notifications
  }
}

function databasifyRequest(request: PageRequest) {
  return firebase.firestore().collection('requests')
    .doc(request.id)
    .set(request)
    .then();
}

function sendError(reason: ErrorType, response: Response) {
  response.set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .json(generateError(reason));
}

/**
 * Creates a response to why a request was not fulfilled. 
 *
 * @param {ErrorType} reason An internal error code
 * @return {RequestError} An error ready to be sent via HTTP
 */
function generateError(reason: ErrorType): RequestError {
  if (reason === ErrorType['content-type']) {
    return {
      reason: 'Requests must be sent using JSON.',
      code: 406,
    };
  } else if (reason === ErrorType['not-found']) {
    return {
      reason: 'Request referenced an entity ID that did not exist. Check your record and try again.',
      code: 404,
    }
  } else {
    return {
      reason: 'Something about your request was off. Try again later.',
      code: 400,
    };
  }
}

/**
 * A request for help sent by a user.
 */
export interface PageRequest {
  readonly id: string,
  readonly timestamp: number,
  readonly notes: string,
  /**
   * A subject an admin can help.
   */
  readonly reason: Subject,
  /**
   * The UID of the requesting user.
   */
  readonly requester: string,
  /**
   * True if the request is marked for deletion.
   */
  fufilled: Boolean,
}

/**
 * A shortcode for one of the supported subjects:
 *  - AP Calculus AB
 *  - AP Calculus BC
 *  - AP US History
 *  - AP Computer Science
 *  - AP Language and Composition
 *  - AP Biology
 *  - AP Chemistry
 *  - Pre-calculus
 *  - Geometry
 *  - Algebra
 */
export enum Subject {
  'apcalcab',
  'apcalcbc',
  'apush',
  'apcs',
  'aplang',
  'apbio',
  'apchem',
  'precalculus',
  'geometry',
  'algebra',
  'other',
}

export interface RequestError {
  reason: string,
  code: number,
}

enum ErrorType {
  'content-type',
  'not-found',
}