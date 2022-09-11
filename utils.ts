declare global {
	const module
	const $task
	const $httpClient
	const $loon
	const $rocket
	const $request

	const process
}

export class Http {
	env: string
	constructor(env) {
		this.env = env
	}
	send(opts, method = 'GET') {
		opts = typeof opts === 'string' ? {
			url: opts
		} : opts
		let sender = this.get
		if (method === 'POST') {
			sender = this.post
		}
		return new Promise((resolve, reject) => {
			sender.call(this, opts, (err, resp, body) => {
				if (err) reject(err)
				else resolve(resp)
			})
		})
	}
	get(opts) {
		return this.send.call(this.env, opts)
	}
	post(opts) {
		return this.send.call(this.env, opts, 'POST')
	}
}

export class Env {
	name: string
	http: Http
	data: object | null
	dataFile: string
	logs: string[]
	isMute: boolean
	isNeedRewrite: boolean
	logSeparator: string
	startTime: number
	constructor(name: string, opts: string = "") {
		this.name = name
		this.http = new Http(this)
		this.data = null
		this.dataFile = 'box.dat'
		this.logs = []
		this.isMute = false
		this.isNeedRewrite = false
		this.logSeparator = '\n'
		this.startTime = new Date().getTime()
		Object.assign(this, opts)
		this.log('', `🔔${this.name}, 开始!`)
	}
	isNode() {
		return 'undefined' !== typeof module && !!module.exports
	}
	isQuanX() {
		return 'undefined' !== typeof $task
	}
	isSurge() {
		return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
	}
	isLoon() {
		return 'undefined' !== typeof $loon
	}
	isShadowrocket() {
		return 'undefined' !== typeof $rocket
	}
	toObj(str, defaultValue = null) {
		try {
			return JSON.parse(str)
		} catch {
			return defaultValue
		}
	}
	toStr(obj, defaultValue = null) {
		try {
			return JSON.stringify(obj)
		} catch {
			return defaultValue
		}
	}
	log(...logs) {
		if (logs.length > 0) {
			this.logs = [...this.logs, ...logs]
		}
		console.log(logs.join(this.logSeparator))
	}
}