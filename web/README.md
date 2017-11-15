
This project represents the WEB front end for the eeboo application

The front end application is based on the React v16.0 JavaScript library and relays on the eeboo REST API backend service.

Below you will find some information on how to install the software and perform common tasks

## Table of Contents
- [Requirements](#Requirements)
- [Installation](#Installation)
- [Run](#Run)
- [Available Scripts](#Available Scripts)
  - [yarn start](#yarn start)
  - [yarn test](#yarn test)
  - [yarn build](#yarn build)
  - [yarn lint](#yarn lint)
  - [yarn lint-fix](#yarn lint-fix)
  - [yarn test -- --coverage](#yarn test -- --coverage)
- [Files and Directories](#Files and Directories)

## Requirements
To build this software you need at least following packages installed globally on your system:
* node version >= 8.0.0
* yarn version >= 0.24.5

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
Runs a dev server listening on localhost and port 3000. The server will automatically re-compile and re-run on every file update.

### `yarn test`
Runs [JEST](https://facebook.github.io/jest/) unit tests

### `yarn build`
Runs a build process that creates a production ready and minified bundle.js file

### `yarn lint`
Runs [ESLint](http://eslint.org/) command against every .js and .jsx file. The linter is configured using [esling-airbnb-config](https://www.npmjs.com/package/eslint-config-airbnb)

### `yarn lint-fix`
Inline fixes linter issues that can be autonomously fixed by the linter

### `yarn test -- --coverage`
Runs tests with coverage reporting on the command line

## Files and Directories
Static HTML content and production ready build files
```
 #> build/
```
Important React application files
```
 #> src/
 #> src/Callback/        <- AUTH0 callback Component
 #> src/components/      <- React component files (JSX)
 #> src/containers/      <- Redux container files (JS)
 #> src/services/        <- AUTH0 supporting services
 #> src/state/actions/   <- Redux actions
 #> src/state/reducers/  <- Redux reducers
 #> src/state/selectors/ <- Redux state selectors
 #> src/utlis/           <- useful utils
 #> src/App.js           <- main application .js
 #> src/index.js         <- main index .js

```
