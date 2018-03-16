# Page Willie
[Live Sample](https://pagewillie.com)

This is a web app that lets you request help from me or my approved associates.

If you wish to be an admin for Page Willie, fill out [this form]().

### Setup

#### Prerequisites
First, install [Polymer CLI](https://github.com/Polymer/polymer-cli) using
[npm](https://www.npmjs.com) (we assume you have pre-installed [node.js](https://nodejs.org)).

    npm install -g polymer-cli

Second, install [Bower](https://bower.io/) using [npm](https://www.npmjs.com)

    npm install -g bower

### Start the development server
This command serves the app at `http://127.0.0.1:8081` and provides basic URL
routing for the app:
```bash
    polymer serve
```

### Build
The `polymer build` command builds the application for production to be deployed 
using Firebase Hosting.

The Polymer Starter Kit is configured to create three builds using [the three supported presets](https://www.polymer-project.org/2.0/toolbox/build-for-production#build-presets):

```json
"builds": [
  {
    "preset": "es5-bundled"
  },
  {
    "preset": "es6-bundled"
  }
]
```

Builds will be output to a subdirectory under the `build/` directory as follows:

```
build/
  es5-bundled/
  es6-bundled/
  es6-unbundled/
```

* `es5-bundled` is a bundled, minified build with a service worker. ES6 code is compiled to ES5 for compatibility with older browsers.
* `es6-bundled` is a bundled, minified build with a service worker. ES6 code is served as-is. This build is for browsers that can handle ES6 code - see [building your project for production](https://www.polymer-project.org/2.0/toolbox/build-for-production#compiling) for a list.
* `es6-unbundled` is an unbundled, minified build with a service worker. ES6 code is served as-is. This build is for browsers that support HTTP/2 push.

Run `polymer help build` for the full list of available options and optimizations. Also, see the documentation on the [polymer.json specification](https://www.polymer-project.org/2.0/docs/tools/polymer-json) and [building your Polymer application for production](https://www.polymer-project.org/2.0/toolbox/build-for-production).

### Development server
This command serves your app on a local development server. Replace 
`build-folder-name` with the build name you wish to serve:

```bash
polymer serve build/build-folder-name
```

### Deploy
Make sure you're a project editor on the `help-pager` Firebase project. Next, 
follow these steps:
 - Sign into the Firebase CLI by running `firebase login`.
 - Start the build with `yarn run deploy. 
   This will start the bundled ES6 build and then automatically run 
   `firebase deploy` to upload the files for production.
 - Verify the site is live at [pagewillie.com](https://pagewillie.com).