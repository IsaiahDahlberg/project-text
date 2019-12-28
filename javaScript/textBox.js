class textBox {
  constructor() {
    this.texts = [];

    this.appendText = this.appendText.bind(this);
  }

  appendText(text){
    var time = new Date();
    var timeStamp = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + " - ";
    $("#textBlock").append("<p class='textInput'>" + timeStamp + text + "</p>");
    $("#textBlock").scrollTop($("#textBlock").height());
  }
}
