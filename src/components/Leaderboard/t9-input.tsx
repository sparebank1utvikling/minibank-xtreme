import React from "react";

var lastUpdate = {
  counter: -1
};

/*$(document).ready(function() {
  var longPress = {};
  var resultArea = $("#result");
  $("#phone").find("button")
    .mouseup(function(event) {
      var button_pressed = $(event.currentTarget).data("value");
      if (longPress.is) {
        resultArea.val(resultArea.val() + button_pressed);
        longPress = {};
      } else {
        resultArea.val(t9(resultArea.val(), button_pressed));
      }
      clearTimeout(longPress.timer);
    })
    .mousedown(function(event) {
      longPress.timer = setTimeout(function() {
        longPress.is = true;
      }, 500);
    });
})*/


const handleT9inputs = (button_pressed: React.KeyboardEvent) => {

}


export function t9(text: string, button_pressed: React.KeyboardEvent) {

  var lastUpdate = {
    counter: -1,
    now: 0,
    button_pressed: ''
  };

  var currentTime = Date.now();
  var toEmbedText = getEmbedText(button_pressed.key);


  var shouldChange = (): boolean => {
    return currentTime - lastUpdate.now < 500 && lastUpdate.button_pressed === button_pressed.key && !isNonAlpha(button_pressed.key);
  }

  console.log("last update: " + JSON.stringify(lastUpdate))

  console.log("shouldChange: " + shouldChange())

  if (shouldChange()) {
    text = text.slice(0, -1);
    if ((lastUpdate.counter && lastUpdate.counter > 3) || !toEmbedText[lastUpdate.counter]) {
      lastUpdate.counter = -1;
    }
    lastUpdate.counter++;
  } else {
    lastUpdate.counter = 0;
  }

  lastUpdate.now = currentTime;
  lastUpdate.button_pressed = button_pressed.key;

  console.log((text + (toEmbedText[lastUpdate.counter] || toEmbedText[0])))
  return (text + (toEmbedText[lastUpdate.counter] || toEmbedText[0]));
}

// Sets based on pressed button
// instead of directly fetching from dom
export function getEmbedText(key: string):string {
  var toEmbedText = '';
  switch (key) {
    case '1':
      toEmbedText = '.,!';
      break;
    case '2':
      toEmbedText = 'abc';
      break;
    case '3':
      toEmbedText = 'def';
      break;
    case '4':
      toEmbedText = 'ghi';
      break;
    case '5':
      toEmbedText = 'jkl';
      break;
    case '6':
      toEmbedText = 'mno';
      break;
    case '7':
      toEmbedText = 'pqrs';
      break;
    case '8':
      toEmbedText = 'tuv';
      break;
    case '9':
      toEmbedText = 'wxyz';
      break;
    case '*':
      toEmbedText = '*';
      break;
    case '0':
      toEmbedText = '0';
      break;
    case '#':
      toEmbedText = '#';
      break;
  }
  return toEmbedText;
}

export function isNonAlpha(button_pressed: string) {
  return button_pressed === '*' || button_pressed === '0' || button_pressed === '#';
}
