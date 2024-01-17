function vowels(input){
    var count = 0 ;
for(let i = 0 ; i<input.length;i++){
    if(input.charAt(i)==='a'|input.charAt(i)==='e'| input.charAt(i)==='i'|input.charAt(i)==='o'|input.charAt(i)==='u')
count++;

}
return count;
}
console.log(vowels('Optuiworks'))