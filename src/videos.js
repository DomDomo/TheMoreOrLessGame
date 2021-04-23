const Cicada = require("./images/3301.jpg");
const Roomba = require("./images/Roomba.jpg");
const Fallout = require("./images/76.jpg");
const IsShe = require("./images/Is_She.jpg");

const mainVids = [
  {
    name: "Cicada 3301: An Internet Mystery",
    views: 23984345,
    image: Cicada.default,
    showViews: true,
    leftSide: true,
  },
  {
    name: "The Roomba That Screams When it Bumps Into Stuff",
    views: 21460437,
    image: Roomba.default,
    showViews: false,
    leftSide: false,
  },
  {
    name: "The Fall of 76",
    views: 25250766,
    image: Fallout.default,
    showViews: false,
    leftSide: false,
  },
  {
    name: "Casually Explained: Is She Into You?",
    views: 16012073,
    image: IsShe.default,
    showViews: false,
    leftSide: false,
  },
];

export { mainVids };
