const API_BASE = '/api';

async function fetchRestaurants(query) {
  const res = await fetch(`${API_BASE}/restaurants?search=${query}`);
  return res.json();
}
