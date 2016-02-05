/* defines the functionality that can be tested - 9 different tests - 3 for white, 3 for black and 3 for structure*/
var constructDictionary = {
   "for" : "ForStatement",
   "varDeclare" : "VariableDeclaration", 
   "mathRandom" : "mathRandomFunction", 
   "noWhileStatement" : "noWhileStatement", 
   "noIfStatement": "noIfStatement", 
   "noDuplicateFunction" : "noDuplicateFunction"
}


/* given one of three constructs (contains a for loop OR declares a variable OR contains a Math.random function) and the editor code - the function returns
   a boolean indicating wheter or not the test has passed. 
*/
function checkWhite(code, construct){
   var ast = esprima.parse(code);
   if(construct === constructDictionary.for){
      return containsFor(ast);
   } else if(construct === constructDictionary.varDeclare){
      return containsVarDec(ast);
   } else if(construct === constructDictionary.mathRandom){
      return containsMathRandom(ast);
   }
}


/* given one of three constructs (no while statement OR no if statement OR no duplicate function) and the editor code - the function returns
   a boolean indicating wheter or not the test has passed. 
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


/* white functionality test*/
function containsFor(ast){
   var pass = false;
   traverseASTTree(ast, function(node){
      if(node.type === "ForStatement"){
         pass = true;
      }
   })
   return pass;
}

/*
just idea but dont think it will work.
function example(ast){
   var pass = false;
   traverseASTTree(ast, function(node){
      if(node.type === 'ForStatement'){
         traverseASTTree(ast)
      }
   })
   
   well what about(if node.type === 'ForStatement' && node.type.body)
}
*/

/* white functionality test*/
function containsVarDec(ast){
   var pass = false;
   traverseASTTree(ast, function(node){
      if(node.type === "VariableDeclaration"){
         pass = true;
         return;
      }
   })
   return pass;
}

/* white functionality test*/
function containsMathRandom(ast){
   var pass = false;
   traverseASTTree(ast, function(node){
     if(node.type === "ForStatement"){
        console.log(node.type.body);
     }
   })
}

/* black functionality test*/
function containsNoWhile(ast){
   var pass = true;
   traverseASTTree(ast, function(node){
      if(node.type === "WhileStatement"){
         pass = false;
         return;
      }
   })
   return pass;
}

/* black functionality test */
function containsNoIf(ast){
   var pass = true;
   traverseASTTree(ast, function(node){
      if(node.type === "IfStatement"){
         pass = false;
         return;
      }
   })
   return pass;
}

/* black functionality test*/
function containsNoDuplicateFunc(ast){
   var pass = true;
   var functionsInCode = [];
   traverseASTTree(ast, function(node){
      if(node.type === "FunctionDeclaration"){
         if($.inArray(node.id.name, functionsInCode) > -1){
            pass = false;
            return;
         } else {
            functionsInCode.push(node.id.name);
         } 
      }
   })
   return pass;
}

/* structure functionality tests */



/* traverses through each node of the ast tree recursively*/
function traverseASTTree(node, func){
   func(node);
	  for(var key in node){
      var child = node[key];
      if(typeof child === "object" && child !== null){
         if(Array.isArray(child)){
            child.forEach(function(node) {
               traverseASTTree(node, func);
            });
         } else {
            traverseASTTree(child, func);
         }
      }
	  }
}
 