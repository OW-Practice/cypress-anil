function removeDuplicates(value){
    var afterRemoving='';
for(let i = 0 ; i<=value.length;i++){
    for(let j = i+1;j<=value.length;j++){
      if(value.charAt(i)==value.charAt(j)){
        afterRemoving= afterRemoving+""+value.charAt(i)
        
      }
    }
}
console.log(afterRemoving)
}
removeDuplicates("aabcda")