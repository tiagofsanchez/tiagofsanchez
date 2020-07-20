---
title: "Creating my first gatsby starter"
date: 2019-11-13
category: "Code"
thumbnail: "../thumbnails/gatsby-logo.png"
tags:
  - blog
  - gatsby
  - theme
  - starter
selected: "no"
---

I have started this blog a couple of months ago and venture myself into the Gatsby ecosystem. At the time I was fascinated with the concept of `gatsby theme`, and still am, however I have decided to go back to using a `gatsby starter`.

Apparently it was time to give 1 step back in order to give 2 forwards.

# Using a gatsby starter instead

There are a couple of reasons why I have made this decision and I have to say that I learned a lot with this move. Before going through the new learnings, let me try to explain why the change.

To start with I have to admit that I was a little bit frustrated with the fact that I was not able to programmatically create a `tag` and `category` pages for my blog on using `gatsby-theme-blog`. I do have a blog post that explains, from a normal Gatsby site perspective, how to create a [tag page programmatically](https://tiagofsanchez.netlify.com/2019-09-12-blog-series-creating-tag-page-with-gatsby/), however I was not able to build that into my blog.

A `gatsby theme` is an excellent abstraction and I totally see the value of it. Unlike a `starter` you can have more control over anything that you build that is leveraging a `theme` (this is specially true if you own that `theme` and want to maintain consistency across different projects that use that same `theme`). If, let's say, you want to build a blog that has the same look and feel across different projects for your organization, it will be easy to maintain that with a `theme`. A simple change in your `theme` and boom 💥, it changes everything across your different projects. On the other hand, if you use a `starter` it is the same way as forking a repo, it will be a different code base from that moment onwards and that means that it will be painful to maintain.

The other challenge that I had was, less of a challenge now, more of a mistake at the time, but I was not able to properly create a `navMenu` that behaved the way I would wanted to. The intent was to create a header `navMenu` that had not bottom shade when the blog loaded, but that displayed that bottom shadow, once the user scrolled down. I implement that using a class component with state, leveraging the component state to change my UI. For some reason I was not able to do that on `gatsby-theme-blog/components/navMenu.js`... well, I do think this was my mistake and nothing else. What's more, I reckon you can definitely do this with `hooks` if the problem was not being able to transform `navMenu` into a class component with state.

On a more positive note I did all this as a mean to publish my first contribution to the gatsby community and my first [open sourced project](https://github.com/tiagofsanchez/gatsby-tfs-starter) that anyone can actually use... Hurray! Give it a spin and let me know what you think.

# Welcoming gatsby-tfs-starter

My starter styling was in a way inspired by Dan Abramov [blog](https://overreacted.io/) and to build something like that, with the functionalities that I had envisioned, I had to leverage a already existing starter, the [gatsby-advanced-starter](https://www.gatsbyjs.org/starters/Vagr9K/gatsby-advanced-starter/), as I didn't want to start from scratch.

I had to make a couple of changes on that starter as one of the things that I wanted to see there was MDX implemented - now you can have that on [this starter](https://github.com/tiagofsanchez/gatsby-tfs-starter)! After making that change I used `theme-ui` to give it a more opinionated styling and tweaked a couple of things more.

For me the most challenging piece was actually to be able to integrate MDX into the data schema. For that I needed to make a couple of changes on the following files:

- gatsby-node.js, both the graphql query as well as the creation of the mdx and allMdx nodes accordingly;
- all the template components (category.js, post.js and tag.js) needed to be changed to pull in MDX created data;
- both blog.js and index.js as I am rendering the MDX data on those pages.

That is that! I finally published my first Gatsby starter and my first open sourced project. I hope that you used!

See you around!
