import { Env } from "./utils";

const $ = new Env('高佣金');

console.log($.getval('gyjstatus'))
console.log($.getdata('gyjurl'))
console.log($.getdata('gyjhd'))