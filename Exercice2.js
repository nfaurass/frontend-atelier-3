function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

function numbersFunction(numbers) {
  return numbers.map(factorial);
}

const numbers = [1, 3, 4];

const numbersResult = numbersFunction(numbers);

console.log(numbersResult);