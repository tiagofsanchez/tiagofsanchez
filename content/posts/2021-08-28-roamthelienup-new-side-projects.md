---
title: "Roam The Lineup, a new side project"
date: 2021-08-28
category: "Life"
thumbnail: "../images/roamthelineup-newmap.png"
tags:
  - roam the lineup
  - project
  - surf
selected: "no"
---

August is a special month for me. 

For several different reasons. Firstly, because I was born in August, secondly because it markets my 8 year anniversary in Singapore - yes time flies by incredibly fast and I have been living in Singapore for 8 years now.

I started to code in August, about 3 years ago and back then I had no idea that I would be able to do anything remotely close that what I am able to do now. Not necessarily to brag or anything like that, but I came a long way.

My new side project is far from perfect, however I have decided that this would be the perfect timing to write about it. The perfect moment to hit the pause button and put some thoughts and share them with everyone. 

There you go, my new side project: [Roam the Lineup](https://www.roamthelineup.com/), a little corner on the internet where I am trying to organize all the the waves in the world, making it easy for surfers to wander where to go next considering seasonality and when they want to surf.

# About Roam the Lineup

Like many other projects out there this one starts with passion. 

I grew up surfing, obsessed about waves, about the next surf trip to my favorite spot, counting the weekdays for the weekend so that I could grab my board and head to the beach. I used to spend hours in forecasting websites and to be honest the inspiration for this project comes from those days, from those same websites, from that extraordinary feeling of roaming around in search for the next wave, the next secret spot. 

Most of these websites and apps are phenomenal and really help the surf community to check forecasting, tide, weather conditions and when one should head to one's favorite surf spot. However, I always felt that the this type of information would be only good for surfers in local communities, for folks that already know the wave and spot and want to know when to head out. Personally I always felt that searching for waves for your future surf trip, depending on the best season and your availability, something rather annoying and most of the current websites aren't necessarily designed to cater for that. 

[Roam the Lineup](https://www.roamthelineup.com/) is all about ease of search, where the user will be able to check the best waves depending on the time of the year he wants to surf and seasonality of the wave itself. Ambition wise, and still a big hypothesis to be tested, I reckon it would be a good value proposition to also help the user with suggestions of places to stay, eventually surfcamps that are relevant for the wave selection the user is looking for.
Needless to say that I am not there yet, but it is ok to have some sort of direction that is not necessarily set in stone and will eventually mature as this project develops.

# How it all started  

What you are currently seeing was build in 4 months, but I guess it started 3 years ago, when I started to learn to code.

From a more practical standpoint it started with will a wireframe study, where I was basically trying to understand how to best offer this information to users, what type of data points would be relevant for users and how should I go about building my backend to support all this. 

![wireframe](../images/roamthelineup-desktop-wireframe-study.png)

**A big caveat**: I did no validation whatsoever and I started to work under my own personal assumptions and generally speaking I would not suggest this approach for a couple of different reasons. To start with, I am not totally sure if there are any other users like me, that would like to have all the waves in the world searchable depending on the time of the year you want to travel and seasonality - I can only assume that I represent a subsection of all the surfers out there... and that at the end of the day my educated guess makes sense. 

Having said that, it is also important to mention that this project, personally speaking, is a bit bigger than just trying to establish product market fit. I wanted to go as deep as I possible can in building something, from putting together a simple design system, to building the backend and putting together the frontend and testing it with users. Needless to say that I am also thinking about what content should be shown, about future integrations that I would need to have in order to make this relevant and meaningful for the surf community.

In short I am not just trying to validate if this is a problem space worth pursuing (and this can be a big mistake), I am however trying to learn more about how every single function plays - or should - it's role in the creation of a product, by doing it. I mean, by literally doing all the things that need to be done to ship something to users. 

# The mindset

Exactly 1 year ago I wrote something [about having a 100 day project mindset](/blog/2020-08-20-about-having-a-100-day-project-mindset), where I refer to the struggle of learning something new and the fact that humans are terrible at it. The psychologist **Herman Eddinghaus** explains this very well and coined this problem the 24hr memory drainage. 

He also proposes a handful of simple solutions to improve learning efficiency, effectively to retain what you just learnt. The mentioned post covers that and I will not go into detail here. But at the end of the day it is clear that any topic, from any field of knowledge, that you study beyond mastery you are likely to remember longer. The catch is that for you to be able to achieve that, you need to put in the work. You need to do, whatever you are trying to do, everyday. It needs to be part of your routine.  

That mindset stuck with me and for the past 4 months I have been working on this side project everyday. Literally every night from the moment I put the kids to bed till 1:00 am.

# Structuring the project


# Small, but important improvements

In the first iteration of the project, the map, I had implemented a search bar where users could search the waves they wanted

![old map](../images/roamthelineup-map.png)

I shared the project with a couple of friends and a lot of them pointed out a couple of functionality problems on that page. Same point out that when pressing the back button, they could not go back to where they previously where. Others mentioned that the search was only useful if they knew the wave, specially because autocomplete was not working. 

After receiving feedback I knew I add to learn how to better manage routing and connecting queries, filters and selections the user passed to the application so that it could actually perform as expected. I also decided to drop the search functionality as this is a very challenging thing to build (will potentially use algolia further down the line).  

Ok, so it seemed that I needed to totally re due this page and as always I started to play with figma and came up with the following wireframed. 

![newmap wireframe](../images/roamthelineup-newmap-wireframe.png)


![old map](../images/roamthelineup-newmap.png)

# Mistakes and learnings

# What to do next

# Parting words

