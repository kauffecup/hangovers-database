# Hangovers Database

## Understanding, Configuring, and Building

There are a few pre-configured npm scripts:

  - `npm run build` uses webpack to build a minified bundle and minified css
    file. These are placed in a `build` directory along with a copied + minified
    `index.html` and whatever else found its way into `public`.
  - `npm run start` starts in "production mode" (no hot reloading). This simply
    spins up the server under `server/app.js`, serves
    what's in the build directory.
  - `npm run dev` is where the magic happens. This introduces the webpack dev
    and hot middleware (the correct environment variables are set via `npm
    better run`), which rebuilds the bundle on css or js changes and injects it
    into the browser using magic. No reloading necessary! Also through the
    powers of redux there's time travel so you can edit code on the fly and
    go forwards and backwards with your actions.
  - `npm run test` runs the tests!
  - `npm run lint` lints the code!

First you must:

```
npm install
```

Then, to run in production:

```sh
npm run build
npm run start
```

To run in dev mode:

```sh
npm run dev
```

To test:

```sh
npm run test
```

To lint:

```
npm run lint
```

To handle the discrepancies between running the client code in "dev mode" or
"production mode", there are two helpers provided - `containers/Root.js` and
`store/configureStore.js`. These modules conditionally load the `.dev` or
`.prod` extension of their respective file depending on the environment
variables when webpack is running. The only difference in the respective
versions are loading the necessary tooling for the dev/debugging redux
awesomeness. In dev mode, the `DevTools` react component loads and renders which
provides a visual history of all the actions and allows you to go forwards and
backwards in time. It also logs all the state changes.

## Server Code Structure

All server code goes under the `server` directory.

The main `app` module currently only configures the Express server and sets up
the routes.

## Client Code Structure

All client code goes under the `client` directory.

This app is set up using the [Redux](http://redux.js.org/) architecture.
It's pretty magical.

The main React entry point is `client/index`. This will load in the other app
components and manage state throughout the application. It also loads the main
reducer from `reducers/Sage` and configures the store.
