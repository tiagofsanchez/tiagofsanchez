---
title: "React nanodegree, Flashcard App"
date: 2020-03-02
category: "Code"
thumbnail: "../thumbnails/react-native-logo.png"
tags:
  - redux
  - react native
  - udacity
selected: "no"
---

Today is great day, today I have received an email from UDACITY saying that I have clear my last project and that I have finalized my React nanodegree program 💥 🎉 🥳! Happy days...

Despite the fact that I think this is only the beginning of my coding journey, I reckon it is also time to reflect on what I have achieved in this program... well, probably not today, in another post I think, but you got the gist.

Today I would rather focus on the react native project that I have just finalized and share that with you. Also I would like to mention that I am a little bit disappointed with UDACITY by not keeping the react native course updated amongst a couple of other thinks that I will try to cover on my next post. With that out of the way, let's dive in the Flashcards react native app.

# Flashcards - A App built with React Native

This is UDACITY React nanodegree capstone project #4 and was designed for IOS, despite the fact some components could be used on both IOS and Android. Please check my [repo](https://github.com/tiagofsanchez/reactnd-project-flashcard)

## The Project approach

This time around I was a little bit more clumsy in the way I planed building this app. I didn't necessarily follow through the recommendations and jump a couple of things that I learn to like thinking on the fly instead of putting together a very sophisticated and detailed plan. In short, I was more keen to code than to think...Def don't recommend that for more complex applications as this will lead to a lot of rework.

Having said that I clearly had in my mind a plan, and idea on how I should go about doing this:

1. 📐 Draw the app views;
2. 📲 Thought about how they would flow and connect;
3. 🧰 More or less broke down how the differ component's will build the views;
4. 📉 Barely thought about the data...

For me the drawing piece is always one of the most interesting ones, so let's just jump into it.

## 📐 Draw the app views

In my mind I needed to have a couple of views that would create a swift user experience for which the user wouldn't need explanation. For that I created 5 screens that don't necessarily translate to the components, but were the basis for me to start coding.

### Deck List View

A view that basically will represent the Home page of the app.

![Deck List View](https://github.com/tiagofsanchez/reactnd-project-flashcard/blob/master/Images/DeckList.png?raw=true)

This view represents the list of Decks that any user will have in their home page. I also wanted to implement the concept of statistics, a place where the app would keep track on user's performance, however I didn't progress with that thought as of now... who knows probably would be doing that in the future?

Here the user will be able to (1) click through any deck or (2) add a new deck to his / her deck list collection.

### Deck View

After clicking the Deck the user will be routed to the deck view.

![Deck View](https://github.com/tiagofsanchez/reactnd-project-flashcard/blob/master/Images/DeckView.png?raw=true)

Here the user will be able to see the title of the deck and the # of cards that the deck has. In terms of actions, the user would be able to add cards to this particular deck or start a quiz.

I also implemented the option to delete the deck itself as I think that should be there as an option.

### New Deck View

If the user would like the create a new deck, he will tap into the add new deck tab in the bottom of the Home page.

![New Deck View](https://github.com/tiagofsanchez/reactnd-project-flashcard/blob/master/Images/NewDeckView.png?raw=true)

Here the user is going to be able to create a new deck and submit it.

### New Card View

Whenever a user wants to add a new card to his / her deck, this view will pop up/

![New Card View](https://github.com/tiagofsanchez/reactnd-project-flashcard/blob/master/Images/NewCardView.png?raw=true)

The user will need to input a question and the answer to the same question and submit that new card to be added to the current deck.

### Quiz View

Here the user will be able to practice his / her knowledge by going through the different questions.

![Quiz View](https://github.com/tiagofsanchez/reactnd-project-flashcard/blob/master/Images/QuizView.png?raw=true)

The UI will have information about the Deck, the current question with a information displaying total number of questions and the ones that were answered by the user. The user will be able to check the correct answer for that question and feedback how he performed.

## 📲 Thought about how they would flow and connect and 🧰 Breaking components down

The user will have an Home page (this will be my `App` component) where he would be able to do to do a couple of things on his Tab Bar:

- Home navigation (that will render `HomeStack` component)
- Add New deck navigation (that will render the `NewDeck` component)

The `App` component is using the following stack:

```js
{...}
<Tab.Screen name="Home" component={HomeStack} />
<Tab.Screen name="Add Deck" component={NewDeck} />
{...}
```

As you can see, this will render `HomeStack` or `NewDeck` depending on what the user will press.

The `HomeStack` component will have the following format:

```js
function HomeStack(props) {
  return (
    <Fragment>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={DeckList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Deck"
          component={Deck}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Fragment>
  );
}
```

By default it will render `DeckList` component, but if you press any deck on that list, the Deck component will be triggered and rendered.

It is interesting to note that `Quiz` will never be triggered in the `DeckList` component but needs to be on this stack so that we can access it once we are in a given `Deck`.

As mentioned before whilst in the Home page the user will be able to click on the different decks and that will take then to the Deck View that is represented on my `Deck` component. Here you could go to Add Card View that is represented on my `AddCard` component but you also could access the Quiz View, represented by `Quiz` component.

Last but not the least you also have the `QuizResults` component that will show how the user performed once he finalized the quiz.

## 📉 Data, Store and database

I don't know why, but I defaulted to use redux despite the fact it was not in the rubric. With redux, managing the state of your application is simpler... well I know that you have way more work on setting it up, however keeping tabs on the users actions and how that impacts the state of your application is absolutely fantastic. Enough talk, this is how I did it:

Decided to use redux to manage the state of my app and implemented only 1 slice of the state with the following format:

```js
{nameOfDeck: {
    title: "nameOfDeck",
    questions: [
        0:{question: 'whatever question you want', answer: 'your answer to that question'}
        1:{question: 'whatever question you want', answer: 'your answer to that question'}]
    }
}
```

As you can see the format of the state of the app is very simple give that you only need a slice.

It is very important to have the right data at the right life-cycle of your app and here you will have to bear in mind with:

- Once you initialize your app, we will need to fetch data from our "DB" and inject it into our store.
- `getDecks` will be getting all data from "DB" and `receiceDecks` will be the action creator to update our store
- We will also need to `saveDeck` to our "DB" and that will be mirrored by `addNewDeck` to the store
- To add cards to the deck we will have `saveCardToDeck` to save in our "DB" and `addNewCard` in our store

I have also implemented a delete all feature and an option to delete the individual decks. If you would like to check the details, please check the `utils/api.js` for "DB" updates and `actions/index.js`, `reducers/index.js` for the store that I have implemented.

Now that I am thinking about it could I have all of this in my `utils/api.js`? I mean, could I, every time that I trigger a "DB" update have change my store? I guess this will be cleaner for the component, but not entirely sure if this are the best practices. Anyone?

## Additional things that I implemented

In this project I implemented a series of things that were not part of the rubric, I will list them below:

- Validation if Deck is already existing or not when the user is adding a new deck;
- Delete all functionality on the Home page, where the user can view the list of decks available;
- Functionality to delete individual decks;

## Things I tried or should have

I have tried to a couple of different things that didn't necessarily work and I wanted to share them here as you probably could help me out with those.

The first thing was the `Modal` component when I am adding cards to my deck. For same strange reason I was not able to implement the presentation style `pageSheet` or any of the others in a correct way and as a result I had to default to `fullScreen`

The second thing that I am not entirely sure why I was not able to implement is a TouchableOpacity component that would work to handle both responses of the user on the Quiz view.

```jsx
//The component
const TouchableOpacityComponent = ({ name, onPress, ...props }) => (
  <TouchableOpacity onPress={() => onPress(name)} {...props} />
);

//Rendering that component in my UI
<TouchableOpacityComponent
  style={styles.btnContainer}
  name="incorrect"
  onPress={name => this.responseHandler(name)}
>
  <Ionicons name="ios-close-circle" color={"red"} size={25} />
</TouchableOpacityComponent>;

//The responseHandler is not working as I wanted
 responseHandler(name) {
    console.log(name);
  }
```

Last but not the least I have tried to represent the user results using a nice pie chart from [victory-native](https://github.com/FormidableLabs/victory-native), however didn't manage to implement and post an issue on Formidable Labs (the creator of this package) project repo, you can check it out [here](https://github.com/FormidableLabs/victory-native/issues/542)

## Final notes

If you are going through the course and you bump into this, I hope this will help you. If you are thinking about engaging on the course I hope that this will help you as well. Feel free to reach out if you have any questions.

See you around and keep doing what you like!
