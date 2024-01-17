function reverseString(){
  var reversee = 345345678
  var reversestring = '' ;
  
var reverse = reversee.toString()
  for( let i = reverse.length;i>=0;i--){

    reversestring = reversestring+""+reverse.charAt(i)

  
  }
console.log(Number(reversestring))



}
reverseString()
