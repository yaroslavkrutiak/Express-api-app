Installing
-------
You need to download or clone this repo
Next you need to do is
```sh
npm i
node index.js
```
Instruction
-------
App is listening at http://localhost:3000

You can go to http://localhost:3000/todos and http://localhost:3000/users to see appropriate collection, it is provided by routing

Searching todo or user `/:id` by id isn't implemented 

You can post some todos and users using [Postman](https://www.postman.com/)

After reloading the page, new items show up at the end of the list

It will return 400 HTTP status `Bad request` if fields are incorrect while posting some item

