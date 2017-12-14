const NOTIFICATION_ICON = '/images/icon-192x192.png';
const KEY_REQUEST_FULFILLED = 'page-request-fulfilled';
const KEY_REQUEST_REJECTED = 'page-request-rejected';

const TITLE_READY = 'Willie is now ready for you.';
const TITLE_REJECTED = 'You have been removed from the wait list.';

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }));
});

self.addEventListener('push', (event) => {
  console.log('Received a push message', event);

  if (!(self.notification && self.notification.permission === 'granted')) {
    // We don't have access to notify user.
    return;
  }

  const data = {};
  if (event.data) {
    data = event.data.json();
  }

  let notification;
  if (data[KEY_REQUEST_FULFILLED]) {
    notification = new Notification(TITLE_READY, {
      body: TITLE_READY,
      icon: NOTIFICATION_ICON,
      tag: KEY_REQUEST_FULFILLED,
    });
  } else if (data[KEY_REQUEST_REJECTED]) {
    notification = new Notification(TITLE_REJECTED, {
      body: TITLE_REJECTED,
      icon: NOTIFICATION_ICON,
      tag: KEY_REQUEST_REJECTED,
    });
  }

  notification.addEventListener('click', () => {
    if (clients.openWindow) {
      clients.openWindow('//pagewillie.com/onNotify');
    }
  });

  event.waitUntil(
    self.registration.showNotification(notification)
  );
});

self.addEventListener('notificationClick', (event) => {
  event.notification.close();
  let responsePromise = Promise.resolve();
  if (event.notification.data && event.notification.data.url) {
    responsePromise = clients.openWindow(event.notification.data.url);
  }

  event.waitUntil(Promise.all([
    responsePromise,
    // TODO: Track click
  ]));
});
