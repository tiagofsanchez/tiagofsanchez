---
title: "React nanodegree, Would you rather App"
date: 2020-02-17
category: "Code"
thumbnail: "../thumbnails/React-js.png"
tags:
  - redux
  - learning
  - udacity
selected: "no"
---

Wow, it has been a long time since I have posted...so here it goes, a little bit more about my React nanodegree journey!

# Would you rather project

At this moment I am lost in the number of weeks, so I will stop mentioning the week number of my Udacity React nanodegree. In this post I will discuss the thinking behind the my implementation of the [would you rather app](https://reactnd-would-you-rather-project.netlify.com/).

## The project approach

Here you will find my project and the steps that I have made to build it. I will follow the guidelines provided by udacity team and they are as follows:

1. ✏️ Draw All the Views of the App
2. 🔨 Break Each View Into a Hierarchy of Components
3. 📅 Determine What Events Happen in the App
4. 💾 Determine What Data Lives in the Store.

Let's get started.

## 1.Draw all the views of the app

With the help to the following YouTube video we are able to build the different page views.

- [Would you rather app](https://youtu.be/xfmSkLAL__Q)

So you will have a couple of different pages here:

- Home, is it's own component and page `"/home"`
- Login, rendered in `Home` component `"/home"`
- QuestionPage, is it's onw component and page `"/question/:id"`
- LeaderboardPage, is it's own component and page `"/leaderboard"`
- NewQuestion, is it's onw component and page `"/add"`
- NoMatch, is it's own component and page (anything that is not defined above will default here)

> At the beginning I had divided `QuestionPage` and `QuestionResultPage`, as I thought this was a better implementation, however I needed to follow the rubric 100% so that your project gets approved

Note that for every different page, I will need to create a different url, with exception of Login and Home page given they will share the same and will be the root of my app.

I am not sure if I am missing something out, but for now, I reckon this is a very good start and we can always go back to the main project rubric to check if I are missing something out.

Let's dive in the components for each page.

## 2.Components breakdown

Here I will try to breakdown the different components that are needed to build each individual page and view that is presented to the user.

### Login page

From a component stand point, this one will be very simple, it will have an (a) Icon with the logo of the app, (b) a dropdown for the user to select his profile and (c) a submit button to login that user.

![Login Page](https://github.com/tiagofsanchez/reactnd-project-would-you-rather/blob/master/src/Images/LoginApp.png?raw=true)

The Login page will be inserted in the App.js file. Actually all my components will be inserted here and will be rendering them according to the user interaction with the my application.

#### Data required

The dropdown (using `semantic-ui-react`) will need to have user information in a certain way to work. As such I have created a function, that is on helper.js file, to display the information properly in the UI and connected this component to the store.

### Home page

Existing components

- NavBar (will be present in every page with the exception of Login)
- QuestionCard (for unanswered and answered questions)

![Home Page](https://github.com/tiagofsanchez/reactnd-project-would-you-rather/blob/master/src/Images/HomeApp.png?raw=true)

The NavBar will help the user navigate through the App and will get the user access to the `Home`, `New question` and `Leaderboard` page as well as show the avatar for the user and a button to logout the user.

`Home` will divide unanswered and answered questions of a given user. In the UI the user will be able to see the a "toggle" that will enable to change between the different types of questions.

The `QuestionCard` will display information of the questions and provide a way to answer and unanswered question or check the result of a question that the user as already answered to.

#### Data required

The `Home` page component will need to be connected to the store and we will need to split the information considering the questions that the user answered and not. We also needed to consider the order.

Similarly `NavBar` component will need to have access to the store to know who is the user logged on, his name and avatar as well as to have access to log the user out by dispatching and action with access to the store to change the `authUser` slice.

### QuestionPage

- NavBar (as mentioned before will also be present here)
- QuestionPage
- QuestionResultPage

This component, rendered on `/question/:id` will render different components depending on the user interaction. For unanswered questions, and after the user selects the question to answer, you will have:

![Unanswered](https://github.com/tiagofsanchez/reactnd-project-would-you-rather/blob/master/src/Images/QuestionApp.png?raw=true)

On the other hand for answered question or after the user answers a question:

![Unanswered](https://github.com/tiagofsanchez/reactnd-project-would-you-rather/blob/master/src/Images/ResultApp.png?raw=true)

Note, once again, that the URL is the same and what I am doing here is changing the components that are rendering depending on the user interaction with the UI. This was one of the requirements of the project and I don't believe this was intended to showcase the best practices of app design, but to think about how to solve for a multi component rendering depending on the user input on the UI.

#### Data required

The `QuestionPage` component will act as a controlled component when the user wants to answer a given question. However it could also be rendering `QuestionResultPage` that will be a component with access to the store. Both components will have access to the store as they will need to get relevant information.`QuestionPage` component will need to dispatch actions to change the different store slices, `questions` and `users`, whereas `QuestionResultPage` is only consuming store information and doesn't need to update anything.

### New question page

Existing components:

- NavBar (as mentioned before will also be present here)

The `NewQuestion` page is rendered on it's own URL and is a controlled component that has its own state and will connect to the store so that the question the user asks will be properly stored and used throughout the application.

![New Question](https://github.com/tiagofsanchez/reactnd-project-would-you-rather/blob/master/src/Images/ResultApp.png?raw=true)

Despite the fact that you see the form highlighted you will not find a page and component design, everything will be on the `NewQuestion` component.

#### Data required

Access to the store will be required for dispatching data to the store. `NewQuestion` will need to change the both `questions` and `users` slices of the store every time a user adds a new question.

### Leaderboard page

Existing components

- NavBar
- LeaderboardCard

`LeaderboardPage` page will represent, as the name mentions, the different scores of the users of the app depending on their answers. Here you will find a `LeaderboardCard` component, more for a styling decoupling. All data will be contained in the `LeaderboardPage` that will need to have access to the store.

![Leaderboard](https://github.com/tiagofsanchez/reactnd-project-would-you-rather/blob/master/src/Images/LeaderboardApp.png?raw=true)

I think we are all good for now... let's start to figure out what are the main actions on our app.

## 3.Determine What Events Happen in the App

When you open the app you, before you login, you should get users and the questions:

- get **users**,
- get **questions**

During the login phase you need to set the authUser

- set **authUser**

When you are in the unanswered questions pane, you need to get the unanswered questions, whereas in the answered questions pane the ones that the user answered already.

- get **questions** (the correct ones :)
- get **authUser**

### 4.Determine What Data Lives in the Store

To be very honest, here I followed the current structure of the data. I reckon I would struggle to do this were I to start an application from scratch.

For me my store looked like this:

```js
import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";

import questions from "./questions";
import users from "./users";
import authUser from "./authUser";

export default combineReducers({
  authUser,
  questions,
  users,
  loadingBar: loadingBarReducer
});
```

The loadingBar is keeping tabs with the needed information for me to render the loadingBar properly.

## Other stuff that I have used

During this project I have used different open source projects (that are not part of the Udacity program) to speed up my development and as such I would like to mentioned them bellow:

- [Semantic Ui React](https://react.semantic-ui.com/)
- [Emotion](https://emotion.sh/docs/introduction)
- [React Redux Loading Bar](https://mironov.github.io/react-redux-loading-bar/)
- [Flaticon](https://www.flaticon.com/)

## Final notes

I think this gives you a gist of the the thought process and tooling behind this project, hope you can use this to build your own project and as a reference guide whenever you are stuck with any issue. Feel free to reach out if you have any questions with all the above.

See you around!
