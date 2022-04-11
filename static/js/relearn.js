function relearnInit() {
  // var textArea = document.getElementById("myTextarea");
  // var editor = CodeMirror.fromTextArea(textArea, {
  //   lineNumbers: true
  //   //mode: "htmlmixed"
  // });
  const easyMDE = new EasyMDE({element: document.getElementById('myTextarea')});
  easyMDE.value();
  easyMDE.codemirror.on("change", () => {
      console.log(easyMDE.value());
  });

}
