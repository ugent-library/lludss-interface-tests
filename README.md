# lludss-interface-tests
Integration tests for lludss-interface project

## Installation
In order to run the tests locally:

* Clone this repository
* `cd lludss-interface-tests`
* Execute `npm install`

## Usage

### Headless test excecution (CLI)
```
$ npm test
```
or
```
$ $(npm bin)/cypress run
```
or you can install Cypress globally:
```
$ npm install --global cypress
```
and just run tests like this:
```
$ cypress run
```

### Test execution in Cypress GUI
```
$ $(npm bin)/cypress open
```
