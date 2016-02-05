/* codeVerify.js contains 3 main functions (checkWhite, checkBlack, checkStructure) and returns boolean based on tests 
   defined in the constructDictionary
*/

/* defines the functionality that can be tested - 9 different tests - 3 for white, 3 for black and 3 for structure*/
var constructDictionary = {
   "for" : "ForStatement",
   "varDeclare" : "VariableDeclaration", 
   "declareFunction" : "declareFunction", 
   "noWhileStatement" : "noWhileStatement", 
   "noIfStatement": "noIfStatement", 
   "noDuplicateFunction" : "noDuplicateFunction", 
   "ifInsideFor" : "ifInsideFor", 
   "forInsideFor" : "ForInsideFor", 
   "ifsInsideWhile" : "ifsInsideWhile"
}


/* White Functionality Testing
   given one of three constructs (contains a for loop OR declares a variable OR declares a function and
   the editor code - the function returns a boolean indicating wheter or not the test has passed. 
*/
function checkWhite(code, construct){
   var ast = esprima.parse(code);
   if(construct === constructDictionary.for){
      return containsFor(ast);
   } else if(construct === constructDictionary.varDeclare){
      return containsVarDec(ast);
   } else if(construct === constructDictionary.declareFunction){
      return containsFunctionDec(ast);
   }
}


/* Black Functionality Testing
   given one of three constructs (no while statement OR no if statement OR no duplicate function) and
   the editor code - the function returns a boolean indicating wheter or not the test has passed. 
*/
function checkBlack(code, construct){
   var ast = esprima.parse(code);
   if(construct === constructDictionary.noWhileStatement){
      return containsNoWhile(ast);
   } else if(construct === constructDictionary.noIfStatement){
      return containsNoIf(ast);
   } else if(construct === constructDictionary.noDuplicateFunction){
      return containsNoDuplicateFunc(ast);
   }
}

/* Structure Testing
   given one of three constructs (contains if statement inside for loop OR contains nested for loop OR 
   contains multiple if) and the editor code - the function returns a boolean indicating whether or not the 
   test has passed
*/
function checkStructure(code, construct){
   var ast = esprima.parse(code);
   if(construct === constructDictionary.ifInsideFor){
      return containsIfInsideFor(ast);
   } else if(construct === constructDictionary.forInsideFor){
      return containsForInsideFor(ast);
   } else if(construct === constructDictionary.ifsInsideWhile){
      return containsIfsInsideWhile(ast);
   }
}

 