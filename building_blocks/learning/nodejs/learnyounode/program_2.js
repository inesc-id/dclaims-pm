

//console.log(process.argv.length);
var sum=0;
for(let i=2;i<process.argv.length;i++){
  sum+=+process.argv[i];
}
console.log(sum);