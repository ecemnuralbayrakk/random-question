var fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

var newArray = [];
var newArrayInArray = [newArray];

function readFile() {
  var file = fs.readFileSync("questions.txt").toString().split("\n");
  for (let i = 0; i < file.length; i += 1) {
    file[i] = file[i].slice(0, file[i].length - 1);
  }
  return file;
}
// 25 uzunuluguda array dondurecek (5 ask)
function shuffleTheQuestions(array) {
  // 0, 5, 10... asklar
  // 1, 6, 11... userreplylar
  // 2 3 4, 7 8 9, 12 13 14 ... yanlış
  var j = 0;
  for (let i = 0; i < array.length / 5 - 1; i += 1) {
    newArrayInArray[i] = [
      array[j],
      array[j + 1],
      array[j + 2],
      array[j + 3],
      array[j + 4],
    ];
    j += 5;
  }
  return shuffle(newArrayInArray);
}


function shuffle(array) {
  let currentIndex = array.length;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
const delay = (ms) => {
  const startPoint = new Date().getTime()
  while (new Date().getTime() - startPoint <= ms) {/* wait */}
}
function askQuestion(array) {
  let wrongAnswer = 0;
  let questionText = array[0];
  let correctAnswer = array[1];

  var options = [];
  for (let i = 1; i < array.length; i++) {
    options.push(array[i]);
  }
  options = shuffle(options);

  console.log(questionText);

  for (let i = 0; i < options.length; i++) {
    console.log(String.fromCharCode("A".charCodeAt(0) + i) + ") " + options[i]);
  }

  let userreply = prompt("Şıkkı giriniz: ");
  let assci = userreply.charCodeAt(0);
  if (
    (assci >= "E".charCodeAt(0) && assci <= "Z".charCodeAt(0)) ||
    (assci >= "e".charCodeAt(0) && assci <= "z".charCodeAt(0))
  ) {
    console.log("Girdiğiniz şık seçenekler arasında mevcut değildir.");
  }

  for (let i = 0; i < options.length; i++) {
    if (assci == "A".charCodeAt(0) + i || assci == "a".charCodeAt(0) + i) {
      userreply = options[i];
      if (correctAnswer == userreply) {
        console.log("Doğru cevap");
        // 3000 milisaniye = 3 saniye
      } else {
        console.log("Yanlış cevap");
        wrongAnswer = 1;
      }
    }
  }
  delay(3000);
  console.log();
  return wrongAnswer;
}
// boolean dondurecek

var list = readFile();
newArray = shuffleTheQuestions(list);
var joker = 2;
if (newArray.length > 5) {
  let wrongAnswer = 0;
  for (let i = 0; i < 5; i++) {
    let situation = askQuestion(newArray[i]);
    wrongAnswer += situation;
    if (wrongAnswer >= 3) {
      console.log("Yanlış yapma hakkınız bitti");
      break;
    }
  }
}
