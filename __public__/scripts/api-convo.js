window.currentConvoUser = {};

function addSearchResult (user) {
  const item = document.createElement('div');
  item.className = 'user-search-result';
  item.innerHTML = `<strong>${user.username}</strong> (${user.nickname})`;
  item.addEventListener('click', evt => {
    switchConvo(user);
    closeUserSearch();
  });
  PIGEON.userSearch.results.appendChild(item);
}

function addConvo (user) {
  const status = document.createElement('div');
  status.className = 'status';

  const name = document.createElement('span');
  name.className = 'convo-name';
  name.innerHTML = user.nickname;

  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.style.visibility = 'hidden';

  const convo = document.createElement('div');
  convo.className = 'convo';
  convo.append(status, name, notif);

  PIGEON.conversations.container.appendChild(convo);
  PIGEON.conversations[user._id] = { user, convo, status, notif };

  convo.addEventListener('click', evt => {
    switchConvo(user);
    notif.innerHTML = '';
    notif.style.visibility = 'hidden';
  });
}

function switchConvo (user) {
  if(!PIGEON.conversations[user._id])
    addConvo(user);
  if(currentConvoUser._id === user._id)
    return;

  currentConvoUser = user;
  PIGEON.title.innerHTML = user.nickname;
  PIGEON.messages.container.innerHTML = '<div class="loader"></div>';
  PIGEON.messages.input.value = '';

  sendEvent('HISTORY_GET', { target: user._id });
}

function scrollConvo () {
  const target = PIGEON.messages.container;
  target.scrollTop = target.scrollHeight;
}

function addMessage (data) {
  const item = document.createElement('div');
  item.className = 'message';

  const bubble = document.createElement('div');
  bubble.className = (pigeonUserId === data.to) ? 'bubble' : 'bubble bubble-personal';

  const timestamp = document.createElement('div');
  timestamp.className = 'bubble-timestamp';
  timestamp.innerHTML = moment(data.date).fromNow();

  const text = document.createElement('span');
  text.innerHTML = data.text;

  item.appendChild(bubble);
  //bubble.append(text, timestamp);
  bubble.append(text);

  PIGEON.messages.container.appendChild(item);

}
