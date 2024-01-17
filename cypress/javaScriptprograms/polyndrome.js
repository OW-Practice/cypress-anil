function polyndrome(value){
    var reverse = '';
for(let i =value.length;i>=0;i--){
    
    reverse = reverse+""+value.charAt(i)
 }
 if(value===reverse){
    console.log("given value is polyndrome")
 }
 else{
    console.log("given value is not polyndrome")
 }

console.log(value)
console.log(reverse)
}

polyndrome('abcbae')