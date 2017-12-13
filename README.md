This project represents API and backend services for the eeboo feedback application.

The main application is implemented with node.js using the express framework. It proviedes a RESTful API and serves the REACT SPA application that is placed in web/build/index.html.

This service connects to a pre-configured [Google firebase](https://firebase.google.com/) backend to persist data

The React application has a separate build environment. Find information about the REACT app in the web directory [web/README.md](web/README.md)

Below you will find some information on how to install the software and perform common tasks

## Table of Contents
- [Requirements](#Requirements)
- [Installation](#Installation)
- [Configuration](#Configuration)
- [Run](#Run)
- [Available Scripts](#available-scripts)
  - [yarn start](#yarn-start)
  - [yarn start-dev](#yarn-start-dev)
  - [yarn start-test](#yarn-start-test)
  - [yarn test](#yarn-test)
  - [yarn lint](#yarn-lint)
  - [yarn lint-fix](#yarn-lint-fix)
  - [yarn test-coverage](#yarn-test-coverage)
- [Files and Directories](#files-and-directories)

## Requirements
To build this software you need at least following packages installed globally on your system:
* node version >= v9.2.1
* yarn version >= 1.3.2

The Admin API calls are secured using [AUTH0](https://auth0.com/) Json Web Token. To get full access to the eeboo admin interface, ask mathu for permission or disable the authentication feature in the code (disabling will be configurable in Release 2.0)

You need a connection URL and a JSON security token to a running Google firebase backend database

## Installation
Install all required software packages and libraries
```
 #> yarn install
```

## Configuration
To connect the node.js API service to a firbase backend, you have to provide a valid firbase connection URL and a firebase security token in JSON format. you can configure both parameters in a default.json configuration file or you can use specific config files for each environment (dev/test/prod)

following is an example configuration file for the development environment. Use this configuration if you start the service witch `yarn start-dev`

```bash
#> cat config/dev.json
{
  "firebaseUrl": "https://myproject.firebaseio.com",
  "firebaseToken": "myproject-firebase-token.json"
}
```
Place your firbase JSON token in the following directory the controllers/models directory:
```bash
 controllers/models/v1/myproject-firebase-token.json
```

Both parameters, firebaseUrl and firebaseToken can also be configured as environment variables. This is especially useful for production deployments where you don't want to expose your connection secrets within a configuration file
- FB_TOKEN
- FB_URL

## Run
Run the API service on localhost listening on port 3001
```
 #> yarn start-dev
```
## Available Scripts

### `yarn start`
Start the server in production mode

### `yarn start-dev`
Runs a node.js express server listening on port 3001.
The Server runs in DEV mode. To connect to a firbase backend, a valid firebase token has to be referenced in the dev config file

### `yarn start-test`
Runs a node.js express server listening on port 3001
The Server runs in TEST mode and thus connects to a firebase TEST  database instance. This command is mainly used to debug test cases

### `yarn test`
Runs all tests against a real firebase datastore. The Server runs in TEST mode and connects to a specific Test firebase instance.

### `yarn lint`
Runs JavaScript linter against all .js files

### `yarn lint-fix`
Inline fixes linter issues that can be autonomously fixed by the linter

### `yarn test-coverage`
Runs test cases including coverage information. The code coverage is reported in static html files under directory coverage

## Files and Directories
main application file
```
 #> server.js
```

database models and HTTP routes
```
 #> controllers/models/
 #> controllers/routes/
```

config files
```
 # config/
```

React web application project. This is a completely separate project. It is running with different configuration and yarn packages
```
 #> web/
```
README for the REACT project
```
 #> web/README.md
```
React production build and HTML start page that will be served by the main server.js application
```
 #> web/build/
 #> web/build/index.html
```
