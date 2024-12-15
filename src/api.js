export async function fetchCities() {
  const response = await fetch('http://localhost:8001/api/v1/cities', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export async function fetchCityById(cityId) {
  const response = await fetch(`http://localhost:8001/api/v1/cities/${cityId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export async function fetchEventsByCity(cityName) {
  const response = await fetch(`http://localhost:8001/api/v1/events?city=${cityName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export async function fetchEventById(eventId) {
  const response = await fetch(`http://localhost:8001/api/v1/events/${eventId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export async function loginUser(email, password) {
  const response = await fetch('http://localhost:7001/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include', 
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Login failed');
  }
}

export async function validateSession() {
  const response = await fetch('http://localhost:8001/api/v1/auth/session', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.status === 401) {
    console.log('Unauthorized');
    return false;
  }

  if (response.ok) {
    const data = await response.json();
    return data.isAuthenticated;
  } else {
    return false;
  }
}

export async function fetchUserProfile() {
  const response = await fetch('http://localhost:8001/api/v1/my-profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Failed to fetch user profile');
  }
}

export async function fetchOrderHistory() {
  const response = await fetch('http://localhost:8001/api/v1/order-history', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Failed to fetch order history');
  }
}

export async function bookTickets(eventId, ticketId, quantity) {
  const response = await fetch('http://localhost:8001/api/v1/bookings/book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eventId, ticketId, quantity }),
    credentials: 'include',
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Booking failed');
  }

  const data = await response.json();
  return data;
}

export async function logoutUser() {
  const response = await fetch('http://localhost:7001/auth/logout', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
}