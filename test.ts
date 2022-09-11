import { Env } from "./utils";

const $ = new Env('高佣金');

function isQuanX() {
    return 'undefined' !== typeof $task
}

console.log(isQuanX());