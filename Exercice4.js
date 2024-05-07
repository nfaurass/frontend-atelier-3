function trouverNombreMaximum(numbers) {
  return numbers.reduce((acc, num) => acc > num ? acc : num);
}

const numbers = [1, 7, 10, 9, 8];

const maxNumber = trouverNombreMaximum(numbers);

console.log(maxNumber);