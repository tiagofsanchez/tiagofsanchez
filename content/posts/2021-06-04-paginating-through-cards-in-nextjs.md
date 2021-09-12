---
title: "Paginating through cards in NextJS not changing the url"
date: 2021-06-05
category: "Code"
thumbnail: "../thumbnails/nextPagination.png"
tags:
  - nextjs
  - pagination
  - learning
selected: "no"
---

I came across the need to render a certain number of cards, that would grow over time, in a static generated NextJS project and thought about designing a method that would help me to paginate through that array.

This post tries to explain how to implement that.

# Paginating through my array

The first thing that I needed to do was to find a way how to grab a given **array of data**, select the **page** that I am in and the **number of items** I want per page and return back the following very important variables:

- total number of pages
- items per page (input)
- total number of items
- previous page
- next page
- page (input)
- dataPaginated

Let's set up our new function that we will call `paginate`, get the total number of pages depending on the number of items per page and the number of items on our array.

```js:title=paginate.js
export const paginate = (array, page = 1, per_page = 4) => {
  const total_pages = Math.ceil(array.length / per_page);

  return {
    page: page , //returning what we passed
    per_page: per_page , //returning what we passed
    pre_page: ,
    next_page: ,
    total: array.length, //total number of items
    total_pages: total_pages,
    dataPaginated: ,
  };
};

```

Following that we will need to understand how to create an array with the paginate data and for that we will need to do nested slice. And because we are still missing the previous and next page we will be establishing that here as well.

```js:title=paginate.js {2-3,8-9,13}
export const paginate = (array, page = 1, per_page = 4) => {
  const offset = (page - 1) * per_page;
  const paginatedItems = array.slice(offset).slice(0, per_page);
  const total_pages = Math.ceil(array.length / per_page);

  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: array.length,
    total_pages: total_pages,
    dataPaginated: paginatedItems,
  };
};
```

And that is it for your paginate function. You can now stick it in your lib folder and called whenever you need it.

We still need to figure a way to use this new function to paginate through the cards or items that you want and for that we will be using our hooks: `useState` and `useEffect`.

# Using state to store the relevant data

Now imagine that we have a component that will receive an array of elements that you would like to create the pagination for. You would have to receive that array, run `paginate()` function, stick it in our state and render our `dataPaginated`, `pre_page`, `next_page` to be able to flick through the different pages.

That component would look as follows:

```js:title=MyCards.js
export const MyCards = ({ cardArray }) => {
  const [data, setData] = useState();

  const newData = paginate(cardArray);
  useEffect(() => {
    setWaveData({ ...newData });
  }, [cardArray]);

  const prevPage = () => {
    const prevPageData = paginate(cardArray, data.pre_page);
    setWaveData({ ...prevPageData });
  };

  const nextPage = () => {
    const nextPageData = paginate(cardArray, data.next_page);
    setWaveData({ ...nextPageData });
  };

  return (
    <>
      <p onClick={prevPage}>{data?.pre_page}</p>
      <p>
        {waveData?.page} of {data?.total_pages}
      </p>
      <p onClick={nextPage}>{data?.next_page}</p>
      {data.map((card) => (
        <p>{card.name}</p>
      ))}
    </p>
  );
};

```

Next you just need to create your pagination component with the style in the way you fancy.

Hope this was helpful.
x`