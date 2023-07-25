function nextSmaller(n: number) {
  const nAsString = n.toString().split('');
}

function findTopThreeWords(text: string) {
  const wordCount = new Map();
  const regex = /^[A-Za-z']+\s*$/;

  // Split the text into an array of words
  const words = text.split(' ');

  // Count the occurrences of each valid word
  words.forEach((word) => {
    if (regex.test(word)) {
      const count: number = wordCount.get(word) || 0;
      wordCount.set(word, count + 1);
    }
  });

  // Sort the word count map by descending order of occurrences
  const sortedWords = Array.from(wordCount.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  // Extract the top three most occurring words or fewer if there are less than three unique words
  let topWords = sortedWords.slice(0, 3).map((entry) => entry[0]);

  if (topWords.length < 3) {
    topWords = topWords.slice(0, 2);
  }

  return topWords;
}

const test = findTopThreeWords(
  'e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e'
);
console.log(test);
function persistence(num, times) {
  //code me
  let result = times || 0;
  let next = 0;
  const numsArr = num.toString().split('');
  for (let i = 0; i < numsArr.length; i++) {
    next *= parseInt(numsArr[i]);
  }
  if (numsArr.length === 1) {
    return result;
  } else {
    return persistence(next, times + 1);
  }
}
