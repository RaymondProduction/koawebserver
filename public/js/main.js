var numOneEl, numTwoEl, operationSignEl, resultEl;

// Function for operation with the numbers
// First argument is operation symbol +,-,x,:
function operation(operator,numOneStr,numTwoStr){
        numOne=parseFloat(numOneStr);
        numTwo=parseFloat(numTwoStr);  
        console.log("!=",operator," ",numOneStr," ",numTwoStr);  
        if (operator=="+") return (numOne+numTwo).toString();
        if (operator=="-") return (numOne-numTwo).toString();
        if (operator=="x") return (numOne*numTwo).toString();
        if (operator==":") return (numOne/numTwo).toString();
   return "";

}

// Function for convert name button from symbol "+","-","x" or ":"
function symbol(nameButton){
        if (nameButton=="add_btn") return "+";
        if (nameButton=="sub_btn") return "-";
        if (nameButton=="mul_btn") return "x";
        if (nameButton=="div_btn") return ":";
        return "";
}

$(document).ready(function () {
  console.log('DOM is ready for manipulation!');

  resultEl = $('#result');
  var string='';        // String that is displayed on the web page
  var operator='';      
  var numOne='';
  var numTwo='';
  var firstNumber=true;
  var operator='';
  $("button").click(function(event) {
        nameButton=jQuery(this).attr("name");        // name of button for action
        if (nameButton.substring(0,5)=="digit") {    
         string+=nameButton.substr(6,1);   
        }
        if (nameButton.substr(nameButton.length-3,3)=="btn") {
           if (nameButton=="clear_btn") {
               string='';
               operator='';
               numOne='';
               numTwo='';
               firstNumber=true;
               operator='';
           } else {
             if (firstNumber) {
                numOne=string; 
                operator=symbol(nameButton);
                string+=operator;
                 firstNumber=false;
             } else { 
                numTwo=string.substring(numOne.length+1,string.length);
                string=operation(operator,numOne,numTwo); 
                numOne=string; 
             if (nameButton!="result_btn") {
                 operator=symbol(nameButton);
                 string+=operator;   
             } else {
                firstNumber=true;
             }
         }
       }
    }

        resultEl.val(string);
          
    });
  
});
