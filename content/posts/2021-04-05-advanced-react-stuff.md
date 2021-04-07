---
title: "Learning Advanced React with Wesbos"
date: 2021-04-05
category: "Code"
thumbnail: "../thumbnails/React-js.png"
tags:
  - react
  - advanced
  - learning
selected: "no"
---

For the last couple of months I have been trying to learn a bit more about react, graphQl and different headless CMS solutions (keystoneJS) by going through [wesbos advance react course](https://advancedreact.com/). 

Here you will find a couple of my things that I have learnt, some thoughts about this learning approach and what I will do next on the back of all this. 

Please bear in mind that this is more of a list of things that I have learnt along the way and it is design in a selfish attempt to retain the key things that I consider important from this tutorial.

# Learnings

It will be hard to capture all the things that I am have learnt through this course as there are many things, anyhow this is my attempt: 

## Overall react stuff

- **Styled components**: I have to admit I have been using it poorly, so I am very glad to learn that I can style child html tags within a specific style component. Also I never user IntelliSense for Styled components, now I can't live without [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components);
- **GlobalStyles**: Whenever using Styled Components it is possible to have Global Style component that will take care of the global styles for us as long as we create a HOC that injects those stylings;
- **Javascript nesting chaining**: Love it, best way to check it a given object exists and to avoid so many errors
- **Intel.NumberFormat API**: Excellent API to format numbers for you without needing to instal a library, [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- **Custom React Hooks**: defining functions that clean state of the form in the hook itself. A good example [here](https://github.com/tiagofsanchez/learning-advanced-react/blob/main/sick-fits/frontend/hooks/useFormInput.js)
- **fieldset tag and aria-labels property**: use a combination of fieldset tab, aria-labels and css to properly style a form. A good example of that can be see [here](https://github.com/tiagofsanchez/learning-advanced-react/blob/main/sick-fits/frontend/components/CreateProduct.js)
- **How to create a gated Sign in Component**: or basically how to force the user to sign in for a url that he should have access to if he is signed out of out application. 
- **Using React Context**: in this case we used it to control the cart drawer and needed to create the HOC that will provide the cart state to all components on the project. 

## Nextjs:

- **Server Side Rendering**: Having worked with react and Gatsby I knew the differences between Client Side Rendering and Static Site Generator, however this was my first time working with Server Side Rendering. If you really want to better understand this differences I would def suggest this video from [Ahmad Awais](https://www.youtube.com/watch?v=6nuRlaNFd4g)
- **Routing in Nextjs**: there are 2 different ways to query, **(1)** Query string routing or **(2)** File based routing.


## Apollo Client:

- **graphQl queries and mutations**: Learning not only how to query keystone graphQl API, but also how to user apollo client hooks such as useQuery and useMutation to be able to perform those actions on the client side;
- **Caching data and managing catch**: Managing cache with apollo not only with the server renders data every time, but also when we delete something on the client so that the user can see

## Keystone with Typescript:

This one was a bit tricky as I really need to learn Typescript on the fly...however I can say totally worth it given the fab things that Typescript gives you out of the box, e.g. prompting props from Keystone like magic.

- **Schema definition**: defining all the data schemas types and relationships was a very interesting accomplishment;
- **Authentication**: so that the user can have, not only access to the information and the graphQl API, but also the keystone backend;
- **Writing custom graphQl mutations**: creating mutations that are totally customizable so that the user user can have a better experience. The best example that we will find here is the `addToCart` custom mutation;
- **Role control in user sessions**: control user roles on the individual sessions of the user by defining it on the backend and consuming in on the different user sessions. This is typically managed by the permissions at the user level; 
- **Rule based functions**: logical functions to list access, for example the owner of a given product and the admin will be the only 2 user roles that can actually update and delete a given product. Another good example will a user of the website will not be able to view other users neither to change his role to do so.


# Thoughts on coding along

Learning something new is a very hard thing to do, it takes time, dedication and effort. There are several different ways to learn how to code; **(1)** you could try to learn the theory first or **(2)** jump into code along type of tutorials or even **(3)** build a project of your own. (please note that this is an exhaustive list of ways to learning how to code, but rather a simple list of things that I tried to do my self). However, there is not right or wrong and to be honest I love all approaches, however I do believe that it is through endless repetition that we really learn. Personally, from time to time I go through a couple of tutorials that tackle topics that I like to learn more about and that works very well for me - as psychologist [Lev Vygotsky](https://en.wikipedia.org/wiki/Lev_Vygotsky) defends "we become ourselves through others". 

Coding along is great but it will only get you so far, on the other hand if you only get deep into the theory you will probably miss out on a couple of little details and will struggle with debugging your code. I reckon, despite this approach works very well for me, that it is super important to combine other types of learning to your repertoire. 

# What I will be working on next

Or, trying to fight imposter syndrome :)

Next I will be trying to solve a problem that I used to have before this Covid situation and before we were not allowed to travel - My next side gig will be to create surf directory that will, not only provide users with information about the waves around the globe, but also the things that are important for any surfer that is traveling. 

This is something that I have been thinking for a while now and to be honest, given what that I know a little bit more about how to code, I am super keen to do it. 




