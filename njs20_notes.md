https://github.com/leerob/fastfeedback/pulls?q=

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
- Rename const and export default
- Make sure components inside are imported ie: FormLabel, Input etc

**Children**

- I started with the dashboard shell, ripped out the changing box and converted it to a component wrapped in the Dashboard shell tag.
- Then inside the dashboard I placed {children} and passed children as props
  - Basically anything that I place inbetween <DashboardShell> Becomes a child passed in as props </DashboardShell>

## React Hook Form
- npm install react-hook-form
- Copy over imports + state variables
- Copy over form wrapper ```<form onSubmit={handleSubmit(onSubmit)}>```
- Update inputs
```js
<Input
    placeholder="https://website.com"
    name="url"
    ref={register({
        required: true
    })}
/>
```
- Save the info to the database by adding a new function to db.js
  - .add not .set, because fs will add the id for me.

## Adding toast

Actually really easy. Import the modules then paste in the function call 

```js

toast({
          title: "Account created.",
          description: "We've... account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })

```
This was placed inside a button onClick function so that it opens when the button is clicked. Nice.

**Saving More Data to db**

```js

    const onCreateSite = (data) => {
        createSite(data);
 
        onClose();
    };

```

Sending an object instead.

```js

    const onCreateSite = ({ websiteName, websiteUrl }) => {
    createSite({
        authorID: auth.user.uid,
        createdAt: new Date().toISOString(),
        websiteName: websiteName,
        websiteUrl: websiteUrl,
    });
 
    onClose();
};

```

## Firebase Server side

- [Jamstack functions](https://jamstackfns.com/f/firebase)
- [Response Helpers](https://nextjs.org/docs/api-routes/response-helpers)
  - [API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Reading from Firebase](https://firebase.google.com/docs/firestore/query-data/get-data#node.js)

- Firebase -> Project Settings -> Service account -> Gen new key == download json file
- Break the Key on the new lines.
- ```npm i firebase-admin```
- initialise connection to admin == ```firebase-admin.js```
- copy ```initializeApp``` from jamstack functions
- config email + private key with new lines and paste url, reuse project ID
  - Private key "--begin etc end--"
  - private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  - Have to use the whole key then split on a new line
- Nothing in the docs match what we did here for db connection. Below is working.

```
|-pages
    | -api
        | -sites
```

```js

export default async (_, res) => {
    const snapshot = await db.collection('sites').get()
    
    console.log(snapshot);

    const sites = []

    snapshot.forEach((doc) => {
        sites.push({id: doc.id, ...doc.data() })
    })

    res.status(200).json(sites)

}

```

## SWR Data Fetching using Hooks

[SWR](https://swr.vercel.app/)

- ```npm i swr`
- Refreshes data in the background
- Stays up to date
- Set up to return my api call as json...

## Parsing Dates

- [Formatting Date](https://date-fns.org/v2.16.1/docs/format)
- ```npm i date-fns```

## Locally mutate state

- ```import { mutate } from 'swr'```
- locally mutates the state on the passed page.....
  - After we create a site, tell the sites page to update immediately?


## Snapshot of DB + Dynamic Routing

[Dynamic api Routing](https://nextjs.org/docs/api-routes/dynamic-api-routes)
```[fileName].js``` will send fileName as a variable to the page query. It's whatever is attached to the end of the URL and that will act as a variable, so it could be a id from the database or a location in a city.

We get a snapshot, make a variable (empty list), then iterate over those values and add them to the list.

```js
import firebase from "./firebase-admin";

export async function getAllFeedback(siteId) {
    const snapshot = await firebase
    .collection('feedback')
    .where('siteId', "==", siteId)
    .get()

    const feedback = []

    snapshot.forEach((doc) => {
        feedback.push({ id: doc.id, ...doc.data() })
    })

    return feedback
}
```

Then we create a folder in ```api``` called feedback -> ```[siteId].js``` which will be some kind of dynamic page.

We use the request to look at the ```siteID``` coming in, probably as the url then we use that to ping ```firestore``` and fetch that siteId and render the info using the ```getAllFeedback()``` helper function

Visiting this page returns a json object from the db for this specific ID which is saved in collection ```feedback```

```http://localhost:3000/api/feedback/FnIEZk6dRrGidspMhIs0```


## Get static props + paths

[Static Props](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)

**Props**
- Allows me to generate static sites based on dynamic content.
- GetStaticProps is passed data and returns actual props that can be used in the component below it. It's like being passed params.
  - getStaticProps + getStaticPaths boilerplate from nextjs page
  - strip out the params route being passed in and send it to helper function.

**Chakra**
Box is like a div with styling features available.

**Form Control**
Doesn't always render a Form Form. So may need to be wrapped. ie: with single email inputs etc

### Routing 

[Dynamic Routing](https://nextjs.org/docs/routing/dynamic-routes)

I can use the useRouter hook, to get the value that I'm using to dynamically generate the url.

**UseRef**
[useRef](https://reactjs.org/docs/hooks-reference.html#useref)

```js
const inputEl = useRef()

<Input ref={inputEl} type="comment" id="comment" />
```

**Ordering by Date**
[```compareDesc```](https://date-fns.org/docs/compareDesc)

```js

feedback.sort((a, b) =>
        compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

```

### Link

useful... [passHref](https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag)

```js

<NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
    <Link>View Feedback</Link>
</NextLink>

```

### Fetching personal data only

Firebase Auth uses JWTs
- [JSON Web Token ie: JWT](https://jwt.io/)
- [Firebase token verification](https://firebase.google.com/docs/auth/admin/verify-id-tokens)

console logging the auth'd user shows "ya" as a key. This is my JWT which can be decoded later.

**JWT**
We stripped the token off of the raw user and send it as a GET request to the backend api with the headers


### Magic link / log in

[Magic article](https://vercel.com/blog/simple-auth-with-magic-link-and-nextjs)
[JS Cookie](https://github.com/js-cookie/js-cookie/tree/latest#readme)

You need to save a cookie before this works.
```js

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: `
          if (document.cookie && document.cookie.includes('authed')) {
            window.location.href = "/dashboard"
          }
        ` }} />
      </Head>
      <Link href="/login"><a>Login</a></Link>
    </>
  );
}

```

### Incremental Static Regeneration
[Blog post](https://nextjs.org/blog/next-9-5)
When new requests hit these pages, it will check for new content and update in the background.


### Optimistic UI + SWR

```js

import { mutate } from 'swr'

```

```js

mutate(
        ['/api/sites', auth.user.token],
        async (data) => {
            return { sites: [...data.sites, newSite] };
        },
        false
      );

```

Sometimes things don't update immediately because the data is cached, SWR does a check once the focus is on and off the browser window.