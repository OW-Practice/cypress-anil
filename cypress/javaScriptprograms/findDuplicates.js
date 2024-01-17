function findDuplicates(value){
    var duplicates='';
for(let i = 0 ; i<=value.length;i++){
    for(let j = i+1;j<=value.length;j++){
      if(value.charAt(i)===value.charAt(j)){
        duplicates= duplicates+""+value.charAt(i)
      }
    }
}
console.log(duplicates)
}
findDuplicates("werer")