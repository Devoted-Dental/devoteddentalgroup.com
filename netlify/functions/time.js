// netlify/functions/time.js
//
// Returns the server's current time in milliseconds.
//
// Used by the homepage countdown popup so that every visitor's device (phone, laptop, tablet...)
// agrees on the exact same time, even if a device's own clock is a little off. The popup calls this a
// few times, measures the round trip, and corrects its clock to match the server's.
//
// Safe to delete after the countdown campaign ends (together with the popup block on the homepage).

exports.handler = async () => {
  const t = Date.now(); // read the clock as early as possible so the number is as fresh as it can be
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      // Never cache: a cached time would be wrong the moment it was reused.
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Netlify-CDN-Cache-Control': 'no-store',
    },
    body: JSON.stringify({ t }),
  };
};
