var inputText = document.getElementById("text");

if ("speechSynthesis" in window) {
  function textToSpeech() {
    var speech = new SpeechSynthesisUtterance();
    var speechOptions = window.speechSynthesis;
    speech.text = inputText.value;
    speechOptions.speak(speech);
  }
}

function pressKey(e) {
  if (e.keyCode == 13) {
    textToSpeech();
  }
}

inputText.addEventListener("keyup", pressKey);
