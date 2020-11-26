# Firebase

## Set up

- Create new project
- Add new web app </>
- ```npm i firebase```

```
|-lib
    |-firebase.js

|-env.local
```

### Keys needed
Three things we need to set up Firebase. Exposing these keys to Client Side.

```
|-env.local
```
```js
NEXT_PUBLIC_FIREBASE_API_KEY=asasd
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=asdasd
NEXT_PUBLIC_FIREBASE_PROJECT_ID=asdasd
```

### Firebase Set up

If we haven't already initialised the application, then we want to do that. We don't want to do it multiple times.

**Initialise application with keys**

```
|-firebase.js
```
```js

import * as firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })
}


```

### Auth Set up

```
|-lib
    |-auth.js
```

**COPY AND PASTE EVERYTHING FROM AUTH.JS for all prods**
- Basically created a context state
- Function called usePovideAuth
- Define sign in and sign out
- Export/Return those to be available to everyone through conext providor

**Github Setup**
- Firebase Auth with [Github](https://github.com/settings/applications/new)
- Fill in deets
- CallbackURL
  - Google auth sign in methods > Github > enable > copy URL
- Register App
- Copy Client ID and Client Secrets back into Google Auth 

**SDK Setup**


**Making Auth Context Available to All**
- Need to make a [Custom App](https://nextjs.org/docs/advanced-features/custom-app)
  - _app.js, wraps the app for global CSS / Shared logic / Context
  - The ProvideAuth ```Context``` that we just created is now wrapping the whole app

```
|-pages
    |-_app.js
```

```js
import { ProvideAuth } from "../lib/auth";

function MyApp({ Component, pageProps }) {
    return (
        <ProvideAuth>
            <Component {...pageProps} />
        </ProvideAuth>
    );
}

export default MyApp;
```

```
|-pages
    |-index.js
```

We then give index.js access to the useAuth() hook that was created.

```js
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { auth } from "firebase";
import { useAuth } from "../lib/auth";

const Home = () => {
    const auth = useAuth();

    return (
        <div className={styles.container}>....

        <button onClick={(e) => auth.signinWithGithub()}>
                    Sign In
        </button>

        <button onClick={(e) => auth.signinout()}>
                    Sign out
        </button>
```

? optional chaining allows you to safely acess nested properties???

**Extending the use of Firebase with Firestore** 
- storing information about users
- pricing plan info, profile images etc

**Cloud Firestore**
- Start in test mode
- We created a file called .db.js
- Made a function, takes the logged in user and saves it to firestore.
  
Messed me up. Without the firestore it didn't work.

```
|-lib
    |-db.js
```

```js

import firebase from './firebase'
import 'firebase/firestore'

```

## ChakraUi

[Getting Started](https://chakra-ui.com/docs/getting-started)

- ```import { theme as chakraTheme } from '@chakra-ui/core';```
- For Chakra UI to work correctly, you need to setup the ChakraProvider at the root of your application ```_app.js```
- Import font from google
- Override [`Document`](https://nextjs.org/docs/advanced-features/custom-document)
  - _document.js Allows me to modify the markup that comes from the server
- Added ```theme.js``` to override chakra settings
- Wrap app in chakra provider using ```_app.js```
- CSS reset in ```_app.js``` to get to a base state.
- Copy and paste default modules from Chakra ui [page](https://chakra-ui.com/docs/typography/heading)

## Absolute Imports / Aliases

[Getting Started](https://nextjs.org/docs/advanced-features/module-path-aliases)

- This allows me to decide how to name my long file path names.
- Set up using ```jsconfig.json```.
- In my _app.js i've created a global styles component. Which is passed in to the app wrappers. #__next is like the wrappers id which i apply 100vh to, to fill the screen correctly.


## Converting Mockups to React

- [SVG Compressor](https://jakearchibald.github.io/svgomg/)
- Add the [icons to a component](https://chakra-ui.com/docs/components/icon#using-the-icon-component) and pull them in.
- Use [OpenChakra](https://openchakra.app/) to build out wireframe <- SICK
- Get the code
- Create components folder to create a js file
- Remove cssReset and theme provider
- Change /core to /react on imports
- Rename const and export

**Children**

- I started with the dashboard shell, ripped out the changing box and converted it to a component wrapped in the Dashboard shell tag.
- Then inside the dashboard I placed {children} and passed children as props