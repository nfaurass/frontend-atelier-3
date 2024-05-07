function nombresPairsEnOrdre(numbers) {
  return numbers.filter(num => num % 2 === 0).sort((a, b) => a - b);
}

const numbers = [1, 7, 10, 9, 8, 2];

const numbersResult = nombresPairsEnOrdre(numbers);

console.log(numbersResult);