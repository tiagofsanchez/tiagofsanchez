---
title: "Designing and implementing a megamenu in my digital garden"
date: 2021-02-12
category: "Code"
thumbnail: "../thumbnails/megamenu.png"
tags:
  - megamenu
  - digital garden
  - design
selected: "no"
---

My digital garden is becoming a bit complicated for anyone to navigate - It was time to implement a better menu to help anyone that stumbles upon my little corner of the internet.

First things first; I needed to venture myself into Figma to try to visualize how my new menu would look like.

# Designing phase

One thing was for sure, the new menu needed to be easy enough to let the user navigate the website as well as providing the most relevant content across the different topics that I normally write about.

Personally I thought it would be important to have a separation between the content / posts and the main pages of the website. With that in mind I decided to create four main columns, the first one where the user will have access to all the main pages of the site and the other ones where the user would have access to the latest posts for that specific topic.

![megamenu](../thumbnails/megamenu.png)

I am also entertaining the idea to have all my projects in the megamenu, however, given that a projects page doesn't exist as of now I am parking this thought for another time.

Do note that the live implementation is not exactly as the one I designed and that is ok as this is my megamenu v.1.0.0. and I will be improving it as I go along and gather more data points around how users interact with it.

# Thinking about the MegaMenu

The `<Header />` component of this theme, that is part of the `<Layout />`, is parent to the `<Navigation />` component that was controlling the navigation on the site as well as the dark / light switch of the theme. For me it made sense to have the `<MegaMenu />` in here.

```jsx:title=navigation.js
const Navigation = () => {
  const [isMegaMenu, setIsMegaMenu] = useState(false);

  const showMenuHandler = () => {
    setIsMegaMenu(!isMegaMenu);
  };

  return (
    <div>
      <nav>
        <IconButton
          aria-label="Menu pop up"
          onClick={showMenuHandler}
          {...props}
        >
          <H5>menu</H5>
        </IconButton>
      </nav>
        {isMegaMenu && <MegaMenu closeMenu={showMenuHandler} />}
    </div>
  );
};

```

Now I could simply focus on building the design of my megamenu on the newly created `<MegaMenu />` component and as a result decided to create 2 different components. The first once would be the `<MegaMenuHero />` that in a way will have the main pages of the digital garden as well as a small hero image. The second component will be the `<MegaMenuPosts />` that will render the latest 4 posts of a given category.

The following problem to solve would be on how to inject the data that I wanted into the menu.

# GraphQL hooks to the rescue

Thankfully gatsby comes with GraphQL under the hood and that is super powerful for a couple of reasons. Right now, because I can easily get the information that I want in the context of the component that I want to render. What's more, I can also create a hook that will abstract that information request and pull that only once a given component is mounted.

```js:title=useAllCategories.js
import { useStaticQuery, graphql } from "gatsby";

const useAllCategories = () => {
  const data = useStaticQuery(graphql`
    {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        group(field: frontmatter___category) {
          fieldValue
          nodes {
            frontmatter {
              title
            }
            slug
          }
        }
      }
    }
  `);
  return data.allMdx.group;
};

export default useAllCategories;

```

This query is essentially grouping all posts under the given categories - in a way mimicking the pivot table function in excel. Now I can inject the data in the proper component to render this to the user.

Now in our `<MegaMenu />` component we will be able to pull that data as follows:

```jsx:title=megamenu
import useAllCategories from "../hooks/useAllCategories";

const MegaMenu = ({ closeMenu }) => {
  const categoriesArray = useAllCategories();

  return (
    <div>
    {...}
    </div>
  );
};

export default MegaMenu;
```

If you want to see more details about the live implementation you can check the [Layout git repo folder](https://github.com/tiagofsanchez/gatsby-themes/tree/master/themes/gatsby-theme-tfs/src/components/Layout).

# Playing with transitions

After all was done and dusted I felt that it would be nice to have a little bit of animation in there.

The good thing was that I have been trying to learn animations for a while now:

- [React animations](/blog/2019-09-06-react-animations/)
- [Al you need to know about transitions](/blog/2021-02-05-all-you-need-to-know-about-transitions/)

This was the perfect place to implement something that I have been learning about.

The first thing to think about is where to implement the `<CssTransition / >` component, so we need to go back to our Navigation component.

```jsx:title=navigation.js {19-27}
const Navigation = () => {
  const [isMegaMenu, setIsMegaMenu] = useState(false);

  const showMenuHandler = () => {
    setIsMegaMenu(!isMegaMenu);
  };

  return (
    <div>
      <nav>
        <IconButton
          aria-label="Menu pop up"
          onClick={showMenuHandler}
          {...props}
        >
          <H5>menu</H5>
        </IconButton>
      </nav>
         <CSSTransition
            in={isMegaMenu}
            timeout={1000}
            mountOnEnter
            unmountOnExit
            classNames="menu"
          >
            <MegaMenu closeMenu={showMenuHandler} />
          </CSSTransition>
    </div>
  );
};
```
Please to bear in mind that we will not go over the all the props in the CSSTransition component as this post is not meant to be about that, but more about the overall approach on how to implement a megamenu.

That out of the way, we need to think how we want our transition to be like and do that we will need to go over same css.

```css
.menu-enter {
  opacity: 0;
  transform: translateY(-200px);
}
.menu-enter-active {
  opacity: 1;
  transform: translateY(0px);
  transition: opacity 0.9s ease-out, transform 0.5s ease-out;
}
.menu-exit {
  opacity: 1;
  transform: translateY(0px);
}
.menu-exit-active {
  opacity: 0;
  transform: translateY(-400px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

```

And that is it, our megamenu is animated!

# What is next for the menu

I def need to have my projects in there so that will be definitely a feature that I will include. However the I will need to create a proper page where all the projects will be rendered.

Taking a step back and as I look to how the menu looks I think it is a little bit to busy, perhaps. It didn't feel like that when I was designing it on Figma, however it surely does once it is implemented with live data being rendered. Dis is something that I need to resolve in the future, probably by changing the font size? Or perhaps by designing dropdown functionality that will only render information once the user wants.

This is certainly work in progress and I will improve the new menu as I go along.

Hope this is useful.

