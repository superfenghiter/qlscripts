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
	log(...logs) {
		if (logs.length > 0) {
			this.logs = [...this.logs, ...logs]
		}
		console.log(logs.join(this.logSeparator))
	}
}