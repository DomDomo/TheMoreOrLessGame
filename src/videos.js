const Cicada = require("./images/3301.jpg");
const Roomba = require("./images/Roomba.jpg");
const Fallout = require("./images/76.jpg");
const IsShe = require("./images/Is_She.jpg");
const iGuess = require("./images/iguess.jpg");
const sharkBlood = require("./images/shark_blood.jpg");

const mainVids = [
  {
    id: 1,
    name: "Cicada 3301: An Internet Mystery",
    views: 23984345,
    image: Cicada.default,
    showViews: true,
  },
  {
    id: 2,
    name: "The Roomba That Screams When it Bumps Into Stuff",
    views: 21460437,
    image: Roomba.default,
    showViews: false,
  },
  {
    id: 3,
    name: "The Fall of 76",
    views: 25250766,
    image: Fallout.default,
    showViews: false,
  },
  {
    id: 4,
    name: "Casually Explained: Is She Into You?",
    views: 16012073,
    image: IsShe.default,
    showViews: false,
  },
  {
    id: 5,
    name: "history of the entire world, i guess",
    views: 122050698,
    image: iGuess.default,
    showViews: false,
  },
  {
    id: 6,
    name: "Testing if Sharks Can Smell a Drop of Blood",
    views: 90286366,
    image: sharkBlood.default,
    showViews: false,
  },
];

export { mainVids };
