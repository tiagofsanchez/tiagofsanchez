---
title: "React nanodegree, week 4 and 5"
date: 2019-12-28
category: "Code"
thumbnail: "../thumbnails/React-js.png"
tags:
  - redux
  - learning
  - udacity
selected: "no"
---

This is week 5 of the course, and probably the most challenging one thus far. At least for me. In this post I will discuss how we have implemented redux in our [Chirper Project](https://github.com/tiagofsanchez/reactnd-chirper-app) and the challenges that I faced.

# Chirper Project

This was a code-along project for my [React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019).

As mentioned, this was a code-along project, and here I will try to highlight the stuff that I have learnt as well as the biggest challenges I come across.

## First impressions

WOW! this was the most challenging project I have done thus far. I have to admit that I am struggling to learn Redux - 2 weeks in trying to learn Redux and I would be lying if I told you that fully comprehend how it works.

Don't get me wrong I do understand the reasons why I am using it, specially after having finished my first [project](https://github.com/tiagofsanchez/reactnd-project-myreads-starter) where I took it to literally the following statement:

> Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

Considering the design implemented on MyReads project I totally understand why Redux exists. In my implementation I have considered one single source of truth to manage the app state and was passing the state as props to numerous components. Every time that the user interacted with the UI I was using callback functions to update my state and re-render the components that were impacted by that change...ufff, it was a lot of hard work.

When I learnt that redux would solve this problem for me I was over the moon. I love the concept of having state management tool that will help me manage the state to create a single source of truth. However, this was as been a hell of a ride... Redux, as a concept is fine to grasp, and according to redux documentation:

1. It is a single source of truth and the state of your whole application is stored in an object tree within a single store
2. State is read-only and the only way to change the state is to emit an action, an object describing what happened
3. Changes are made with pure functions and to specify how the state tree is transformed by actions, you write reducers.

Effectively you can connect any component that you want to your store. That component will be able to "consume" the information from your state and re-render depending on the changes. On the other hand, by connecting your component to the store you will have access to a function called `dispatch` that will enable, depending on the UI interaction, to make changes to the store and as a result re-render the components for you.

The other thing that is absolutely amazing about Redux is the time traveling feature. It literally allows you to time travel in order to better understand what happened to your store, what action triggered it and that will be really helpful every time you need to debug your application.

To be honest, easier said than done, so lets have a look to a couple of examples on our Tweeter app.

## Implementation, how do I think about this

No doubt that the building guidelines from the Udacity team are fantastic:

1. Identify What Each View Should Look Like
2. Break Each View Into a Hierarchy of Components
3. Determine What Events Happen in the App
4. Determine What Data Lives in the Store

For me these guidelines were extremely useful, and I often went back to check them, however I felt that I was missing a check list to help me navigate the, sorry to say, Redux boilerplate and main concepts. Please bear in mind that I am not criticizing Redux, I def don't have any authority on the matter, I am just sharing my views from a rookie standpoint while tying to build something that would be useful.

### Before you start, the things to do

> DISCLAIMER: I am not trying to teach anyone Redux (I don't have authority on the matter) but rather trying to put together a "checklist" that could help anyone, me included.

Before starting you will need to install a couple of things:

- redux: `yarn add redux`
- react-redux: `yarn add react-redux`
- thunk: `yarn add redux-thunk`

In a very simple way, [redux](https://redux.js.org/) is, oh well, a state management library. The [react-redux](https://react-redux.js.org/) library stitches redux to react and makes both work seamlessly. And[thunk](https://github.com/reduxjs/redux-thunk) is our middleware that will enable API calls in our action creators, that other wise only return objects and wouldn't be able to perform an async request.

### Creating a store

To create the store you will need `createStore` from redux and you will also need to set up your reducers and middleware so that you incorporate them on the store. In the case of our tweeter app we did it as follows:

```jsx
//in our index.js
import { createStore } from "redux";

import reducer from "./reducers";
import middleware from "./middleware";

const store = createStore(reducer, middleware);
```

As you can see the store is completely dependent of the reducer and your middleware.

### Reducer & Action Creators

The reducer will specify how the application state changes in response to actions depending on the user interaction with the UI. Note that actions only describe what happened not how the state changes, this will be the role of the reducers.

A reducer is a pure function and you will not have any side effects, no API calls, no surprises. This is why we will need to have a `thunk` middleware further down the line.

Before we start with defining the reducer it will be very important to understand how the state of your overall app should look like in the form of one object. I must confess, this was a very tricky one for me, and I am not 100% confident that I will get it right on the next time.

According to the Udacity team my store should be something like this:

```js
{
  tweets: {
    tweetId: { tweetId, authorId, timestamp, text, likes, replies, replyingTo},
    tweetId: { tweetId, authorId, timestamp, text, likes, replies, replyingTo}
  },
  users: {
    userId: {userId, userName, avatar, tweetsArray},
    userId: {userId, userName, avatar, tweetsArray}
  }
}
```

As a result, you will have, at least 2 slices of state: `tweets` and `users`. As we progressed with the project, we realized that we needed a couple of more things in the state and we ended with the following:

```jsx
// reducers/index.js

import { combineReducers } from "redux";

import tweets from "./tweets";
import users from "./users";
import authUsers from "./authUsers";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  tweets,
  users,
  authUsers,
  loadingBar: loadingBarReducer
});
```

Before we deep dive into the `tweets` reducer we need to create the actions that will be used by the reducer as he is changing the state of out app on the store.

#### The tweets action creator

I will not cover all the details of the action creator, however I would like to point out a couple of things. The first thing that one needs to understand is: what are the actions the user will perform on your app that will impact the store?

```js
// actions/tweets.js

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOOGLE_TWEET = "TOOGLE_TWEET";
export const ADD_TWEET = "ADD_TWEET";
```

You will need to receive all the tweets, toggle them when the user likes one, and add tweet every time the user publish a new tweet. Let's have a look the the first situation:

```js
// actions/tweets.js
function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  };
}
```

This is a very simple action and as you can see it returns and object with and action.type and a payload, in this case your tweets. However we need to get our tweets from our API, as well as our users and authedUser, so we will do all that on a `shared` action creator.

```js
// actions/shared.js

import * as API from "../utils/api";
import { receiveUsers } from "./users";
import { receiveTweets } from "./tweets";
import { receivedAuth } from "./authUsers";
// a package to show us a loading bar every time the user will be waiting on the async call
import { showLoading, hideLoading } from "react-redux-loading";

//hard coded
export const UserID = "tylermcginnis";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return API.getInitialData().then(({ tweets, users }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveTweets(tweets));
      dispatch(receivedAuth(UserID));
      dispatch(hideLoading());
    });
  };
}
```

Here we are handling everything together in a single action creator. So now that we have the information that we want, how is the `tweets` reducer using this action creators to update the store?

#### The tweets reducer

Followed by the issue that I have with the store, how the build the reducer is my biggest challenge. This is a very simple case for when I receive all the tweets.

```js
import { RECEIVE_TWEETS } from "../actions/tweets";

function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      };
    ...
```

However, if you look at the ADD_TWEET action type or the TOOGLE_TWEET action type, I reckon you will understand the challenges that I am facing.

### Middleware

In this case we used the middleware for (1) get all the tweets and users from our API and (2) dispatch any changes that the user is doing on to our database.

Bear in mind that we already integrated the middleware in our store, so the only thing that we need to do here is use the `thunk` library to make sure that my our reducers work properly and are able to dispatch an async call.

```jsx
// middleware/index.js

import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "./logger";

//The order of the middleware is critical
export default applyMiddleware(thunk, logger);
```

Note that we also have logger so that we have a clear understanding of the actions that are being performed.

### File structure

Here I am not going to justify the file structure, just wanted to show you the same.

![file structure](https://github.com/tiagofsanchez/reactnd-chirper-app/blob/master/Images/fileStructure.png?raw=true)

Having said that, please bear in mind that there are different approaches to format your files:

- "Rails-style" organization ([more here](https://github.com/reduxjs/redux/tree/master/examples/real-world))
- "Duck-style" organization ([more here](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/))

For the record, here we used the first one. Please note that, at the end of the day, the choice is yours.

### Connecting the store

We have done a lot, but have yet to connect our store the any component let alone to work on the UI of our application. Let's have a look how we can connect `Tweet` component to the store: enter `react-redux`:

```jsx
// components/Tweet.js
import { connect } from "react-redux";
import { formatTweet } from "../utils/helpers";
{...}

//here I am deconstructing the different arguments from the store
function mapStateToProps({ authUsers, users, tweets }, { id }) {
  const tweet = tweets[id];
  //you will have to pass all details of the parentTweet so that you can render after
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authUsers,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authUsers, parentTweet)
      : null
  };
}

export default connect(mapStateToProps)(Tweet);
```

As you can see, we had to work on the data structure a little bit (with the help of formatTweet), but the main point here is that you are able to connect the component to the store and pass the `state` as `props` on this component.

### Dispatching actions

The user could interact with the UI and we will need to capture that and as a result change the state of our app in case the user liked the tweet. Let's see how that was done:

```js
// components/Tweet.js

import { handleToogleTweet } from "../actions/tweets";

handleLike = e => {
  e.preventDefault();
  const { dispatch, tweet, authUsers } = this.props;

  dispatch(
    handleToogleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authUsers
    })
  );
};
```

## Conclusion

It is very interesting to note that, as I am going through this, I stumble upon [redux toolkit](https://redux-toolkit.js.org/), a library that was made by the redux team and, according to them - is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:

- "Configuring a Redux store is too complicated"
- "I have to add a lot of packages to get Redux to do anything useful"
- "Redux requires too much boilerplate code"

Probably this could be a potential solution for the challenges that I was facing? As of now, I am not sure given that I haven't experimented with this package. However, one thing is clear, I am not the only one that thinks that redux can seem a little be overwhelming at the beginning.

However, before I jump into a new package or library I fell that I need to better understand how to correctly set up my reducers as well as how to think about how should the store look like.
