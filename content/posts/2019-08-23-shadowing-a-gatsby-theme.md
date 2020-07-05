---
title: "Shadowing a Gatsby Theme"
date: 2019-08-23
category: "Code"
thumbnail: "../thumbnails/gatsby-logo.png"
tags:
  - blog
  - gatsby
  - react
selected: "no"
---

This is, I hope, one of many posts where I will try to explain the challenges of setting a very simple blog with Gatsby from a newbie perspective.
The purpose of this is to share learnings that hopefully will help anyone that is trying to do something similar, and of course, for me to learn as much as possible.

> A big caveat, this is not, neither intends to be a tutorial, rather a cheat sheet that will enable anyone to solve for similar problems.

# Using Gatsby `gatsby-theme-blog`

Still unclear with the reason why I am using `gatsby-theme-blog` over `gatsby-starter-blog`, but hey, I have chosen that path, probably because of
[this post](https://www.gatsbyjs.org/blog/2019-01-31-why-themes/) from Kyle, and now I am trying to make a couple of changes to the `gatsby-theme-blog` itself
so that I can provide a better experience for anyone reading it.

The theme looks great, it is simple, and it works like a dream.

![my blog before the changes](https://github.com/tiagofsanchez/blog/blob/master/content/images/Shadowing-AfterChanges.gif?raw=true)

Really love the way I can have a toggle that lets users change from into dark and day theme at the UI level. That is just fantastic.

However there are a couple of things are missing, such as:

1. the **timeToRead** detail information is not there;
2. any **tags** or blog posts **categories** (do they even exist?) don't exist;
3. would be great to have a header with the different categories for this blog, that are as follows:
   ✍️ learning to code (front-end-development in React);
   🏃‍ getting outside my comfort zone with running;💡 innovation and fintech related topics; ✈️ travelling with my family;

The above is more like a wish list that I will be working through as I will try to build that into my blog as I learn to code.
So let's start with (1) and see how can we tackle this topic.

## Enter Shadowing

To change something in `gatsby-theme-blog`, you will need to shadow the component of your theme and in my specific case, I will need to shadow `posts.js` file so that you can get the information that you want to in a way that you pass it to you DOM.

You can easily find `posts.js` on on your your file structure `/node_modules/gatsby-theme-blog/src/components/posts.js`. Once you are there, just copy and past it into your theme file structure on the following folder `/src/gatsby-theme-blog/components/`. You should expect to get the following:

```jsx
import React, { Fragment } from "react";
import { Link } from "gatsby";
import { Styled, css } from "theme-ui";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Footer from "../components/home-footer";

const Posts = ({ location, posts, siteTitle, socialLinks }) => (
  <Layout location={location} title={siteTitle}>
    <main>
      {posts.map(({ node }) => {
        const title = node.title || node.slug;
        const keywords = node.keywords || [];
        return (
          <Fragment key={node.slug}>
            <SEO title="Home" keywords={keywords} />
            <div>
              <Styled.h2
                css={css({
                  mb: 1
                })}
              >
                <Styled.a
                  as={Link}
                  css={{
                    textDecoration: `none`
                  }}
                  to={node.slug}
                >
                  {title}
                </Styled.a>
              </Styled.h2>
              <small>{node.date}</small>
              <Styled.p>{node.excerpt}</Styled.p>
            </div>
          </Fragment>
        );
      })}
    </main>
    <Footer socialLinks={socialLinks} />
  </Layout>
);

export default Posts;
```

After that you will need to change the endpoint where you are importing the components from:

```jsx
import Layout from "../../../node_modules/gatsby-theme-blog/src/components/layout";
import SEO from "../../../node_modules/gatsby-theme-blog/src/components/seo";
import Footer from "../../../node_modules/gatsby-theme-blog/src/components/home-footer";
```

You can see that, after making the changes,if you `console.log(posts)`, you will not get the **timeToRead** data point that I wanted, neither anything else to be honest! That is a bit of a problem.

We need to bring that in using GraphQL and do a couple of changes to my newly copied file. As I mentioned the first thing that I need to do is create a query that will bring me that information.

```jsx
const data = useStaticQuery(
  graphql`
    query {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          timeToRead
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
            title
          }
        }
      }
    }
  `
);
```

I have use `sort:` here to make sure that both `posts` and our new variable `data` have the same order. So now that I have 2 data sets, (1) `posts` with all the details of the posts and (2) `data` with **timeToRead**, how can I join them in a way that I could `.map()` them into my JSX?

## Merging data sets in JavaScript

First of all, before thinking about merging any data set, it is good to understand that we will have tow types of that sets, an **ARRAY []** and a **OBJECT {}**.

Actually the `posts` array, will be an array of objects [node:{},node:{},node:{}] and the object will be something like this {nodes:[{},{},{}]}. So we will need to get the newly created `data` object in the same format as the `posts` array.

1. Transforming the object into an array:

```jsx
//this is probably the most difficult way to do it.
const dataToArray = Object.keys(data.allMarkdownRemark.nodes).map(index => {
  let time = {};
  time = data.allMdx.nodes[index];
  return time;
});

//you can just deconstruct your object
const { nodes } = data.allMarkdownRemark;
```

2. Creating a newPosts constant with all the posts:

```jsx
const newPosts = posts.map(({ node }) => {
  let wipPost = {
    ...node
  };
  return wipPost;
});
```

So now we do have 2 arrays like this **[{A},{B},{C}]** and **[{a},{b},{c}]**, so how do we merge them together so we could have this **[{A,a},{B,b},{C,c}]**? If I wanted to get **[{A},{B},{C},{a},{b},{c}]** that would be very simple and I would use the `spread` operator.

However, that is not the case so we will need to do something a little bit different.

3. Merging the newly created data sets:

```jsx
const newData = dataToArray.map((data, index) => {
  let wipData = {
    ...data,
    post: newPosts[index]
  };
  return wipData;
});
```

And that was exactly what I wanted to have.

![my blog after the changes](https://github.com/tiagofsanchez/blog/blob/master/content/images/Shadowing-BeforeChanges.gif?raw=true)

As you can see I did made a couple of changes that are not described in here, but I think you get the gist.

What was also interesting, while I was going through this exercise, was to reflect if this was the best way to make the changes, or should I do them at the `gatsby-theme-blog` level? For now the question remains.

Another afterthought on the back of this are a couple of entries on the wishlist to improve the blog

## The blog wishlist

1. ✅ the **timeToRead** detail information is not there;
2. any **tags** or blog posts **categories** (do they even exist?) don't exist;
3. would be great to have a header with the different categories for this blog;
4. styling topics:
   - bullet points with less space
   - break after the code snippet
   - size of the fonts on code snippet smaller
   - code snippet wider than the body text
   - blockquote with a pink lateral line
   - ...
5. comments "plug in"
6. a form for readers to subscribe;
7. ...

There seems to be a lot of work to do...and lots more to learn.

Cheers! And see you around!
