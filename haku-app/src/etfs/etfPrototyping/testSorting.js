// testing sorting

var list = { you: 100, me: 75, foo: 116, bar: 15 };

console.log(Object.keys(list));

let sortedKeys = Object.keys(list).sort((a, b) => list[a] - list[b]);
console.log("sorted keys 1: ", sortedKeys);

const keysSorted = Object.keys(list).sort(function (a, b) {
  return list[a] - list[b];
});
console.log(keysSorted); // bar,me,you,foo
