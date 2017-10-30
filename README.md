# Page Willie
This website is an app to request for help from Willie Chalmers III for AP Computer Science and more.
More specifically, it allows users to queue up in line by tapping a button for help from an "admin"
of sorts. This can easily be modified to support requests for help from yourself or anyone else.

## Developing 
This project uses [Yarn](https://yarnpkg.com/en/), [Polymer](https://www.polymer-project.org), and 
[Firebase](https://firebase.google.com) CLI tools, but the project already has preset configurations
for the most common tasks needed.

To start the local development server, run:
```
$ yarn run start
```
Alternatively, you can run `firebase serve` or `polymer serve`

For rapid development, you can run:
```
$ yarn run watch
```
This starts the Firebase Hosting development server and rebuilds the project on file changes.

### Testing
This project uses [ESLint](https://eslint.org/). Use `yarn run test` to lint the project.
Currently, there are no "real" tests to verify the coherence of the app.

### Deploying
First, associate the project with a Firebase project by running `firebase login`, following the 
prompts, and then running `firebase init`
To deploy the server to the associated Firebase project, run `yarn deploy`.