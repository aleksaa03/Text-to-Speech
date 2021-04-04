var inputText = document.getElementById("text");

var pitch = document.getElementById("pitch");
var rate = document.getElementById("rate");
var volume = document.getElementById("volume");

var speech = new SpeechSynthesisUtterance();
var speechOptions = window.speechSynthesis;

function textToSpeech() {
  speech.text = inputText.value;
  speech.voice = speechOptions.getVoices()[0];
  speechOptions.speak(speech);
}

function options(e, number) {
  var targetValue = e.target.value;
  switch (number) {
    case 0:
      speech.pitch = targetValue;
      pitch.innerHTML = targetValue;
      break;
    case 1:
      speech.rate = targetValue;
      rate.innerHTML = targetValue;
      break;
    case 2:
      speech.volume = targetValue;
      volume.innerHTML = Math.floor(targetValue * 100) + "%";
      break;
  }
}

function pressKey(e) {
  if (e.keyCode == 13) {
    textToSpeech();
  }
}

inputText.addEventListener("keyup", pressKey);
