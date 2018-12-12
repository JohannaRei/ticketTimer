const colours = [
  '#fc9977',
  '#fcbd90',
  '#fae6aa',
  '#f7f6a6',
  '#a3d96a',
  '#80d99b',
  '#57cfc9',
  '#51c0db',
  '#70a5d4',
  '#6d74cf',
  '#584478',
  '#8459c9',
  '#be57c2',
  '#de76a5'
];

const randomColour = () => {
  const colour = colours[Math.floor(Math.random() * colours.length)];
  console.log(colour);
  return colour;
};

export default randomColour;
