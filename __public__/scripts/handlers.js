registerEvent('USERS_SEARCH', data => {
  if(data.users.length === 0){
    PIGEON.userSearch.results.innerHTML = '<div class="empty-results">No results.</div>';
  } else {
    PIGEON.userSearch.results.innerHTML = '';
    data.users.forEach(addSearchResult);
  }
});

registerEvent('USER_MESSAGE', data => {
  if(data.from === currentConvoUser._id){
    addMessage(data);
    scrollConvo();
  } else {
    const notif = PIGEON.conversations[data.from].notif;
    const val = parseInt(notif.innerHTML) || 0;
    notif.style.visibility = '';
    notif.innerHTML = (val + 1);
  }
});

registerEvent('CONVOS_GET', data => {

  window.pigeonUserId = data.user;
  data.convos.forEach(convo => {
    addConvo(convo.recipient);
  });
});

registerEvent('HISTORY_GET', data => {
  if(data.target !== currentConvoUser._id)
    return;
  if(data.messages.length === 0){
    PIGEON.messages.container.innerHTML = '<div class="empty-results">No message history.</div>';
    return;
  }

  PIGEON.messages.container.innerHTML = '';
  data.messages.forEach(addMessage);
  scrollConvo();
});
