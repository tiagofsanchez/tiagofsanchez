module.exports = {
  siteMetadata: {
    siteTitle: `tiagofsanchez`,
    siteTitleAlt: `Simple Blog - @tiagofsanchez/gatsby-theme-acmeblog`,
    siteHeadline: `Simple Blog - Gatsby Theme from tiagofsanchez`,
    siteUrl: `https://vigilant-wiles-515f08.netlify.app/`,
    siteDescription: ` Learning to code, writing about it and putting ✒️'pen to paper' on stuff that I like to do and think about!`,
    siteLanguage: `en`,
    siteImage: `./images/logo.png`,
    author: `tiagofsanchez`,
    navigation: [
      {
        title: `me`,
        slug: `/about`,
      },
      {
        title: `articles`,
        slug: `/blog`,
      },
    ],
    externalLinks: [
      {
        name: `LinkedIn`,
        url: `https://www.linkedin.com/in/tiagofsanchez/`,
      },
      {
        name: `Github`,
        url: `https://github.com/tiagofsanchez`,
      },
    ],
  },

  plugins: [
    {
      resolve: "gatsby-theme-tfs",
      options: {
        postTableOfContents: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `tiagofsanchez`,
        short_name: `tfs`,
        description: `Learning to code, writing about it and putting ✒️'pen to paper' on stuff that I like to do and think about!`,
        lang: `en`,
        start_url: `/?source=pwa'`,
        background_color: `#d23669`,
        display: `standalone`,
        icon: `./content/images/logo.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, `/about` , `/blog`],
      },
    },
  ],
};
