const simulatorSize = {
  "iphone SE": {
    w: 320,
    m: 2,
    h: 568
  },
  "iphone 8": {
    w: 375,
    h: 667,
    m: 2
  },
  "iphone 8 plus": {
    w: 414,
    m: 2,
    h: 736
  },
  "iphone X": {
    w: 375,
    h: 812,
    m: 2
  }
};
const simulatorSizeNameSelectInput = Object.keys(simulatorSize).map(_ => ({
  value: _
}));

export { simulatorSize, simulatorSizeNameSelectInput };
