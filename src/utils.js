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