export function secondsSinceEpochToDate(seconds) {
  const date = new Date(seconds * 1000);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

export function secondsSinceEpochToTime(seconds) {
  const date = new Date(seconds * 1000);
  const options = { hour: 'numeric', minute: 'numeric' };
  return date.toLocaleTimeString(undefined, options);
}

export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export function getGoogleAuthUrl(currentUrl) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const scope = process.env.NEXT_PUBLIC_GOOGLE_SCOPE;

  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(currentUrl)}`;
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function areFieldsFilled(fields) {
  return fields.every(field => field.trim() !== '');
}