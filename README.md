# Geography Game
**WEB-115 Final Project Proposal**
Student: Jose Antonio Lopez Vera Livia | Repo: `WEB-115_FinalProject_[LopezVeraLivia]`

---

## Overview

This is a web app that prompts images to a user and asks them to pick a point on the map where the city is most likely from. It works like GeoGuesser where you have to select a specific point on the map and the amount of points you win or lose is based on how far your selected place was from the correct answer.

The target audience is anyone who wants to play geoguessr but doesnt want to compare themselves to other players. Essentially playing for the love of the game.

---

## Features

- Creates a new game with zero points and brand new location.
- Specify how many locations you want to have in your game.
- After a set amount of time looking at a location, the website asks for an answer.
- You get points depending on the proximity from your guess to the locations shown.
- Your score is later calculated to come up with a accuracy percentage.
- It uses google maps to display a map for you to scroll through in person mode.
---
## Core Requirements Coverage

| Requirement | Implementation |
|---|---|
| **If Statements & Loops** | The score keeper variables are created using conditionals, as it calculates the distance between the clicked place and the target location. Also, if you a specific amount of time has passed, you will be forced to click somewhere on the map. |
| **Event Listeners** | Click listeners are a big part of the game, as there are buttons and clickable surfaces. The buttons will be listening to clicks in order to continue or quit the game. The entire map will be clickable and the specific part you click will be read and its data will be used to calculate how many points you win.|
| **DOM Element Creation** | There will be a massive screen for the google maps view of the surroundings, and then once you are forced to come up with an answer, a small map will activate and will cover the screen, prompting you to click somewhere. |
| **Classes & Subclasses** | A base location parent class will be created and the specific location displayed will be an instance on the class with it's own target, location in the map where its supposed to be clicked, and the distance between wherever the user clicked and a method of the physical display of how far  your guess was from the actual target.|

---

## DLC — Additional Topics

### Fetch & Public APIs
When a user starts a game and selects the amount of scenes, the game will then fetch the amount of scenes one by one, by getting the API from Google Maps street view, and then will get the point of where the location is and establish it as the target.

---

## Tech Stack

- HTML, CSS, JavaScript
- Google Maps API
- VS Code + GitHub