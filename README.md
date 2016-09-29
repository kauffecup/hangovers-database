# Hangovers Database

## Useful Links

  - [bluemix](http://bluemix.net)
  - [cloudant deployment](https://sage.cloudant.com/dashboard.html)

## Arrangement Info

  - song title
  - arranger(s)
  - original artist
  - when written (original song??)
  - when arranged
  - when performed
  - quality (useable/needs work/bad)
  - genre
  - type (handwritten original, copy of handwritten, copy of electronic, electronic)
  - Concert
  - alternate name
  - CDs On
  - Syllables?
  - PDF (link to file)
  - Finale (link to file)
  - Youtube (link to the tube)

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

## Hooking up to Cloudant Backend

Cloudant docs [here](https://docs.cloudant.com/).

To hook up to a cloudant backend, simply fill out the username and password in
`config/cloudant.json`. If git is picking up changes in this file, which'd be
annoying to me, simply:

```sh
git update-index --assume-unchanged config/cloudant.json
```
