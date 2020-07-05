---
title: "Building a contact form with Airtable"
date: 2019-10-06
category: "Code"
thumbnail: "../thumbnails/airtable-logo.png"
tags:
  - gatsby
  - airtable
  - netlify
selected: "no"
---

You probably don't know this, but I am a massive fan of [Airtable](https://airtable.com) and what you can do with this toll. My love for Airtable is proportional to my hate for Excel, and yes, as you can imagine Airtable can not only substitute Excel, but also can be used as a database. What's more, every table on Airtable has their own API, making any front-end development a possibility...and that is just amazing!

While I was learning how to build my own contact form and connected to Airtable I also learnt that Gatsby, the framework that I am using for my blog, has a `gatsby-plugin` that will tap into Airtable and push my tables data model into GraphQL. That is, as you can imagine a dream, given this will enable you to build your site data structure at build time not requiring HTTP request every time that you want to render data into your DOM from Airtable. Anyway, in this blog post I will not explore this but will definitely test how this works and explore a way to use it on my this blog.

Enough about my Airtable love and let's build our form.

# Starting with the Form UI

In terms of structure, and there are probably one thousand ways to do this, I have started with building 2 components, one where I will keep my `input` elements, and the other where I will have my `form`. The input element will be designed in my `input.js` component whereas my form will be in the `mailListForm.js` component. Let's see what I have done in my input component:

```jsx
//input.js without styling
import React from "react";

const input = props => {
  const { inputtype, label } = props;

  let inputElement = null;
  switch (inputtype) {
    case "input":
      inputElement = <input {...props} />;
      break;
    case "text":
      inputElement = <textarea {...props} />;
      break;
    default:
      inputElement = <input {...props} />;
  }

  return (
    <Styled>
      <label>{label}</label>
      {inputElement}
    </Styled>
  );
};

export default input;
```

This implementation will be very handy if you would like to build more forms along the way as you can now define the type of input, as well as the input styling (you can check for the styling on my [repo](https://github.com/tiagofsanchez/TiagoFSanchez) as I am not implementing it here) in just one component. As `input.js` will be the child component of `mailListForm.js` or any other component that will want to use it, you will need to pass it both `inputtype` and `lable` props so that the right input will be rendered on your DOM.

Now that you have the input dynamically changing depending on the props that you pass to `input.js`, let's check how this works on the parent component.

```jsx

//This is my mailListForm component
import React, { Fragment } from "react";
import { Styled } from "theme-ui";
import Input from "./input";

class mailListForm extends React.Component {

  render() {

    const summitButton = (
      <button onSubmit={...}>
          Sign me up
      </button>
    )

    const thankYou = (
      <h2>
        Thank you for joining!
      </h2>
    )

    return (
      <Styled >
        {isSubmited ? (
          thankYou
        ) : (
            <Fragment>
              <Styled.h3 >
                Like what you see?
            </Styled.h3>
              <Styled.p >
                No spam, just me trying to learn how to code!
                And same other interesting stuff!
            </Styled.p>
              <form onSubmit={...} >
                <Input
                  inputtype="input"
                  label="Your name"
                  placeholder="to get to know you..."
                  name="name"
                  value={name}
                  onChange={...}
                />
                <Input
                  inputtype="input"
                  label="And email"
                  placeholder="to send you good stuff..."
                  name="email"
                  value={email}
                  onChange={...}
                />
                {summitButton}
              </form>
            </Fragment>
          )}
      </Styled>
    )
  }
}

export default mailListForm

```

In terms of UI, and again, not considering styling (for this you should check my [repo](https://github.com/tiagofsanchez/TiagoFSanchez)), you will need to think about **(1)** the input component, **(2)** the button and **(3)** the text message that you will show once users submit their name and email. You could obviously ask for more information by easily creating a new `Intput` element, however less is more in forms so I decided to go with only name and email.

# Managing the state of my form

There is one thing to highlight here before we go through our event handlers; for this component to work properly we need to build a class component instead of a functional component so that we can manage the state and pass it on to our async function that will `POST` the information to Airtable.

But first things first, let's define the state and the event handler:

```jsx

//This is my mailListForm component
import React, { Fragment } from "react";
import { Styled } from "theme-ui";
import Input from "./input";

const initState = {
  isSubmited: false,
  name: "",
  email: "",
}

class mailListForm extends React.Component {

 state = initState

  formChangeHandler = (event, name, value) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {

    const { name, email, isSubmited } = this.state

    const summitButton = (
      <button onSubmit={...}>
          Sign me up
      </button>
    )

    const thankYou = (
      <h2>
        Thank you for joining!
      </h2>
    )

    return (
      <Styled >
        {isSubmited ? (
          thankYou
        ) : (
            <Fragment>
              <Styled.h3 >
                Like what you see?
            </Styled.h3>
              <Styled.p >
                No spam, just me trying to learn how to code!
                And same other interesting stuff!
            </Styled.p>
              <form onSubmit={...} >
                <Input
                  inputtype="input"
                  label="Your name"
                  placeholder="to get to know you..."
                  name="name"
                  value={name}
                  onChange={(event, name, value) =>
                    this.formChangeHandler(event, name, value)
                  }
                />
                <Input
                  inputtype="input"
                  label="And email"
                  placeholder="to send you good stuff..."
                  name="email"
                  value={email}
                  onChange={(event, name, value) =>
                    this.formChangeHandler(event, name, value)
                  }
                />
                {summitButton}
              </form>
            </Fragment>
          )}
      </Styled>
    )
  }
}

export default mailListForm

```

If you are trying to implement this at the moment, you should `console.log(this.state)` within your `formChangeHandler` to check if your `onChange` is working properly and really changing the state of your component every time that you input information into your form. It should be ok, but it is always good to check before continuing.

# Connecting to Airtable using their API

Now we will be submitting the information that the user inputs into de form and push it to a table in Airtable. Needless to say that you will need to **(1)** get and Airtable account, **(2)** create a base and **(3)** a table to achieve that.

After doing that, if you have never done so, it will be extremely useful to read the [API documentation](https://airtable.com/api) that Airtable provides. Ah... and just one more thing, I will be using `axios` to manage my async request, but feel free to use any of the other amazing [different options](https://www.freecodecamp.org/news/here-is-the-most-popular-ways-to-make-an-http-request-in-javascript-954ce8c95aaa/) out there.

Bellow you will find the event handler that is missing on the form and button `onSubmit` as well as the method that will be triggered once a user clicks the button or presses enter.

```jsx
//defining my eventHandler
<form onSubmit={e => this.formSubmitHandler(e)} >
  ...
</>

```

The method will be a little bit more complicated and to be honest I struggled a little bit with this piece and had to leverage [Airtable community](https://community.airtable.com/t/post-to-airtable-not-working-but-get-is-ok/25309) that was extremely helpful. I reckon a couple of more points to Airtable that was able to create such a great and responsive community.

```jsx
//to use axios
import axios from "axios";

//more on this latter
const app_id = process.env.AIRTABLE_APP_ID;
const app_key = process.env.AIRTABLE_API_KEY;
const view = "MailingList";

formSubmitHandler = e => {
  e.preventDefault();

  const { name, email } = this.state;

  const data = {
    records: [
      {
        fields: {
          Name: name,
          Email: email
        }
      }
    ]
  };

  let url = "https://api.airtable.com/v0/" + app_id + "/" + view;
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + app_key,
      "Content-Type": "application/json"
    }
  };

  axios
    .post(url, data, axiosConfig)
    .then(resp => {
      this.setState({
        ...initState,
        isSubmited: true
      });
    })
    .catch(error => console.log(error));
};
```

> This is were all the Airtable API magic happens! I am literally able to push user input information to a table that I defined in Airtable. Gorgeous!

There are a couple of things to bear in mind here, one is that you need to install `axios` if you are using it, second is that you will need to access your API KEY and APP ID in order to tap into your Airtable API (do use the `.env.development` files in your root and do not commit those files into your repo), last but not the least you will need to structure the data in a way that Airtable recognizes it.

It is important to highlight here and this was the mistake that I was doing that the `headers` object for the async request need to be exactly as per the [documentation](https://airtable.com/api). Yes, I know, a rookie mistake, but that tends to happen, so just watch out for that.

# Environment variables with NetliFy and Gatsby

I was stoked by having nailed it! Pushed the code into my git repo, was testing by implementation in production and boom 💥! It didn't work! Damm... I felt really bad and it took me a lot of time to figure out why this was happening. Now it seems obvious but when this happened it wasn't.

The problem is that while my code was working like a charm in development mode, the `.env.development` file wasn't being pushed to my repo (and it shouldn't be ever pushed) and as a result my `mailListForm.js` component couldn't access the environment variables on the client side. After a lot of research and, once again to the help online communities (this time on [netlifly](https://community.netlify.com/t/api-keys-and-environment-variables-on-netlify/3865)) I was able to learn that I can set up environment variables in Netlify UI that can be used by Gatsby.

After setting the environment variables on Netlify you will need, according the Gatsby [documentation](https://www.gatsbyjs.org/docs/environment-variables/), to fix the variables by adding a very simple prefix:

```jsx
//making sure that Gatsby gets the env variables
const app_id = process.env.GATSBY_AIRTABLE_APP_ID;
const app_key = process.env.GATSBY_AIRTABLE_API_KEY;
const view = "MailingList";
```

I would say that this are the bear bones of the contact form but you def could make enhancements to it, for example:

- You could implement email format validation;
- Connection validation if you loose internet;
- Have a spinner every time that you submit information to Airtable;
- Prompt the correct messages to the user depending on different actions;

That is all for this post! See you around!
