# Hangovers Database

## Useful Links

  - [bluemix](http://bluemix.net)
  - [cloudant deployment](https://sage.cloudant.com/dashboard.html)
  - [build pipeline](https://hub.jazz.net/pipeline/jdkaufma/hangovers-database)

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

## Deploying to Bluemix

First, make sure you've installed the
[Cloud Foundry CLI](https://console.ng.bluemix.net/docs/starters/install_cli.html).
Then:

```sh
cf login
cf target -o jdkaufma@us.ibm.com -s hangovers
npm run build
cf push sage
```

This'll look at `manifest.yml` and deploy this puppy.

## Using Build pipeline

Again, the build pipeline is
[here](https://hub.jazz.net/pipeline/jdkaufma/hangovers-database). It's hooked
up to the `master` branch of this repo. So pushing'll trigger a build and
deploy.

Because these are on a server somewhere else, here are the build and deploy
scripts, so at least they're like sort of in source control, ya know?

### Build Stage

```sh
#!/bin/bash
node_version=v6.7.0
install_name=node-v6.7.0-linux-x64
if [ ! -e $install_name.tar.gz ]; then
    wget "http://nodejs.org/dist/$node_version/$install_name.tar.gz"
    echo 'Untarring'
    tar xf $install_name.tar.gz
fi
NODE_6_INSTALL_DIR=`pwd`/$install_name/bin
PATH=$NODE_6_INSTALL_DIR:$PATH
node -v

npm install
npm run build
```

### Deploy Stage

Make sure to select the target, org, space, and app. Then the actual script is:

```sh
#!/bin/bash
cf push "${CF_APP}"
```
