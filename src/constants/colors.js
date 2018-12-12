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

const randomizeColours = array => {
  let currentIndex = array.length;
  let temp;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
};

const randomColours = () => {
  return randomizeColours(colours);
};

export default randomColours;
