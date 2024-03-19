# frontend-vocabserver

This repository contains the frontend for the vocabserver application, for which more information can be found [here](https://github.com/redpencilio/app-vocabsearch/).


## Prerequisites

* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)

## Deployment

This repository is provided as a docker container named `redpencil/frontend-vliz-vocabserver`, to include this in your `docker-compose.yml` file you need something like this:
```yaml
services:
  frontend:
    image: redpencil/frontend-vliz-vocabserver
```

## Installation

Note: when deploying this step isn't necessary since a docker container should be provided.
This installation is thus for debugging and development purposes.

* `git clone https://github.com/redpencilio/frontend-vocabserver.git`
* `cd frontend-vocabserver`
* `npm install`

## Development

To debug this frontend you can run it using `ember serve`.
By default, ember will try to connect to a backend on [http://localhost:4200](http://localhost:4200), however the backend will in general be running on another port (as defined in the `docker-compose.yml` file).
To ensure ember makes the right requests we use the `--proxy http://localhost:<backend-port>` option.
The final command is thus `ember serve --proxy http://localhost:<backend-port>` which will provide the frontend at [http://localhost:4200](http://localhost:4200).

## Debug logs

Debug logs should be provided using `console.debug`, these logs can be hidden in the browser console.
