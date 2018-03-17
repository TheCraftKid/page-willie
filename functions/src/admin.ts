import * as admin from 'firebase-admin';
import * as flamelink from 'flamelink';

/**
 * Returns a list of all the admins for Page Willie.
 */
export function fetchAdminList() {
  // TODO: Use Flamelink
}

interface Admin {
  readonly firstName: string,
  readonly lastName: string,
  readonly email: string,
  readonly birthday: string,
  readonly themeColor: string,
  readonly bio: string,
  readonly socialMedia: Array<SocialMedia>,
}


interface SocialMedia {
  id: string,
  service: SocialMediaService,
  url: string,
  username: string,
}

enum SocialMediaService {
  'twit',
  'blog',
}