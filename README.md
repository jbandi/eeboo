This project represents API and backend services for the eeboo application.

The main application is implemented with node.js using the express framework. It serves the REACT SPA application under web/build/index.html and provides a RESTful API.

Below you will find some information on how to install the software and perform common tasks

## Table of Contents
- [Requirements](#Requirements)
- [Installation](#Installation)
- [Run](#Run)
- [Available Scripts](#Available Scripts)
  - [yarn start](#yarn start)
  - [yarn test](#yarn test)
  - [yarn start-test](#yarn start-test)
  - [yarn lint](#yarn lint)
  - [yarn lint-fix](#yarn lint-fix)
  - [yarn test-coverage](#yarn test-coverage)
- [Files and Directories](#Files and Directories)

## Requirements
To build this software you need at least following packages installed globally on your system:
* node version >= 8.0.0
* yarn version >= 0.24.5

The Admin API calls are secured using [AUTH0](https://auth0.com/) Json Web Token. To get full access to the eeboo admin interface, ask mathu for permission or disable the authentication feature in the code (disabling will be configurable in Release 2.0)

## Installation
Install all required software packages and libraries
```
 #> yarn install
```

## Run
Run the API service on localhost listening on port 3001
```
 #> yarn start
```
## Available Scripts

### `yarn start`
Runs a node.js express server listening on port 3001.
The Server runs in DEV mode

### `yarn test`
Runs all tests against a real firebase datastore. The Server runs in TEST mode and connects to a specific Test firebase instance.

### `yarn start-test`
Runs a node.js express server listening on port 3001
The Server runs in TEST mode and thus connects to a firebase TEST  database instance. This command is mainly used to debug test cases

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
