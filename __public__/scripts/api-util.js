function closeError(){
  PIGEON.error.overlay.style.display = 'none';
}

function displayError(msg){
  PIGEON.error.message.innerHTML = msg;
  PIGEON.error.overlay.style.display = 'flex';
}

function openUserSearch () {
  PIGEON.userSearch.overlay.style.display = 'flex';
  PIGEON.userSearch.input.focus();
}

function closeUserSearch () {
  PIGEON.userSearch.input.value = '';
  PIGEON.userSearch.results.innerHTML = '';
  PIGEON.userSearch.overlay.style.display = 'none';
}
