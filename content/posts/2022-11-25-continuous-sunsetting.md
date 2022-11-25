---
title: "Continuous sunsetting"
date: 2022-11-25
category: "Product"
thumbnail: "../thumbnails/sunset.png"
tags:
  - outcomes
  - marketplace
  - growth
selected: "no"
---

import { Message } from "theme-ui";

The velocity of today easily will become the legacy of tomorrow.

Companies are, generally speaking, hardwired to deliver, to build as fast as they can, however often fail to realize that the more they build and ship, the more legacy and dependencies they create.

# You need to sunset stuff

If you continue at that rate - only pushing to build new stuff - odds are the you will find yourself in a position that your team will ask for more eng to help manage your legacy and your code base given the dependencies that you created.

On the other hand, every time that you set yourself to build something new on your product you will need to consider all the stuff that your currently have in your product and codebase. For every new build you will need to have more context and that new thing will take more time.

Needles to say that the combination of continuous deployment, without continuous sunseting will create a lot of friction and frustration to your product development lifecycle.

You need to be able to sunset stuff as you go along...

# Your feature sunsetting checklist

The question now becomes, how do you decide what to sunset?

There are a couple of ways to think about that, but as a rule of thumb you should based your decision on the back of the following:

1. **Cost of maintaining**: Are you spending a lot of time and money maintaining that feature? Can you quantify that? Is it more than 10% of your team's time?
2. **Users don't care**: Are users using? What is the percentage of users that actually use that feature?
3. **UX**: It takes users away from the journey and what we wanted to achieve in the first place?
4. **Alignment with strategy**: Does it align with the overall product strategy?
5. **Little noise**: No one will notice, or very few users will give negative feedback about the feature sunsetting.

This exercise should not be done in isolation. Teams need to build a feature sunset assessment cadence.

# Continuous sunsetting

In the same way that we have continuous delivery frameworks it is critical that we also think about sunsetting features in a continuous basis as we aim to improve the product that we are building and the value that we are delivering to users.

Doing this does not mean that the feature that you sunset is gone forever. If we discover something new along the way that makes a strong case for us to revisit a previously sunset feature, we should do it.

Less is often more and so is changing our minds.

<br />
<br />
<Message>
  Please note that these views are my own and might not represent my employer's
  views.
</Message>
