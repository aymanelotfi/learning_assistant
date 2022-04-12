//
// var http = 'http';
//
// // ES5
// require([http], function(result){
//     http = result;
// });
function relearnInit() {
  var http = "http";
  require([http], function(result){
      http = result;
  });

  // var textArea = document.getElementById("myTextarea");
  // var editor = CodeMirror.fromTextArea(textArea, {
  //   lineNumbers: true
  //   //mode: "htmlmixed"
  // });
  const easyMDE = new EasyMDE({element: document.getElementById('myTextarea')});
  easyMDE.value();
  easyMDE.codemirror.on("change", () => {
      console.log(easyMDE.value());
		var url = "/edit";
		//params = "text=" + easyMDE.value();

	 	const xhr = new XMLHttpRequest();
		xhr.open('POST', '/edit');

		// prepare form data
		let data = easyMDE.value();
		// set headers
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		// send request
		xhr.send(data);
		// Send the proper header information along with the request
	//	http.setRequestHeader("text/html; charset=UTF-8", "application/x-www-form-urlencoded");
	//	http.setRequestHeader("Content-length", params.length);
		// http.setRequestHeader("Connection", "close");
		
	  });

}
