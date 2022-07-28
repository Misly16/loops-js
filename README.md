This package contains the code that we use to interact with [Loops API](https://loops.so/), the module is free to use by anyone who has access to their platform.

It can be installed by using
```
npm install loops-js
```

The module includes every available API endpoint, an example of creating a new contact would be as followed
```js
const Loops = require('loops-js');
const client = new Loops('apiKey');
await client.createContact('john.doe@example.com', 'John', 'Doe', 'payingCustomer', 'example.com');
```

The following methods are available in the module
```js
testApiKey();
createContact(email, firstName, lastName, userGroup, source');
updateContact(email, firstName, lastName, userGroup, source);
findContact(email);
sendEvent(email, eventName);
```
