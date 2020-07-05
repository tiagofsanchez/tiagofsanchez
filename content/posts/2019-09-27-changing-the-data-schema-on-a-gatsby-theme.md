---
title: "Changing the data schema on a gatsby theme"
date: 2019-09-27
category: "Code"
thumbnail: "../thumbnails/gatsby-logo.png"
tags:
  - blog
  - gatsby
  - data schema
publish: "yes"
---

In this post I intend to go through how could you change the data scheme of your gatsby theme, however I will not be doing it here, but rather only explaining the concept. As a result, I understand that this title could be a little bit misleading, so apologies for that.

Now that we have that out of the way allow me to start. A couple of weeks back, when I started to put together this blog, I had no idea how GatsbyJS worked, neither anything about graphQL, Gatsby starters, let alone Gastby themes. I was fascinated about Gatsby's flexibility, speed and interoperability as I tried to describe in one of my [posts](https://tiagofsanchez.netlify.com/2019-08-22-blogSeries-why-a-blog/).

After setting up my blog using `gatsby-theme-blog` I was intrigued on how could I change aspects of my components, such as UI and data that is passed to them, but still leveraging the theme itself. That was when I came across the concept of [theme shadowing](https://tiagofsanchez.netlify.com/2019-08-23-blogSeries-shadowing-a-gatsby-theme/blogSeries-shadowing-a-gatsby-theme/).

My solution and implementation to passing data into any given component is not the best as I am using `useStaticQuery` in any component that I want to change the data structure. This, by the way, only happens if you want to increase the information detail that you would like to provide to your user.

From a conceptual stand point, I should be separating the data structure of my site and the UI aspect of it as this clearly splits both concepts and it also could be very helpful if you are working in a team where some prefer to work on the site data structure and others on the UI aspect of your site.

# There are 2 forms of shadowing (not really)

After reading Chris Biscardi posts ([post 1](https://www.christopherbiscardi.com/post/component-shadowing-in-gatsby-child-themes/) and [post 2](https://www.gatsbyjs.org/blog/2019-01-29-themes-update-child-theming-and-component-shadowing/)) on component shadowing I came to the conclusion that there are effectively, for the `gatsby-theme-blog`, two themes. One is the parent and another one is the child theme. If you look in `node_modules`, this is what you will see:

```text

├── _gatsby-theme-blog
    ├── _src
        ├──_components
        └──_gatsby-plugin_theme-ui
        └──_gatsby-theme-blog-core
        .
├── _gatsby-theme-blog-core
    ├── _src
        ├──_components
        └──_templates
        .

```

In `gatsby-theme-blog-core` you will find the data model / structure of the site whereas in `gatsby-theme-blog` you will only find the UI supercharged with the `theme-ui` plug in so that you can style at scale.

What is also interesting, as per Chris Biscardi posts, is that when themes where first launched the shadowing feature was only applied to `src/theme/components` however now, given the way people started to use it, it was made available to `src`.

> In theory I should be able to change the data structure of my blog across all components if I am able to shadow `gatsby-theme-blog-core`, however I will need to be aware of the implication of those changes across all components as the structure of my data object could be completely different

Despite the fact that only now I am able to grasp that concept (yes, I know it took me quiet a bit of time) I am still going to fall back on my not so ideal implementation. This will be just for now and in the future I am planning to change the data structure of my blog by changing the appropriate folder and keep the UI vs data structure abstraction that this theme has by design.

If you are reading this now and you haven't committed to inject data into your UI child theme, then you are in the perfect position to implement this the right way. My implementation below is more like a quick fix and not necessarily a robust and logical implementation.

# Pulling data into post component

As I mentioned before, the only reason I am doing this is because I reckon the user will benefit to have access to more information about the blog post itself before starting to read it. A couple of more details, such as **timeToRead**, and information that I would be using on the **frontmatter** of my md files will be important from the reader standpoint.

```
---
title: Changing the data scheme on your gatsby theme
date: 2019-09-27
tags: ["blog","gatsby", "categories"]
categories: "Coding"
---

```

As you can see, ang if you compare this **frontmatter** with the md example files that you will find in `gatsby-theme-blog`, you will notice that I have added **tags** and **categories**. What is fantastic about this is that now you can query this data using graphQL.

Now that I have new and fresh data in my **frontmatter** I can query it using graphQl so that I can render it in my DOM my component is mounted. Let's check the example of `post` and how I will now render **categories** and **timeToRead** together with the title of the post.

So first things first, bellow you can find the graphQl query that I will be using, bearing in mind that I am adding this pieces of code into a the same `post` component that I copied from child theme `gatsby-theme-blog`:

```jsx
const data = useStaticQuery(
  graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          timeToRead
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
            title
            categories
            tags
            title
          }
        }
      }
    }
  `
);
```

Great, now I have all that data in the `post` component, so what should I be passing into my component return()? I mean, the above query will give all the data in my newly created **data** constant. Well to solve this I have created a new array that will only have the information that I wanted for that particular post **title**.

```jsx
const postData = [];

const { nodes } = data.allMarkdownRemark;

nodes.forEach(node => {
  const { timeToRead } = node;
  const { title } = node.frontmatter;
  const { categories } = node.frontmatter;
  if (post.title === title) {
    postData.push({
      postTitle: title,
      timeToRead: timeToRead,
      categories: categories
    });
  }
});
```

To make it more interesting and also passing some emoji's into my **categories** as follows:

```jsx
const catgIcons = [
  { name: "Coding", icon: "✍️" },
  { name: "Innovation", icon: "💡" },
  { name: "Travel", icon: "✈️" },
  { name: "Grit", icon: "🏃‍" }
];

catgIcons.forEach(catg => {
  if (catg.name === postData[0].categories) {
    postData.push({
      icon: catg.icon
    });
  }
});
```

Perfect! now that I have my newly created array, I just need to inject this into the render() of my `post` component. Bellow you can see how I am solving for that:

```jsx
<Styled css={css({ mb: `5px` })}>
            {post.date} | {postData[0].timeToRead} minute(s) reading time
          </Styled>
          <Styled
            css={css({
              color: `primary`,
              border: `solid 1px`,
              boxSizing: `content-box`,
              display: `inline-block`,
              px: `4px`,
              borderRadius: `5px`,
            })}
          >
            {postData[1].icon} {`  `} {postData[0].categories}
          </Styled>
```

This works fine, but as I am going through this I have to ask my self 1 question: Do I really need to do all this data manipulation in JavaScript, or could I do that on my graphQL query on the beginning? Surely there is a way to make the only pull the **frontmatter** of the post that I want and not all of them. This is definitely something that I will need to work on.

That is all for this post! See you around.
