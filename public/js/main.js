async function searchRestaurants() {
  const query = document.getElementById('searchInput').value;
  const results = await fetchRestaurants(query);
  
  const container = document.getElementById('results');
  container.innerHTML = results.map(r => `<p>${r.name}</p>`).join('');
}

function openChatbot() {
  window.location.href = "/chatbot.html";
}
