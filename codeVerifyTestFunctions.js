/* codeVerifyTestFunctions.js is a file that contains the traverseASTTree function used to traverse the ast tree esprima produces
   codeVerifyTestFunctions.js is a file that contains functions that return a boolean based on whether a specific test has passed
   codeVerifyTestFunctions.js contains 9 different test functions. 3 for white functionality, 3 for black and 3 for structure
*/

/* white functionality test to see if there is a forLoop within the code. returns boolean*/
function containsFor(ast){
   var pass = false;
   traverseASTTree(ast, function(node){
      if(node.type === "ForStatement"){
         pass = true;
      }
   })
   return pass;
}


/* white functionality test that checks to see whether a variable declaration was made. returns boolean*/
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


/* white functionality test that checks to see wheter a function was declared. returns boolean*/
function containsFunctionDec(ast){
   var pass = false;
   traverseASTTree(ast, function(node){
     if(node.type === "FunctionDeclaration"){
        pass = true;
     }
   })
   return pass;
}


/* black functionality test to ensure that there is no while loop within the code. returns boolean*/
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


/* black functionality test to ensure that there is no if statement within the code. return boolean */
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


/* black functionality test to check for duplicate function declarations. returns boolean*/
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

/* structure test to check for if statement inside for loop*/
function containsIfInsideFor(ast){
   var pass = false;
   traverseASTTree(ast, function(node){
      if(node.type === "ForStatement"){
         traverseASTTree(node.body, function(node){
            if(node.type === 'IfStatement'){
               pass = true;
               return;
            }
         })
         if(pass){return};
      }
   })
   return pass;
}


/* structure test to check for nested for loop*/
function containsForInsideFor(ast){
   var pass = false;
   traverseASTTree(ast, function(node){
      if(node.type === "ForStatement"){
         traverseASTTree(node.body, function(node){
            if(node.type === "ForStatement"){
               pass = true;
               return;
            }
         })
         if(pass){return};
      }
   })
   return pass;
}


/* structure test to check for multiple if inside while*/
function containsIfsInsideWhile(ast){
   var pass = false;
   var countIfsInWhile = [];
   traverseASTTree(ast, function(node){
      if(node.type === "WhileStatement"){
         traverseASTTree(node.body, function(node){
            if(node.type === "IfStatement"){
               countIfsInWhile.push(node.type);
            }
            if(($.inArray(node.type, countIfsInWhile) > -1)){
               pass = true;
               return;
            } 
         })
         if(pass){return};
      }
   })
   return pass;
}



/* traverses through each node of the ast tree recursively and applies the given function*/
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
