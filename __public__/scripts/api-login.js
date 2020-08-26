async function hash (str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [].map.call(new Uint8Array(buf), b => ('00' + b.toString(16)).slice(-2)).join('');
}

async function login (username, password) {

  const passwordHash = await hash(password);
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

async function register (username, password, nickname) {

  const passwordHash = await hash(password);
  const data = { username, passwordHash, nickname };

  const res = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const body = await res.json();

  return body;
}
