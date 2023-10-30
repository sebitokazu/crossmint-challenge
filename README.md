# Create Your Own Megaverse

## Author: Sebastian Itokazu

Solution to the coding challenge by [Crossmint](https://challenge.crossmint.io/)

## Challenge Description

Welcome to our Crossmint coding challenge, in which you will help us mint a new megaverse into existence!

Megaverses are 2D spaces comprised of combinations of different astral objects: 🪐POLYanets with 🌙SOLoons around them and ☄comETHs floating around.

Your job as the master of the megaverse will be to create one with some given parameters and shapes. You will use a megaverse creator API to help you with such legendary quest.

The challenge is composed of 2 phases. In the first one you will learn how to interact with the API and create some 🪐POLYanets and validate them. In the second one you will create a bigger megaverse with some peculiar shape.


## Requirements

- Node v20
- Package manager such as npm, yarn or pnpm
- Candidate ID

## Installation

1. Clone the repository
2. Duplicate .env.example, name it just .env and populate with your corresponding CANDIDATE_ID
3. Run `yarn install (or equivalent)` to install the dependencies

## Running

Run

```sh
$> yarn dev [OPTION]
```

where OPTION can be as follows:

- If the argument is `goal`, it calls the getGoalMap() function from the megaverseApi object and logs the result to the console.
- If the argument is `1`, it calls the phase1() function.
- If the argument is `2`, it calls the phase2() function.
- If the argument is `help`, it logs a message to the console with the available phase options.

---