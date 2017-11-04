const TITLE_READY = 'Willie is now ready for you.';
const TITLE_BUMP = 'You have been removed from the wait list.';

self.addEventListener('push', (event) => {
  console.log('Received a push message', event);

  let body = 'We have received a push message.';
  let icon = '/images/icon-192x192.png';
  let tag = 'page-willie-notification-tag';

  event.waitUntil(
    self.registration.showNotification(TITLE_READY, {
      body: body,
      icon: icon,
      tag: tag,
    })
  );
});
