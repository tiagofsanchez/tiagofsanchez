---
title: "AB Testing, the best iterative approach to grow your business"
date: 2022-05-19
category: "Product"
thumbnail: "../thumbnails/ab-testing.png"
tags:
  - ab testing
  - marketplace
  - growth
selected: "no"
---

import { Message } from "theme-ui";

# A/B testing is all about learning

When thinking about A/B testing I always think about hypothesis that I want to prove or disprove, something that I want to learn more about and compare it against what is currently available.

Hence the name, A/B test...

If you currently have traffic and are not performing any A/B testing you are probably not learning from your customer base and that, more often than not, means that you are leaving money on the table and are not building the right things for your users - every day without a test running on a page/layout is money down the drain.

# Think about it like a ~~process~~ program

There are certain steps to consider all the time, and to certain extend if feels like a process:

- Figuring out what to test, with a data driven approach;
- Understanding volume and timelines to consider
- Design the variant and think about the success metrics;
- Setting up the test;
- Doing QA on the test;

Despite the fact that it could feel like a linear process I don't believe that is necessarily like that, it is, or it should be more like a program so that we can create that routine and

# Figuring out what to test, with a data driven approach

This is probably one of the hardest parts of the testing. I mean, where do you start? Some things and places are more important than others, but the difficult piece is figuring out where to start.

You might spend a lot of time and money on experimenting with different headlines, only to conclude that there is no or little difference between them. Worst still, you might be doing that and not making sure that your test is statistical significance and as a result inconclusive.

As a rule of thumb, you should be fixing the biggest leaks on your web application and this is one of the reasons why you should invest time into your discovery process. If you manage to have a better grasp on what to optimize and where you will be setting yourself for success. Conversely, not doing that will waste time and money and generate and opinion based testing approach.

Ok, but how the hell do we figure out the biggest leaks? How do we "prioritized" the test that we would like to drive?

There are a couple of ways to research what would make sense to do:

- Heuristic Analysis (hint -> empirical evidence)
- Technical stuff (hint -> bugs)
- Analytics (hint -> drop-offs)
- Spend time with your customer support team (hint -> they know all the problems, they need to deal with them)

But how many tests can you run? Or better still, how many tests can your team think of that are actually going to drive important learnings to the business as well as generate top-line impact? We discuss the importance of being a research and data drive in order to be able to identify the bigger leaks on your website, but I think that in order to have a holistic approach one will need to involve all team members in a given company.

We need to think this as if it was a program - Your experimentation program. More on that on a latter post.

# Understanding volumes and timelines to consider for your tests

Traffic is important.

Whenever you are trying to A/B test, you will be trying to demonstrate that your **Variant B** (the new approach that will solve your problem) is performing better than the Control (or Variant A).

In order for the experiment to be conclusive, you will need to have statistical significance on your test and for that, there are a couple of things at play:

- The current conversion on the Control Variant (Variant A)
- The potential relative uplift that you are expecting with Variant B
- The volume that you will get on your experiment

Fortunately, you don't need to be a statistical genius to figure all this out for yourself as there are free tools for that. I have been using [AB testeguide](https://abtestguide.com/abtestsize/) to understand how much volume is needed.

As an example, if your current Conversion Rate is 10%, you believe that you can achieve a 15% expected improvement over Control and you think you can get 1000 unique visitors a week - you will need **(a)** a minimal sample size of 5272 or **(b)** run the test duration by 10,54 weeks.

Knowing this will be very important to negotiate traffic with your different teams internally depending on the overall traffic that you are currently getting on the page that you are optimizing for.

# Design the variant and thinking about the success metrics

Now that we know where to test, understand the volume we need, is time start to work on designing the variant based on the hypothesis that we would like to test.

After designing your variant you will likely need to work with the engineering team so it is critical that you think about what you are trying to achieve with your test. Normally the engineering team are overwhelmed so it is important that you have a notion of the success metrics you are looking to achieve with the test.

Personally for every test I run a put a document with the following things together:

- Objective, and what we are trying to achieve;
- Current metrics;
- Assumptions;
- The design;
- Success metrics;
- Requirements;

Depending on the test you may want to add more details into your document, but by and large the above should be detailed enough to kick you off.

With a proper A/B testing framework and with the right tooling in place you can growth your business in a more systematic way.

<br />
<Message>
  Please note that these views are my own and might not represent my employer's
  views.
</Message>
