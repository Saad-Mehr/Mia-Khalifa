# Project Overview

Code for this projected is separated in two main parts:
* Back-end NodeJS architecture
	* The project's entry file is `index.js`, which initializes the back-end server architecture: web-server, web-socket, and database connections.
	* File structure in the root directory logically organizes each NodeJS module into categories.
* Front-end static file server
	* HTML, CSS, JS, Font, and Image files stored inside the `__public__` folder are automatically served by the web-server.
	* Note that this is a completely different environment than the files outside. The JavaScript here runs exclusively in the user's web browser.

## Structure
![](docs/PigeonEncryptedChat.png)

# Coding Guidelines
This project targets NodeJS version 10.0, and uses the majority of modern features proposed with ECMAScript 2016. Here is an overview of the most important principles this project utilizes.

## async/await
`Promises` are used heavily throughout the project to handle asynchronous actions, such as network requests and responses. This approach is heavily preferred over the call-back pattern. Furthermore, functions should always utilize the *async/await* syntax when working with `Promises`, rather than the *Promise chain* pattern.
Example:
```javascript
// WRONG, do NOT do this:
handleRequest(req => {
    console.log('Received request!');
});
// WRONG, do NOT do this:
handleRequest().then(req => {
    console.log('Received request!');
});
// CORRECT, DO this:
const req = await handleRequest();
console.log('Received request!');
```
Remember to always declare functions as `async` when writing code that involves asynchronous work in order to enable this pattern.

## Prefer declarative over object-oriented

This project is written primarily in the *declarative* programming paradigm. It makes heavy use of exporting individual functions within folders to build a sub-module. Object-oriented design is discouraged due to many of the design choices made for JavaScript.

## Prefer functional over imperative
JavaScript provides developers with easy access to the functional programming paradigm. Be familiar with basic list operations such as `forEach`, `filter`, `map`, and `reduce`. A clever combination of these methods results in code that is much more expressive than imperative code.
Example:
```javascript
// WRONG, do NOT do this:
let nums = [ 2, 3, 4, 5 ];
for(let i = 0; i < nums.length; i++){
    console.log('Read the number:', nums[i]);
}
// CORRECT, DO this:
[ 2, 3, 4, 5 ].forEach(num => {
    console.log('Read the number:', num);
});
```
## Separation of configuration
Do not hard-code implementation specific data directly into the JavaScript source files. Examples include encryption keys, database credentials, and other server configuration. Instead, always `require` from the `env.json` file in the root directory. This way the server can be configured from one central location, and is easily re-configured for other developer's needs.

## Compatibility testing
Some standard functions provided with NodeJS 11.0 and above will not be available for use. Remember to run your code with NodeJS 10.0 to ensure this compatibility requirement is met.

# Best Practices

## Use ES6 scoped variables
The `const` and `let` keywords were introduced in ECMAScript 6. Always prefer these keywords in order to enable block-scoped variable definitions. This avoids many of the issues that arise when using the legacy keyword, `var`, which often behaves un-intuitively and leads to bugs. Always prefer `const` over `let` when variable re-assignment is not necessary: this prevents accidental mistakes and improves code clarity.

## Utilize arrow-syntax for anonymous functions
Unless a function is to be named, prefer using the arrow-syntax to declare anonymous functions. This is especially true for one-line functions that have a return value.
Example:
```javascript
// WRONG:
items.map(function(item){
    return parse(item * 2);
});
// CORRECT:
items.map(item => parse(item * 2));
```
## Utilize object literal short-hands
When declaring variables that are to be stored in an object literal, remember to name them in order to utilize the short-hand syntax. Example:
```javascript
// WRONG:
const fname = 'Frank', lname = 'Richards';
const info = { firstName: fname, lastName: lname };
// CORRECT:
const firstName = 'Frank', lastName = 'Richards';
const info = { firstName, lastName };
```
## Utilize object destructuring
When data within an object is repeatedly used, prefer to destructure it into a variable or parameter. This has a significant impact on code readability.
```javascript
// WRONG:
function handle (evt) {
    console.log(`${evt.time}: ${evt.parent} called.`);
    parseData(evt.data, evt.time);
    return evt.parent;
}
// CORRECT:
function handle ({ time, parent, data }) {
    console.log(`${time}: ${parent} called.`);
    parseData(data, time);
    return parent;
}
```

# Naming/Formatting Conventions

## Files
JavaScript source filenames should follow the `lowercase-dashed-file.js` pattern and generally describe the content that is being exported through its `module.exports`.

## Variables
Variables and functions should be named in accordance with the `camelCase` naming convention.

## Indentation
Indentation should be done with two spaces rather than tab characters. Failure to comply with this requirement will result in immediate expulsion from the project.

## Comments
Use JSDoc block comments above functions to describe their use case. Example:
```javascript
/**
 * Handles an event emitted by the primary WebSocket.
 * @param {object} evt - The associated Event object.
 */
function handleSocketEvent (evt) { ... }
```
For comments inside functions, put them on their own line, directly above the line or block being described. Both `//` and `/* */` can be used to accomplish this. Example:
```javascript
/* Verify username and passwordHash were provided in request body */                                 
if(!username || !passwordHash)
  return res.status(400).json({ error: 'Valid `username` and `passwordHash` required.' });

/* Find user with this username, include passwordHash for comparison */
const user = await User.findOne({ username }).select('+passwordHash');
if(!user || user.passwordHash !== passwordHash)
  return res.status(400).json({ error: 'Incorrect username/password combination.' });

/* username/password verified, return a signed token (JWT) */
const token = generateToken(user);
res.status(200).json({ token });
```

