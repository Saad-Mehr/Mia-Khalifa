async function login (username, passwordHash) {

  const data = { username, passwordHash };

  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const body = await res.json();
  if(!body)       throw Error('Received invalid response.');
  if(body.error)  throw Error(body.error);
  if(!body.token) throw Error('No token was returned.');

  document.cookie = `authorization=${body.token};`;
}

async function register (username, passwordHash, nickname) {

  const data = { username, passwordHash, nickname };

  const res = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const body = await res.json();

  return body;
}
