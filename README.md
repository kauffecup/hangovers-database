# Hangovers Database

welcome to Sage.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Useful Links](#useful-links)
- [Arrangement Info](#arrangement-info)
  - [the Song](#the-song)
  - [the Arrangement Itself](#the-arrangement-itself)
  - [Performances, etc](#performances-etc)
  - [Files and such](#files-and-such)
- [Understanding, Configuring, and Building](#understanding-configuring-and-building)
  - [Install Dependencies](#install-dependencies)
  - [Build (and run) the Production Bundle](#build-and-run-the-production-bundle)
  - [Run in developer mode](#run-in-developer-mode)
  - [Initialize and Seed the Database](#initialize-and-seed-the-database)
  - [Test](#test)
  - [Lint](#lint)
  - [Generate the TOC](#generate-the-toc)
- [A Note About Clientside Code Structure](#a-note-about-clientside-code-structure)
- [Hooking up to Cloudant Backend](#hooking-up-to-cloudant-backend)
- [Deploying to Bluemix](#deploying-to-bluemix)
- [Using Build pipeline](#using-build-pipeline)
  - [Build Stage](#build-stage)
  - [Deploy Stage](#deploy-stage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Useful Links

  - [bluemix](http://bluemix.net)
  - [cloudant deployment](https://sage.cloudant.com/dashboard.html)
  - [build pipeline](https://hub.jazz.net/pipeline/jdkaufma/hangovers-database)
  - [backblaze dashboard](https://secure.backblaze.com/b2_buckets.htm)

## Arrangement Info

### the Song

  - Song Title
  - Abbreviation
  - Original Artist(s)
  - Year Released
  - Genre

### the Arrangement Itself

  - Arranger(s)
  - Key
  - When Arranged
  - Type (handwritten original, copy of handwritten, copy of electronic, electronic)
  - Syllables (y/n)

### Performances, etc

  - Active
  - Semester(s) Performed
  - Concert(s) Featured In
  - Album(s) Appeared On
  - Soloist(s)

### Files and such

  - PDF (link to file)
  - Finale (link to file)
  - Recording (link to file)
  - Youtube (link to the tube)
  - Spotify Link for original song
  - Spotify Link for hangovers version

## Understanding, Configuring, and Building

There are a few pre-configured npm scripts.

### Install Dependencies

Before you do anything else, you'll need to:

```
npm install -g yarn
yarn
cd client
yarn
```

(If you don't want to use yarn for whatever reason, `npm install` will work).

### Build (and run) the Production Bundle

To build a minifed JS bundle and minified CSS bundle uner the `build` directory,
this is the script for you. It also will copy any resources (such as `inex.html`
and the favicon) placed in the `public` directory and place them in `build`.

```sh
npm run build
```

Then to run the server and serve that directory, you'll spin up "production
mode" (no hot reloading). This simply spins up the server under `server/app.js`,
serves what's in the build directory, maintains the endpoints, and interfaces
with the database.

```sh
npm start
```

### Run in developer mode

This is where the magic happens. This introduces the webpack dev and hot
middleware (the correct environment variables are set via `npm better run`),
which rebuilds the bundle on css or js changes and injects it into the browser
using magic. No reloading necessary! Also through the powers of redux there's
time travel so you can edit code on the fly and go forwards and backwards with
your actions.

```sh
npm run dev
```

### Initialize and Seed the Database

This makes sure the database exists and adds the "starter" docs: albums,
concerts, hangovers, semesters, arrangement types, album formats, qualities,
and a design doc to view each type on its own.

```sh
npm run init
```

### Test

There currently are no tests. heh...

```sh
npm run test
```

### Lint

```sh
npm run lint
```

### Generate the TOC

To generate the table of contents at the top of this README, ya just gotta:

```sh
npm run toc
```

## A Note About Clientside Code Structure

To handle the discrepancies between running the client code in "dev mode" or
"production mode", there are two helpers provided - `boilerplate/Root.js` and
`boilerplate/configureStore.js`. These modules conditionally load the `.dev` or
`.prod` extension of their respective file depending on the environment
variables when webpack is running. The only difference in the respective
versions are loading the necessary tooling for the dev/debugging redux
awesomeness. In dev mode, the `DevTools` react component loads and renders which
provides a visual history of all the actions and allows you to go forwards and
backwards in time. It also logs all the state changes.

## Hooking up to Cloudant and Backblaze Backend

Cloudant docs [here](https://docs.cloudant.com/).

To hook up to cloudant and backblaze, simply fill out the environment variables
listed in `config/.env.example` in a new file `config/.env` (git ignored for
obvious reasons).

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

This'll look at `manifest.yml` and deploy this puppy. Make sure the environment
variables used in .env are set in your Bluemix runtime.

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
node_version=v6.9.4
install_name=node-v6.9.4-linux-x64
if [ ! -e $install_name.tar.gz ]; then
    wget "http://nodejs.org/dist/$node_version/$install_name.tar.gz"
    echo 'Untarring'
    tar xf $install_name.tar.gz
fi
NODE_6_INSTALL_DIR=`pwd`/$install_name/bin
PATH=$NODE_6_INSTALL_DIR:$PATH
node -v

echo "Downloading and installing yarn..."
yarn_url="https://yarnpkg.com/latest.tar.gz"
yarn_dir=`pwd`/yarn

code=$(curl "$yarn_url" -L --silent --fail --retry 5 --retry-max-time 15 -o /tmp/yarn.tar.gz --write-out "%{http_code}")
if [ "$code" != "200" ]; then
  echo "Unable to download yarn: $code" && false
fi
rm -rf $yarn_dir
mkdir -p "$yarn_dir"
# https://github.com/yarnpkg/yarn/issues/770
if tar --version | grep -q 'gnu'; then
  tar xzf /tmp/yarn.tar.gz -C "$yarn_dir" --strip 1 --warning=no-unknown-keyword
else
  tar xzf /tmp/yarn.tar.gz -C "$yarn_dir" --strip 1
fi
chmod +x $yarn_dir/bin/*

PATH=$yarn_dir/bin:$PATH
echo "Installed yarn $(yarn --version)"

yarn
cd client
yarn
cd ..
npm run build
```

### Deploy Stage

Make sure to select the target, org, space, and app. Then the actual script is:

```sh
#!/bin/bash
cf push "${CF_APP}"
```
