---
title: "My digital garden as a gatsby theme: gatsby-theme-tfs"
date: 2021-01-25
category: "Code"
thumbnail: "../thumbnails/logo.png"
tags:
  - gatsby-theme-tfs
  - gatsby
  - theme
selected: "no"
---

I have been building my digital garden over the past year and recently have been moving this under a gatsby-theme. In this case 2 gatsby-themes. 

- For my data I have -> [gatsby-theme-acmeblog-data](https://www.npmjs.com/package/gatsby-theme-acmeblog-data)
- For my style I have -> [gatsby-theme-tfs](https://www.npmjs.com/package/gatsby-theme-tfs)

And the content is all kept in my current [git repository](https://github.com/tiagofsanchez/tiagofsanchez) while using Netlify as my CDN.  

This separation of concerns makes sense for me. When I am writing something I am doing it in `md` or `mdx`, I keep everything in one place with very limited code and styling considerations. In short I am trying to keep code distractions to the minimum only to consider them when I need to create richer components and render them in `mdx`.

# Starting with gatsby-theme-tfs

Let's say you would like to start from scratch, you could probably start with a normal gatsby-starter such as `gatsby-starter-hello-world`.

```cli
gatsby new my-gatsby-project https://github.com/gatsbyjs/gatsby-starter-hello-world
```

After, with yarn you could install the theme. 

```cli
yarn add gatsby-theme-tfs
```

Before you actually check out what happen to you new project, it will be important to check 

# The options for your theme

There is a considerable amount of things for you to consider 

| key      |  default value| 
|----------|-------------|
| `blogPath` |  `/blog` | 
| `postsContentPath` |    `content/posts`   |  
| `postsContentThumbnail` | `content/thumbnail` |   
|`pagesContentPath`| `content/pages`| 
|`otherImagesContentPath`| `content/images` | 
|`tagsPath`| `/tags`|
|`categoryPath`|`/category` |
|`postTableOfContents`|`false`|
|`gardenStartYear`| `2019`|


In `gatsby-config.js` you will be able to define the options that you want for your theme.

```js
module.exports = { 
  plugins: [
    {
      resolve: "gatsby-theme-tfs",
      options: { 
        blogPath: "/anything", // the default will be /blog
        tagsPath: "/mytags", // the default will be /tags
        categoryPath: "/mycategory", // the default will be /category
        postsContentPath: "myblog/posts", // the default will be content/posts
        pagesContentPath: "myblog/pages", // the default will be content/pages
        otherImagesContentPath: "mysuperimages", // the default will be images
        postTableOfContents: true //the default is false
        gardenStartYear: 2021 // the default will be 2019
      }
    },
  ],
};

```





Hope this was useful. 

