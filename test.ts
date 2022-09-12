import { Env } from "./utils";

const $ = new Env('高佣金');

console.log($.getdata('gyjurl'))
console.log($.getdata('gyjhd'))