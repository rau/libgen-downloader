import axios from "axios"
import Cookies from "universal-cookie"

const cookies = new Cookies()

class Request {
	constructor(endpoint, parameters = {}) {
		this.endpoint = endpoint
		this.parameters = parameters
	}

	init() {
		return new Promise(async (resolve, reject) => {
			try {
				const formData = new FormData()
				let options = {
					method: "GET",
					url: this.endpoint,
					headers: {},
				}

				if (this.parameters.file) {
					formData.append("file", this.parameters.file)
					delete this.parameters.file
					formData.append("method", this.parameters.method)

					// Append each property of this.parameters.data to formData
					if (this.parameters.data) {
						Object.keys(this.parameters.data).forEach((key) => {
							formData.append(key, this.parameters.data[key])
						})
					}

					options.headers["Content-Type"] = "multipart/form-data"
					options.data = formData
					options.data.method = this.parameters.method
				} else if (options.method === "GET" && this.parameters.params) {
					// Append URL parameters for GET requests
					options.params = this.parameters.params
					console.log(this.parameters)
				} else {
					options.headers["Content-Type"] = "application/json"
					options.data = this.parameters.data
				}

				if (this.parameters.method !== undefined) {
					options.method = this.parameters.method
				}

				const res = await axios(options)
				resolve(res)
			} catch (err) {
				if (err.response && err.response.status === 401) {
					cookies.remove("token", { path: "/" })
				}
				reject(err)
			}
		})
	}
}

export default Request
