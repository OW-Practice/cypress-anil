function fibonaci(number){
var f1 = 0;
var f2 = 1
var f3;
process.stdout.write(f1+" "+f2)
for ( let i = 2; i<number;i++){
     f3 = f1+f2;
    
    f1 = f2;
    f2 = f3;
    
    process.stdout.write(" "+f3);
    

}

}
fibonaci(10)