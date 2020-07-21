---
title: "React nanodegree, MyReads App"
date: 2019-12-15
category: "Code"
thumbnail: "../thumbnails/React-js.png"
tags:
  - react
  - learning
  - udacity
selected: "no"
---

Three weeks in the course now and I have just finalized Project #1: **MyReads**, a Book Leanding App. A really interesting project with a couple of great problems to solve.

In this post I will try to walk you through what, in my perspective, were the most challenging technical problems I have faced. Please bear in mind that this is definitely not the best implementation, rather my take on the project.

# MyReads Project

You can have access to the code on my [Repo](https://github.com/tiagofsanchez/reactnd-project-myreads-starter).
To get started and test my project:

- install project dependencies with npm install
- start the development server with npm start

## The App

This is a very simple App you will find a Book View that stores my books on different shelf's.

![Book App](https://github.com/tiagofsanchez/reactnd-project-myreads-starter/blob/master/src/images/bookApp.png?raw=true)

And a search page where the user can search for new books.

![Search Page](https://github.com/tiagofsanchez/reactnd-project-myreads-starter/blob/master/src/images/searchBooks.png?raw=true)

I have implemented the following structure.

## The structure of my Project

I reckon I have taken the quote from the course to literal

> Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

This is how my component structure looks like:

![component structure](https://github.com/tiagofsanchez/reactnd-project-myreads-starter/blob/master/src/images/componentStructure.png?raw=true)

# Notes, interesting remarks and stuff that I have learnt on this project

## Component Life-cycle: componentDidMount()

The following example is very interesting to highlight how `componentDidMount()` works.
I my `App.js` I have the following (at least, I had that in the beginning):

```jsx
class BooksApp extends React.Component {
  state = {};

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(prevState => ({
        ...prevState,
        books
      }));
    });
  }

  render() {
    console.log(this.state);
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => <BookList books={books} />} />
        <Route path="/search" component={SearchPage} />
      </div>
    );
  }
}
```

With the `console.log(this.state)` I can check that `render()` gets mounted first and it will return an empty `state`, after you will have the `componentDidMount()` that will fetch all the data from the API and push that into the `state` of my `App.js`.

As a result of this, every time that you pass `state` into a children component, you will have to make sure that the state exists and the children component can use it. If, for example you are using `books` in a children component you have to make sure that `books` is not empty.

```js
{books && books.map((book) => {...})}
```

Despite the fact that you will have `state` being rendered twice, this will not have any visual implications to the user. Life is good!

## Group by a property in my objectArray

In the `BookList.js` component I get books from `props` and I receive all the books directly from my API in an array of objects that will not be ordered considering the shelf that they are in. As such, we needed to do that. I most confess, I was a little bit stuck here, before discovering `reduce()`.

This is how my data looks:

```js
(13) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
0: {title: "The Linux Command Line", subtitle: "A Complete Introduction", authors: Array(1), publisher: "No Starch Press", publishedDate: "2012", …}
1: {title: "How Buildings Learn", subtitle: "What Happens After They're Built", authors: Array(1), publisher: "Penguin", publishedDate: "1995-10-01", …}
...
length: 13
```

Bellow my implementation:

```jsx
const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};
```

If you are not familiar with `reduce()` I definitely encourage you to check out [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) documentation.

After solving this data structure problem I have created a new problem: How to loop through this new object?

```js
{currentlyReading: Array(6), wantToRead: Array(4), read: Array(3)}
currentlyReading: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
read: (3) [{…}, {…}, {…}]
wantToRead: (4) [{…}, {…}, {…}, {…}]
```

## How to map trough and object

So now I have to be able to `map()` through the above object, however `map()` only can be use in arrays. This is when `Object.keys()` comes handy as I will be able to create the needed array.

```jsx
{
  Object.keys(booksByShelf).map(shelf => {
    return (
      <div key={shelf}>
        <ShelfTitle shelf={shelf} />
        <BookShelf books={booksByShelf[shelf]} onChangeShelf={onChangeShelf} />
      </div>
    );
  });
}
```

If you are not familiar with `Object.keys()` I definitely encourage you to check out [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) documentation.

## Displaying information from an Array

In `Book.js` component I have implemented a `.map()` to display the elements of that authors array as follows:

```js
{
  book.authors &&
    book.authors.map((author, index) => {
      return (
        <p style={{ margin: 0 }} key={index}>
          {author}
        </p>
      );
    });
}
```

While this works, there are better ways to display an array:

```js
{
  book.authors && book.authors.join(" / ");
}
```

Not the same UI result at the moment, but cleaner implementation.

## How to always know the shelf of each given book

A big caveat here: I will assume that you will know how to build a controlled component and here will only address the challenge of always knowing what shelf the book is in.

I have created a `BookSelector.js` that will have state that will be the `shelf` of a given book. At the beginning it will empty, but it will be updated with `componentDidMount()` depending on the `this.props.book.shelf` that I will need to pass down by the parent component.

```jsx
//in BookSelector.js
  state = {
    shelf: ""
  };

  componentDidMount() {
    this.setState({
      shelf: this.props.book.shelf
    });
  }
```

This will be very important so that the selector will start in the accurate position.

Every time that I select a different shelf, the book will be changing it's location on the it will trigger the callback function that will take `book` and `shelf` as arguments to change the database and the overall state of the `App.js` via the `BookAPI.update()`

```jsx
//in App.js
handleBookChangeShelf = (book, shelf) => {
  if (book.shelf !== shelf) {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(books => {
        this.setState({ books });
      });
    });
  }
};
```

> Above, however, I am considering 2 API calls, and to a certain extent I reckon that will be inefficient and will slow down the UI, so I have implemented something different on my project

## The SearchPage implementation

This one was interesting as I needed to think about how to solve for 2 problems:

1. How will the search be done as the user is typing, and not by submitting the query
2. If the book the user is searching is already on one of my shelf's, the user should know that

### Real time search

Actually easier than I expected, you have to implement the API call on the `onChange` handler that you will implement. My implementation as follows:

```jsx
// in SeachPage.js
state = {
  search: "",
  books: "",
  myBooks: ""
};

handleChange = e => {
  const { value } = e.target;
  const { search } = this.state;
  const { myArchive } = this.props;

  this.setState(prevState => ({
    ...prevState,
    search: value
  }));
  if (search) {
    BooksAPI.search(search).then(books => {
      if (books !== "" && search !== "") {
        this.setState(prevState => ({
          ...prevState,
          books: books,
          myBooks: myArchive
        }));
      }
    });
  } else if (search.length === 0) {
    console.log(search);
    this.setState(prevState => ({
      ...prevState,
      books: ""
    }));
  }
};
```

This implementation is not great because of the ASYNC nature of `this.setState`. Above the API call is being made on the back of `this.state.search` and this will give me a "delay".

As such, I need to search for value directly. You can see this on the `SearchPage.js` component.

### Is the searched Book in any shelf already?

As you can imagine, the reason my state has `myBooks` is that will get me the data from the books that the user already selected so that I can know if they are the same as the ones retrieved from my search.
With this new piece of data I am now able to change the `state` of my selector depending on where the user books are by updating my `componentDidMount()`

```jsx
// in BookSelector.js
componentDidMount() {
    const { book, myBooks } = this.props;
    if (book.shelf === undefined) {
      this.setState({ shelf: "none" });
    }
    if (book.shelf !== undefined) {
      this.setState({
        shelf: book.shelf
      });
    } else {
      myBooks.forEach(b => {
        if (b.id === book.id) {
          this.setState({
            shelf: b.shelf
          });
        }
      });
    }
  }
```

The above works very well when this component gets mounted as it passes the correct information so that I can correctly update the state of my `BookSelector.js` component.

However I will be facing a problem every time that the user changes the shelf in this page. `myBooks` props comes from the BooksAPI endpoint and will not be passed with the newly created array that was triggered by the user after the selection of a new shelf.

How can I make sure props are "refreshed"? Bear in mind, given that I want to maintain one single source of truth, I will need to push props every time they change. Enter `componentDidUpdate()`

```jsx
 componentDidUpdate(prevProps) {
    const { book, myBooks } = this.props;
    if (JSON.stringify(myBooks) !== JSON.stringify(prevProps.myBooks)) {
      if (book.shelf === undefined) {
        this.setState({ shelf: "none" });
      }
      if (book.shelf !== undefined) {
        this.setState({
          shelf: book.shelf
        });
      } else {
        myBooks.forEach(b => {
          if (b.id === book.id) {
            this.setState({
              shelf: b.shelf
            });
          }
        });
      }
    }
  }
```

This was a little bit an overkiller, but I got to learn a lot. For this component I def could have directly changed the sate at the same time that my callback function was updating my API. For same strange reason at the time I didn't thought about that simple solution... go figure!

I think I cover the most challenging pieces. If you made it thus far I hope you have enjoyed and if you need any help with your project, I am more than happy to help, just ping me line.

If you think this will be helpful so someone you know, just share the post.
