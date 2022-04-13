//
// var http = 'http';
//
// // ES5
// require([http], function(result){
//     http = result;
// });
function relearnInit() {
  const easyMDE = new EasyMDE({element: document.getElementById('myTextarea')}, spellChecker = false);
  easyMDE.value();
  easyMDE.codemirror.on("change", () => {
      console.log(easyMDE.value());
		var url = "/edit";
		//params = "text=" + easyMDE.value();

	 	const xhr = new XMLHttpRequest();
		xhr.open('POST', '/edit');

		// prepare form data
		let data = "text=" + easyMDE.value();
		// set headers
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		// send request
		xhr.send(data);
	  });

}
function test() {
  document.querySelector("body > div > div.editor-toolbar > button.preview.no-disable").click();
}
