// complexity: O(n)
function sumToNForLoop(n) {
  let sum = 0;
  Array.from({ length: n }, (_, i) => i + 1).forEach((num) => {
    sum += num;
  });
  return sum;
}

// complexity: O(n)
function sumToNRecursive(n) {
  if (n <= 1) return n;
  return n + sumToNRecursive(n - 1);
}

// complexity: O(1)
function sumToNFormula(n) {
  return (n * (n + 1)) / 2;
}

console.log(sumToNForLoop(5));
console.log(sumToNRecursive(5));
console.log(sumToNFormula(5));
