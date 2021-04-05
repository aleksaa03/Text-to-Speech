var textarea = document.getElementById("text");

var pitch = document.getElementById("pitch");
var rate = document.getElementById("rate");
var volume = document.getElementById("volume");

var speech = new SpeechSynthesisUtterance();
var speechOptions = window.speechSynthesis;

function textToSpeech() {
  speech.text = textarea.value;
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

var borderColor = "#2ecc71";

textarea.addEventListener("focus", function () {
  textarea.style.border = "1.5px solid " + borderColor;
});

textarea.addEventListener("blur", function () {
  textarea.style.border = "1.5px solid #ebe9ed";
});

var colors = [
  {
    name: "green",
    color: "#2ecc71",
    hoverColor: "#27ae60",
  },
  {
    name: "blue",
    color: "#3498db",
    hoverColor: "#2980b9",
  },
  {
    name: "yellow",
    color: "#f1c40f",
    hoverColor: "#f39c12",
  },
  {
    name: "pink",
    color: "#9b59b6",
    hoverColor: "#8e44ad",
  },
  {
    name: "red",
    color: "#e74c3c",
    hoverColor: "#c0392b",
  },
  {
    name: "orange",
    color: "#e67e22",
    hoverColor: "#d35400",
  },
];

function recognizeVoice() {
  var recognition = new webkitSpeechRecognition();

  recognition.onstart = function () {
    textarea.style.border = "1.5px solid " + borderColor;
    textarea.placeholder = "Voice recognition started...";
    textarea.value = "";
    textarea.disabled = true;
  };

  recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    var color = transcript.toLowerCase();

    for (var i = 0; i < colors.length; i++) {
      if (colors[i].name == color) {
        changeColor(colors[i].color, colors[i].hoverColor);
      }
    }

    textarea.style.border = "1.5px solid #ebe9ed";
    textarea.placeholder = "Enter a text...";
    textarea.disabled = false;
    textarea.value = transcript;
  };

  recognition.start();
}

function changeColor(color, hoverColor) {
  var root = document.documentElement;
  root.style.setProperty("--color", color);
  root.style.setProperty("--hover-color", hoverColor);
  borderColor = window.getComputedStyle(root).getPropertyValue("--color");
}

textarea.addEventListener("keyup", pressKey);
