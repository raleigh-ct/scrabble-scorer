// Refer to the online book to access detailed instructions for this project.
const input = require('readline-sync');

// URL = https://education.launchcode.org/intro-to-professional-web-dev/assignments/scrabble-scorer.html

/* ***** Code your transform function here: ***** */

function transform(obj) {
//Initialize placeholder/accumulator object
let newObject = {}; 

// for...in loop to iterate through each property in "obj" 
for (let letterSet in obj) {
  // for loop to iterate through each array value (letter) tied to property 
  // I don't understand why the below worked but i<letterSet.length returned length of property KEY, not length of property VALUE. for (i=0; i<letterSet.length; i++)
  for (i=0; i<[obj[letterSet].length]; i++) {
    // Add (value as new key in lowecase) and (value is previous key)
    newObject[obj[letterSet][i].toLowerCase()] = Number(letterSet);
  }
  }
return newObject;
}

// test
// console.log(transform(oldPointStructure));


/* ***** Code your initialPrompt function here: ***** */

function initialPrompt() {
  return input.question(`Welcome to the Scrabble score calculator!

Which scoring algorithm would you like to use?

0 - Scrabble: The traditional scoring algorithm.
1 - Simple Score: Each letter is worth 1 point.
2 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt.

Enter 0, 1, or 2: `);
}

// console.log(initialPrompt());

/* ***** Code your runProgram function here: ***** */

function runProgram(scoreArr) {
  // Assign variable to scoring array
  let scoreOpt = initialPrompt();
  // loop until valid array entry received
  while (scoreOpt !== '0' && scoreOpt !== '1' && scoreOpt !== '2') {
    scoreOpt = input.question("\n" + `Invalid response. Enter 0, 1, or 2: `);
  } 
// acknowledge valid selection
  console.log("\n" + "Using algorithm: " + scoreArr[scoreOpt].name);
  
 let word = '';
  
  //loop input for word looking for insensitive STOP
  while (word.toLowerCase() !== 'stop') {
  word = input.question("\n" + "Enter a word to be scored or 'Stop' to quit: ");
  //if anything other than STOP, use word as variable for scoring function 
  if (word.toLowerCase() !== 'stop') {
    console.log(`Score for '${word}': ${scoreArr[scoreOpt].scoreFunction(word)}
  `);
  } else {
    console.log("\n" + `Thanks for using the Scrabble score calculator!`);
  }
  } return '';
}



// Here is the oldPointStructure object:
const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};



/* ***** Use the transform function to create the newPointStructure object here: ***** */

newPointStructure = transform(oldPointStructure);

// test
// console.log(newPointStructure);



/* ***** Create your scoringAlgorithms array here: ***** */
let simpleScoreObj = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoreFunction: function(word) {return simpleScore(word)}
};

let bonusVowelsObj = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoreFunction: function(word) {return bonusVowels(word)}
};

let scrabbleScoreObj = {
  name: "Scrabble",
  description: "The traditional scoring algorithm",
  scoreFunction: function(word) {return scrabbleScore(word)}
};

let scoringAlgorithms = [scrabbleScoreObj, simpleScoreObj, bonusVowelsObj];

// test object property types
// console.log(scrabbleScoreObj);
// console.log("algorithm name: ", scoringAlgorithms[2].name);
// console.log("scoreFunction result: ", scoringAlgorithms[2].scoreFunction("JavaScript", newPointStructure));




function simpleScore(word) {
  // set accumulator
  let sScore = 0;
  // case sensitive, so convert input to lower case
  word = word.toLowerCase();

  // loop through each letter
  for (i=0; i<word.length; i++)
  // do not add to point accumulator if "blank"
  if (word[i].includes(' ')) {
    sScore += 0;
    // for each non-blank index, add 1 point
  } else {
    sScore += 1;
  } return Number(sScore);
}

// test 'elePhant a' should equal 9
// console.log(simpleScore('elePhant a'));


function bonusVowels(word) {
  // set accumulator
  let bwScore = 0;
  // case sensitive, so convert input to lower case
  word = word.toLowerCase();
  
  // loop through each letter and return 2 for vowel
  for (i=0; i<word.length; i++) {
    if (word[i].includes('a') || word[i].includes('e') || word[i].includes('i')|| word[i].includes('o')|| word[i].includes('u')) {
      bwScore += 3;
      // else return 1 (as everything else should be consonant)
    } else if (word[i].includes(' ')) {
      bwScore += 0;
    } else {
      bwScore += 1;
    }
    
}return Number(bwScore);
}

// test 'elePhant a' should equal 17
// console.log(bonusVowels('ElEphanT A'));

function scrabbleScore(word) {
  // set accumulator
  let scrabScore = 0;
  // case sensitive, so convert input to lower case
  word = word.toLowerCase();
  // create placeholder to reference in object for each property (letter)
  let letter;

  for (i=0; i<word.length; i++) {
    // loop through each letter and award 0 points for "blanks"
    if (word[i].includes(' ')) {
      scrabScore += 0;
    } else {
      // assign "letter" variable to letter in word to access point value   
    letter = word[i];
    scrabScore += Number([newPointStructure[letter]]);
    }
  } return Number(scrabScore);
}




// test 'KaYaK TeSt' should equal 20
// console.log(scrabbleScore('KaYaK TeSt'));



/* ***** Call the runProgram function here: ***** */

console.log(runProgram(scoringAlgorithms));