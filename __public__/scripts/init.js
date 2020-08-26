let socket;
const EVENT_HANDLERS = {};

function sendEvent (event, data) {
  socket.send(JSON.stringify({ event, data }));
}
function registerEvent (event, handler) {
  EVENT_HANDLERS[event] = handler;
}

window.onload = function(){

  window.PIGEON = {
    title: document.getElementById('title-bar'),
    messages: {
      container: document.getElementById('message-container'),
      input: document.getElementById('message-input'),
    },
    conversations: {
      container: document.getElementById('conversations'),
    },
    userSearch: {
      overlay: document.getElementById('user-search-overlay'),
      results: document.getElementById('user-search-results'),
      input: document.getElementById('user-search-input')
    },
    error: {
      overlay: document.getElementById('error-overlay'),
      message: document.getElementById('error-message'),
      confirm: document.getElementById('error-confirm'),
    }
  };

  PIGEON.userSearch.overlay.addEventListener('click', evt => {
    if(evt.target === PIGEON.userSearch.overlay)
      closeUserSearch();
  });
  PIGEON.userSearch.input.addEventListener('keypress', evt => {
    PIGEON.userSearch.results.innerHTML = '<div class="loader"></div>';
    sendEvent('USERS_SEARCH', { username: evt.target.value });
  });

  PIGEON.messages.input.addEventListener('keypress', evt => {
    if(evt.keyCode !== 13 || evt.target.value === '')
      return;

    sendEvent('USER_MESSAGE', {
      to: currentConvoUser._id,
      text: evt.target.value
    });
    addMessage({
      from: pigeonUserId,
      to: currentConvoUser._id,
      text: evt.target.value,
      date: new Date()
    });

    scrollConvo();
    evt.target.value = '';

  });

  /* Initialize WebSocket connection */
  const loc = window.location;
  socket = new WebSocket(`ws${loc.protocol==='https:' ? 's':''}://${loc.host}`);
  socket.onmessage = function (wsEvent) {
    if(!wsEvent || !wsEvent.data)
      return;

    const { event, data } = JSON.parse(wsEvent.data);

    console.log('ws:', event);

    const handler = EVENT_HANDLERS[event || ''];
    handler && handler(data);

  };

  socket.onopen = function(){
    sendEvent('CONVOS_GET');
  }
  socket.onclose = function(){
    displayError('WebSocket connection was closed.');
  };
  socket.onerror = function(err){
    console.error('WebSocket Error:', err);
  };

};
