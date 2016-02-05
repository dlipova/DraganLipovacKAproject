/* */

/* variables for options selected from dropdwown*/
var structureTestSelections; 
var whiteTestSelections; 
var blackTestSelections;

/* variables to contain array of feedback comments*/
var whiteTestText;
var structureTestText;
var blackTestText;

/* Code Mirror content*/
var editorCode;

/* code editor*/
var myCodeMirror = CodeMirror(document.getElementById("editor"), {
  value: "function exampleFunction(){ console.log('Dragan Lipovac submission for KA project')};",
  mode:  "javascript",
  lineNumbers: true
});

/* whenever the user makes changes to the editor - the*/
myCodeMirror.on("change", function(){
   getOptionsSelected();
   getEditorCode();
   updateWhite();
   updateBlack();
   updateStructure();
});

/* gets the options selected */
function getOptionsSelected(){
   whiteTestSelections = $('#whiteTestDropDown option:selected').map(function(a, item){return item.value;});
   blackTestSelections = $('#blackTestDropDown option:selected').map(function(a, item){return item.value;});
   structureTestSelections = $('#structureTestDropDown option:selected').map(function(a, item){return item.value;});
   whiteTestText = $('#whiteTestDropDown option:selected').map(function(a, item){return item.innerHTML;});
   blackTestText = $('#blackTestDropDown option:selected').map(function(a, item){return item.innerHTML;});
   structureTestText = $('#structureTestDropDown option:selected').map(function(a, item){return item.innerHTML;});
}

/* gets current content within editor*/
function getEditorCode(){
   editorCode = myCodeMirror.getValue();
}

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
         createChild(row, "td", "<img src='Hopper-Jumping.png' alt= 'success' style='width:30px; height:30px;'>");
      } else {
         createChild(row, "td", "<img src='OhNoes.png' alt= 'fail' style='width:30px; height:30px;'>");
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
         createChild(row, "td", "<img src='Hopper-Jumping.png' alt= 'success' style='width:30px; height:30px;'>");
      } else {
         createChild(row, "td", "<img src='OhNoes.png' alt= 'fail' style='width:30px; height:30px;'>");
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
   for( var i = 0; i < structureTestSelections.length; i++){
      var pass = checkStructure(editorCode, structureTestSelections[i]);
      var row = createChild(table, "tr");
      var message = structureTestText[i];
      createChild(row, "td", message);
      if(pass){  
         createChild(row, "td", "<img src='Hopper-Jumping.png' alt= 'success' style='width:30px; height:30px;'>");
      } else {
         createChild(row, "td", "<img src='OhNoes.png' alt= 'fail' style='width:30px; height:30px;'>");
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

/* called  to update results when option are changed*/
function updateFromList(){
   getOptionsSelected();
   getEditorCode();
   updateWhite();
   updateBlack();
   updateStructure();
}

/* to initialize the Bootstrap multi-select dropdown*/
$(document).ready(function() {
      //console.log('CodeVerify is working: ' + codeVerify.checkWhite());
        $('#whiteTestDropDown').multiselect({
           numberDisplayed: 1,
           onChange: function(option, checked){
              updateFromList();
           }
        });
        $('#blackTestDropDown').multiselect({
           numberDisplayed: 1,
           onChange: function(option, checked){
              updateFromList();
           }
        });
        $('#structureTestDropDown').multiselect({
           numberDisplayed: 1,
           onChange: function(option, checked){
              updateFromList();
           }
        });
}); 
 