# Simple REST
![](https://img.shields.io/badge/Code%20Style-Standard-yellow.svg)
![](https://img.shields.io/badge/Dependencies-Express-green.svg)
![](https://img.shields.io/badge/License-Beerware-yellowgreen.svg)


## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/) with [NVM](https://github.com/creationix/nvm) (Node Version Manager) - Simple bash script to manage multiple active node.js versions.
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/) - Make sure it's running on the default port.  

## Installation
### Clone
```
$ git clone https://github.com/sluxz3r/week2-task.git
$ cd simple-REST
$ npm install
```

### Create Environment Variable
```
$ touch .env
$ nano .env
```

```
DB_HOST="Your_Host"
DB_USER="Your_Username"
DB_PASSWORD="Your_Password"
DB_NAME="Your_Table"

SERVER_PORT=9999
```

### Create 3 Tables
```
1. book
2. cat
3. loc
```

```
book { bookid[AI], name, writer, category, location}
cat {catid[AI], category}
loc {locid[AI], location}
```
```
Or Use Your Query with your Db, set Into (../src/models/models.js)
```

### Start Development Server
```
$ npm start
```

### License
----

[Beerware](https://en.wikipedia.org/wiki/Beerware "Beerware") © Thanks To [Mr.Tatas](https://github.com/tatasfachrul "Tatas")
