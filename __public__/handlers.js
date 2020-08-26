window.CACHED_USERS = [];

registerEvent('SEARCH_USERS', data => {
  window.CACHED_USERS = data.users;
});

registerEvent('MESSAGE', data => {
  console.log('New message', data);

  const container = document.getElementById('message-container'); 
  const msg = document.createElement('div');
  msg.className = 'message';
  msg.innerHTML = `<strong>${data.from}</strong>:<br>${data.text}`;

  container.appendChild(msg);
});
