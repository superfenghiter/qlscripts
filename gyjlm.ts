import { Env } from "./utils";

const $ = new Env('高佣金');
let status;

status = (status = ($.getval("gyjstatus") || "1")) > 1 ? `${status}` : "";
let gyjurlArr: any[] = [], gyjhdArr: string[] = [], gyjcount = ''
let gyjurl = $.getdata('gyjurl')
let gyjhd = $.isNode() ? (process.env.gyjhd ? process.env.gyjhd : "") : ($.getdata('gyjhd') ? $.getdata('gyjhd') : "")
let tz = ($.getval('tz') || '1');
$.message = ''
let gyjhds: {string: string}


!(async () => {
    if (typeof $request !== "undefined") {
        await gyjck()
    } else {
        if (!$.isNode()) {
            gyjurlArr.push($.getdata('gyjurl'))
            gyjhdArr.push($.getdata('gyjhd'))

            let gyjcount = ($.getval('gyjcount') || '1');
            for (let i = 2; i <= gyjcount; i++) {
                gyjurlArr.push($.getdata(`gyjurl${i}`))
                gyjhdArr.push($.getdata(`gyjhd${i}`))

            }
            console.log(
                `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                    new Date().getTime() +
                    new Date().getTimezoneOffset() * 60 * 1000 +
                    8 * 60 * 60 * 1000
                ).toLocaleString()} ===============================================\n`);
            for (let i = 0; i < gyjhdArr.length; i++) {
                if (gyjhdArr[i]) {
                    gyjurl = gyjurlArr[i];
                    gyjhd = gyjhdArr[i];

                    $.index = i + 1;
                    console.log(`\n\n开始【高佣金${$.index}】`)
                    await grxx()
                    await $.wait(3000)
                    //循环运行  恶魔👿封印请勿增加
					for (let c = 0; c < 8; c++) {
						$.index = c + 1
	
						// await gksp()//你要执行的版块  
						await $.wait(20000)//你要延迟的时间  1000=1秒
					}  
                  
                  	// await yhjb()//你要执行的版块  
                    await $.wait(1000)   //
                
               	 	message()
                } 
            }
        } else {
            if (process.env.gyjhd && process.env.gyjhd.indexOf('@') > -1) {
                gyjhdArr = process.env.gyjhd.split('@');
            } else {
                gyjhds = [process.env.gyjhd]
            };
            Object.keys(gyjhds).forEach((item) => {
                if (gyjhds[item]) {
                    gyjhdArr.push(gyjhds[item])
                }
            })
            console.log(`共${gyjhdArr.length}个cookie`)
            gyjhdArr.forEach(async (value: string, index: number, array: string[]) => {
                $.message = ""
                $.index = index + 1
                console.log(`\n开始【高佣金${$.index}】`)
                await grxx()
                await $.wait(3000)
                //循环运行 恶魔👿封印请勿增加
                // for (let c = 0; c < 8; c++) {
                //     $.index = c + 1
 
                //     await gksp()//你要执行的版块  
                //     await $.wait(20000)//你要延迟的时间  1000=1秒
                    
                // }
                // await yhjb()//你要执行的版块  
                // await $.wait(1000) 
                message()
            })
        }
    }
})()
.catch((e) => $.logErr(e))
.finally(() => $.done())


//获取ck
function gyjck() {
    if ($request.url.indexOf("client") > -1 && $request.url.indexOf("act") > -1 && $request.url.indexOf("getGoldCount") > -1) {
        const gyjurl = $request.url
        if (gyjurl) {
			$.setdata(gyjurl, `gyjurl${status}`)
		} 
 
    	const gyjhd = $request.headers.token
        if (gyjhd) {
			$.setdata(gyjhd, `gyjhd${status}`)
		} 
        $.log(gyjhd)
 
        $.msg($.name, "", `高佣金${status}获取token成功`)
    }
}

//个人信息
function grxx(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `https://client.atomsh.com/e00-bee-client/client/user-mine/getUserInfo`,
            headers: //JSON.parse(gyjhd),
            {
				"Host": "client.atomsh.com:10012",
				"Connection": "keep-alive",
				"Accept": "application/json, text/plain, */*",
				"Origin": "https://h5.atomsh.com",
				"Sec-Fetch-Dest": "empty",
				"User-Agent": "Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36 AgentWeb/4.1.3  UCBrowser/11.6.4.950",
				"token": `${gyjhd}`,
				"client_id": "E00-BEE-CLIENT-WEB",
				"X-Requested-With": "com.atomsh",
				"Sec-Fetch-Site": "same-site",
				"Sec-Fetch-Mode": "cors",
				"Referer": "https://h5.atomsh.com/",
				"Accept-Encoding": "gzip, deflate",
				"Accept-Language": "zh-CN,zh;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7"
			},
        }
 
        $.get(url, async (err, resp, result) => {
            console.log("get respond")
			if (result !== undefined) {
            	try {
                	const data = JSON.parse(result)
 
                	if (data.code == 1) {
 						console.log(`【🐮🐮】：${data.data.nickname}\n`)
 						$.message +=`【🐮🐮】：${data.data.nickname}\n`
 						console.log(`【邀请码】：${data.data.invitationCode}\n`)
 						$.message +=`【邀请码】：${data.data.invitationCode}\n`

                   		// await qd()//你要执行的版块  
                    	await $.wait(2000)
                	} else {
 
                	}
            	} catch (e) {
 
            	} finally {
                	resolve('')
            	}
			} else {
                console.log('no result')
            }
        }, timeout)
    })
}

//  //签到
//  function qd(timeout = 0) {
//     return new Promise((resolve) => {
 
//         let url = {
//             url: `https://client.atomsh.com/e00-bee-client/client/act/doSign?actId=497`,
//             headers: //JSON.parse(gyjhd),
//              {
//     "Host": "client.atomsh.com:10012",
//     "Connection": "keep-alive",
//     "Accept": "application/json, text/plain, */*",
//     "Origin": "https://h5.atomsh.com",
//     "Sec-Fetch-Dest": "empty",
//     "User-Agent": "Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36 AgentWeb/4.1.3  UCBrowser/11.6.4.950",
//     "token": `${gyjhd}`,
//     "client_id": "E00-BEE-CLIENT-WEB",
//     "X-Requested-With": "com.atomsh",
//     "Sec-Fetch-Site": "same-site",
//     "Sec-Fetch-Mode": "cors",
//     "Referer": "https://h5.atomsh.com/",
//     "Accept-Encoding": "gzip, deflate",
//     "Accept-Language": "zh-CN,zh;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7"
//   },
//         }
 
//         $.get(url, async (err, resp, data) => {
//             try {
 
//                 data = JSON.parse(data)
 
//                 if (data.code == 1) {
 
//  console.log(`【📆】：${data.msg}\n`)
//  $.message +=`【📆】：${data.msg}\n`
                  



//                 } else {
//   console.log(`【📆】：${data.msg}\n`)
//   $.message +=`【📆】：${data.msg}\n`
//                 }
//             } catch (e) {
 
//             } finally {
 
//                 resolve()
//             }
//         }, timeout)
//     })
// }
 
// //观看视频
// function gksp(timeout = 0) {
//     return new Promise((resolve) => {
 
//         let url = {
//             url: `https://client.atomsh.com/e00-bee-client/client/act/join?actId=499&actRuleId=792`,
//             headers: //JSON.parse(gyjhd),
//              {
//     "Host": "client.atomsh.com:10012",
//     "Connection": "keep-alive",
//     "Accept": "application/json, text/plain, */*",
//     "Origin": "https://h5.atomsh.com",
//     "Sec-Fetch-Dest": "empty",
//     "User-Agent": "Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36 AgentWeb/4.1.3  UCBrowser/11.6.4.950",
//     "token": `${gyjhd}`,
//     "client_id": "E00-BEE-CLIENT-WEB",
//     "X-Requested-With": "com.atomsh",
//     "Sec-Fetch-Site": "same-site",
//     "Sec-Fetch-Mode": "cors",
//     "Referer": "https://h5.atomsh.com/",
//     "Accept-Encoding": "gzip, deflate",
//     "Accept-Language": "zh-CN,zh;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7"
//   },
//         }
 
//         $.get(url, async (err, resp, data) => {
//             try {
 
//                 data = JSON.parse(data)
 
//                 if (data.code == 1) {
 
//  console.log(`【📺】：${data.data.actRuleName}\n`)
//  $.message +=`【📺】：${data.data.actRuleName}\n`
//                   spid = data.data.actJoinId
//                     console.log(`【获取到spid】\n`)
//                     console.log(spid)
//                      await $.wait(5000)
//                     await sbsj()



//                 } else {
 
 
//                 }
//             } catch (e) {
 
//             } finally {
 
//                 resolve()
//             }
//         }, timeout)
//     })
// }
//  //上报数据
// function sbsj(timeout = 0) {
//     return new Promise((resolve) => {
 
//         let url = {
//             url: `https://client.atomsh.com/e00-bee-client/client/log/saveCommonLog?type=200`,
//             headers: //JSON.parse(gyjhd),
//              {
//     "Host": "client.atomsh.com:10012",
//     "Connection": "keep-alive",
//     "Accept": "application/json, text/plain, */*",
//     "Origin": "https://h5.atomsh.com",
//     "Sec-Fetch-Dest": "empty",
//     "User-Agent": "Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36 AgentWeb/4.1.3  UCBrowser/11.6.4.950",
//     "token": `${gyjhd}`,
//     "client_id": "E00-BEE-CLIENT-WEB",
//     "X-Requested-With": "com.atomsh",
//     "Sec-Fetch-Site": "same-site",
//     "Sec-Fetch-Mode": "cors",
//     "Referer": "https://h5.atomsh.com/",
//     "Accept-Encoding": "gzip, deflate",
//     "Accept-Language": "zh-CN,zh;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7"
//   },
//         }
 
//         $.get(url, async (err, resp, data) => {
//             try {
 
//                 data = JSON.parse(data)
 
//                 if (data.code == 1) {
 
//  console.log(`【🔍】：${data.msg}\n`)

                  


//                     await $.wait(5000)
//                     await lqjl()


//                 } else {
 
//  console.log(`【🔍】：${data.msg}\n`)

//                 }
//             } catch (e) {
 
//             } finally {
 
//                 resolve()
//             }
//         }, timeout)
//     })
// }

// //领取奖励
// function lqjl(timeout = 0) {
//     return new Promise((resolve) => {
 
//         let url = {
//             url: `https://client.atomsh.com/e00-bee-client/client/act/activeTimely?joinId=${spid}`,
//             headers: //JSON.parse(gyjhd),
//              {
//     "Host": "client.atomsh.com:10012",
//     "Connection": "keep-alive",
//     "Accept": "application/json, text/plain, */*",
//     "Origin": "https://h5.atomsh.com",
//     "Sec-Fetch-Dest": "empty",
//     "User-Agent": "Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36 AgentWeb/4.1.3  UCBrowser/11.6.4.950",
//     "token": `${gyjhd}`,
//     "client_id": "E00-BEE-CLIENT-WEB",
//     "X-Requested-With": "com.atomsh",
//     "Sec-Fetch-Site": "same-site",
//     "Sec-Fetch-Mode": "cors",
//     "Referer": "https://h5.atomsh.com/",
//     "Accept-Encoding": "gzip, deflate",
//     "Accept-Language": "zh-CN,zh;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7"
//   },
//         }
 
//         $.get(url, async (err, resp, data) => {
//             try {
 
//                 data = JSON.parse(data)
 
//                 if (data.code == 1) {
 
//  console.log(`【领取💰💰】：${data.msg}\n`)

//         $.message += `【领取💰💰】：${data.msg}\n`          

//                 } else {
//   console.log(`【领取失败】：${data.msg}\n`)
//  $.message += `【领取失败】：${data.msg}\n`  
 
//                 }
//             } catch (e) {
 
//             } finally {
 
//                 resolve()
//             }
//         }, timeout)
//     })
// }
// //用户金币
// function yhjb(timeout = 0) {
//     return new Promise((resolve) => {
 
//         let url = {
//             url: `https://client.atomsh.com/e00-bee-client/client/act/getGoldCount`,
//             headers: //JSON.parse(gyjhd),
//              {
//     "Host": "client.atomsh.com:10012",
//     "Connection": "keep-alive",
//     "Accept": "application/json, text/plain, */*",
//     "Origin": "https://h5.atomsh.com",
//     "Sec-Fetch-Dest": "empty",
//     "User-Agent": "Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36 AgentWeb/4.1.3  UCBrowser/11.6.4.950",
//     "token": `${gyjhd}`,
//     "client_id": "E00-BEE-CLIENT-WEB",
//     "X-Requested-With": "com.atomsh",
//     "Sec-Fetch-Site": "same-site",
//     "Sec-Fetch-Mode": "cors",
//     "Referer": "https://h5.atomsh.com/",
//     "Accept-Encoding": "gzip, deflate",
//     "Accept-Language": "zh-CN,zh;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7"
//   },
//         }
 
//         $.get(url, async (err, resp, data) => {
//             try {
 
//                 data = JSON.parse(data)
 
//                 if (data.code == 1) {
 
//  console.log(`【总金币】：${data.data}\n💎`)

//         $.message += `【总金币】：${data.data}\n💎`          

//                 } else {
 
//                 }
//             } catch (e) {
 
//             } finally {
 
//                 resolve()
//             }
//         }, timeout)
//     })
// }

function message() {
    if (tz == 1) { $.msg($.name, "", $.message) }
}
