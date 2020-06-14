/*
buffer
*/
const buf1 = Buffer.alloc(10);
console.log(buf1)
const buf2 = Buffer.from('a');
console.log(buf2, buf2.toString());
const buf3 = Buffer.from('zhongwen');
console.log(Buffer.concat([buf2, buf3]).toString())