var structureTestSelections; var structureTestText;
var whiteTestSelections; var whiteTestText;
var blackTestSelections; var blackTestText;
var editorCode;

var myCodeMirror = CodeMirror(document.getElementById("editor"), {
  value: "function myAwesomeFunction(){ return 3};",
  mode:  "javascript",
  lineNumbers: true
});

myCodeMirror.on("change", function(){
   editorCode = myCodeMirror.getValue();
   whiteTestSelections = $('#whiteTestDropDown option:selected').map(function(a, item){return item.value;});
   blackTestSelections = $('#blackTestDropDown option:selected').map(function(a, item){return item.value;});
   structureTestSelections = $('#structureTestDropDown option:selected').map(function(a, item){return item.value;});
   whiteTestText = $('#whiteTestDropDown option:selected').map(function(a, item){return item.innerHTML;});
   blackTestText = $('#blackTestDropDown option:selected').map(function(a, item){return item.innerHTML;});
   structureTestText = $('#structureTestDropDown option:selected').map(function(a, item){return item.innerHTML;});
   updateWhite();
   updateBlack();
});

/* clears contents of table, creates table header, loops through selected whitelist options, creates table rows based on passing tests */
function updateWhite(){
   var table = document.getElementById("whiteTestFeedback");
   table.innerHTML = "";
   var header = createChild(table, "tr");
   createChild(header, "th", "Requirement");
   createChild(header, "th", "Result");
   for( var i = 0; i < whiteTestSelections.length; i++){
      var pass = checkWhite(editorCode, whiteTestSelections[i]);
      var row = createChild(table, "tr");
      var message = whiteTestText[i];
      createChild(row, "td", message);
      if(pass){  
         createChild(row, "td", "success");
      } else {
         createChild(row, "td", "fail");
      }
   }
}

/* clears contents of table, creates table header, loops through selected blacklist options, creates table rows based on passing tests */
function updateBlack(){
   var table = document.getElementById("blackTestFeedback");
   table.innerHTML = "";
   var header = createChild(table, "tr");
   createChild(header, "th", "Requirement");
   createChild(header, "th", "Result");
   for( var i = 0; i < blackTestSelections.length; i++){
      var pass = checkBlack(editorCode, blackTestSelections[i]);
      var row = createChild(table, "tr");
      var message = blackTestText[i];
      createChild(row, "td", message);
      if(pass){  
         createChild(row, "td", "success");
      } else {
         createChild(row, "td", "fail");
      }
   }
}

/* clears contents of table, creates table header, loops through selected structure options, creates table rows based on passing tests */
function updateStructure(){
   var table = document.getElementById("structureTestFeedback");
   table.innerHTML = "";
   var header = createChild(table, "tr");
   createChild(header, "th", "Requirement");
   createChild(header, "th", "Result");
   for( var i = 0; i < blackTestSelections.length; i++){
      var pass = codeVerify.CheckBlack(editorCode, blackTestSelections[i]);
      var row = createChild(table, "tr");
      var message = structureTestText[i];
      createChild(row, "td", message);
      if(pass){  
         createChild(row, "td", "success");
      } else {
         createChild(row, "td", "fail");
      }
   }
} 

/* function used to dynamically create table headers and rows. the results are in a table below the multiselect dropdown*/
var createChild = function(parent, tag, html, clazz) {
   var element = document.createElement(tag);
      if (html) element.innerHTML = html;
      if (clazz) element.classList.add(clazz);
      if (parent) parent.appendChild(element);
      return element;
};

/* to initialize the Bootstrap multi-select dropdown*/
$(document).ready(function() {
      console.log('CodeVerify is working: ' + codeVerify.CheckWhite());
        $('#whiteTestDropDown').multiselect();
        $('#blackTestDropDown').multiselect();
        $('#structureTestDropDown').multiselect();
}); 
 