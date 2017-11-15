This project represents the API & backend Service for the eeboo project

Below you will find some information on how to perform common tasks

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

To build this software you need at least
* node version >= 8.0.0
* yarn version >= 0.24.5

## Installation

Install required software packages and libraries

```
 #> yarn install
```
## Run

Run the API service on port 3001
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

main application
```
 #> server.js
```

database models and controllers
```
 #> controllers/models/
 #> controllers/routes/
```

config files
```
 # config/
```

React web application project. This is a completely separate project, running with different configuration and yarn packages
```
 #> web/
```
React production build and HTML start page
```
 #> web/build/
 #> web/build/index.html
```
