import * as axios from 'axios'

let appSecret = '4cbcea96de'
let random = '1t23tst3'
let appId = '5e25c641099b810b946c5d5b'
let rrr = random + ':' + appSecret
let authToken = btoa(rrr)

const connect = axios.create({
	baseURL: 'http://api-factory.simbirsoft1.com/api',
	headers: {
		'Content-Type': 'application/json',
		'X-Api-Factory-Application-Id': appId,
		Authorization: 'Basic ' + authToken
	}
})

const instance = axios.create({
	baseURL: 'http://api-factory.simbirsoft1.com/api',
	headers: {
		'Content-Type': 'application/json',
		'X-Api-Factory-Application-Id': appId,
		Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
	}
})


export const worsAPI = {
	authApp () {
		return connect.post('/auth/login', { username: 'intern', password: 'intern-S!' }).then(response => {
			localStorage.setItem('token', JSON.stringify(response.data.access_token))
		})	
	},
	getCars() {
		return instance.get('/db/car')
	},
	getCity() {
		return instance.get('/db/city')
	},
	getPoints() {
		return instance.get('/db/point')
	},
	getRates() {
		return instance.get('/db/rate')
	},
	getCategory() {
		return instance.get('/db/category')
	},
	getOrderStatus () {
		return instance.get('/db/orderStatus')
	},
}

export const carsAPI = {
	getCars() {
		return instance.get('/db/car')
	},
	setCar(newCar) {
		const { name, categoryId, colors, priceMin, priceMax, thumbnail} = newCar
		const formData = new FormData()
		formData.append('name', name)
		formData.append('categoryId', categoryId)
		colors.forEach( el => formData.append('colors', el))
		formData.append('priceMin', priceMin)
		formData.append('priceMax', priceMax)
		formData.append('thumbnail', thumbnail)
		return instance.post('/db/car', formData, {
			headers:{
				'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
				'Accept': '*/*',
			}
		})
	},
	updateCars(car, id) {
		return instance.put('/db/car/' + id, {...car})
	},
	deleteCar(carId) {
		return instance.delete('/db/car' + carId)
	}
}

export const orderAPI = {
	updateOrder (id, status) {
		return instance.put(`/db/order/${id}`, {status})
	},
	sendOrder(order) {
		return instance.post('/db/order', {...order})
	},
	getOrder(period, car, city, page = 1, limit = 4){
		let {pagE, citY, caR, dateFrom, dateTo, result} = ''
		page > 1 ? pagE = `page=${page - 1}` : pagE = `page=0`
		city === '' ? citY = '' : citY = '&cityId[id]=' + city
		car === '' ? caR = '' : caR = '&carId[id]=' + car
		if (period !== '') {
			dateTo = new Date().getTime()
			dateFrom = new Date(dateTo - 86400000 * period)
			result = '&createdAt[$gt]=' + dateFrom + '&createdAt[$lt]=' + dateTo
		}
		else
			result= ''
		return instance.get(`/db/order/?sort[createdAt]=-1${result}${caR}${citY}&${pagE}&limit=${limit}`)
	},
	deleteOrder(orderId){
		return instance.delete(`/db/order/${orderId}`)
	}
}
