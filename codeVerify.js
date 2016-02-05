var codeVerify = function(){

   var codeVerify = {
      CheckWhite: function(code, construct) {
        var ast = esprima.parse(code);
        if(construct === constructDictionary.for){
           return containsFor(ast);
        } else if(construct === constructDictionary.varDeclare){
           return containsVarDec(ast);
        } else if(construct === constructDictionary.mathRandom){
           return containsMathRandom(ast);
        }
      },

      CheckBlack: function(code, construct){
         var ast = esprima.parse(code);
         if(construct === constructDictionary.noWhileStatement){
            return containsNoWhile(ast);
         } else if(construct === constructDictionary.noIfStatement){
            return containsNoIf(ast);
         } else if(construct === constructDictionary.noDuplicateFunction){
            return containsNoDuplicateFunc(ast);
         }
      },

      CheckStructure: function(code, constructs){
         
      }
   }
   
   return codeVerify;
}()
