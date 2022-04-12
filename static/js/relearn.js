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
		var params = "text=" + easyMDE.value();
		http.open("POST", url, true);

		// Send the proper header information along with the request
		http.setRequestHeader("text/html; charset=UTF-8", "application/x-www-form-urlencoded");
		http.setRequestHeader("Content-length", params.length);
		// http.setRequestHeader("Connection", "close");

		http.onreadystatechange = function() {// Call a function when the state changes.
			if(http.readyState == 4 && http.status == 200) {
				alert(http.responseText);
			}
		}
		http.send(params);
  });

}
