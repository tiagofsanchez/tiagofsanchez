require("dotenv").config()
module.exports = {
  siteMetadata: {
    siteTitle: `tiagofsanchez`,
    siteTitleAlt: `Simple Blog - @tiagofsanchez/gatsby-theme-acmeblog`,
    siteHeadline: `Simple Blog - Gatsby Theme from tiagofsanchez`,
    siteUrl: `https://www.tiagofsanchez.com/`,
    siteDescription: ` Learning tech, writing about it and putting ✒️'pen to paper' on stuff that I like to do and think about!`,
    siteLanguage: `en`,
    siteImage: `./images/logo.png`,
    author: `tiagofsanchez`,
    navigation: [
      {
        title: `Me`,
        slug: `/about`,
      },
      {
        title: `Articles`,
        slug: `/blog`,
      },
    ],
    
  },
  plugins: [ 
    {
      resolve: "gatsby-theme-tfs",
      options: {
        githubUrl: "https://github.com/tiagofsanchez/tiagofsanchez/blob/master/", 
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`, 
      options: { 
        trackingId: process.env.GATSBY_GOOGLE_ID,
      }
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
