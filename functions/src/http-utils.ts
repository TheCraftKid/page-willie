import { Request } from 'express';

/**
 * Checks if the given request is is JSON form. 
 *
 * @param request {Request} An HTTP request to check 
 * @return {Boolean} True if the given request has a MIME type 
 *        of 'application/json'
 */
export function requestIsJson(request: Request) {
  return request.is('application/json');
}