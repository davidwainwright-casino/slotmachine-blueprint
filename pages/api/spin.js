/* Symbol dictionary:
   Each letter signifies a symbol
*/
const letters = 'ABCDEFGHIJKLMNOP';

const selectRandomLetter = () => {
  return new Promise((resolve) => {
    const letterIndex = Math.floor(Math.random() * letters.length);
    const letter = letters[letterIndex];
    resolve(letter);
  });
}

export default async function handler(req, res) {
  let results = "";
  let firstLetter = "";
  let secondLetter = "";
  let thirdLetter = "";
  let threeInARow = true;

  // Select the first random letter
  await selectRandomLetter()
    .then((letter) => {
      results += letter;
      firstLetter = letter;
    })

    /* Select the second random letter.
       If it does not match the first,
       declare that the result is not three in a row
    */
    .then(selectRandomLetter)
    .then((letter) => {
      results += letter;
      secondLetter = letter;
      if (secondLetter !== firstLetter) {
        threeInARow = false;
      }
    })

    /* Select the third random letter.
       If it does not match the second,
       declare that the result is not three in a row
    */
    .then(selectRandomLetter)
    .then((letter) => {
      results += letter;
      thirdLetter = letter;
      if (thirdLetter !== secondLetter) {
        threeInARow = false;
      }
    });

  // Return the results
  res.status(200).json({ results, threeInARow })
}