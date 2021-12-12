import axios from "axios";
let http = axios.create({
	baseURL: 'https://5f6d939160cf97001641b049.mockapi.io/tkn',
});

export function getHotelList () {
	return new Promise((resolve, reject) => {
		return http
			.get(`/hotels`)
			.then(response => resolve(response))
			.catch(error => {
				reject(error);
			})
			.finally(() => {});
	});
}
export function getHotelDetail () {
	return new Promise((resolve, reject) => {
		return http
			.get(`/hotel-details/${localStorage.getItem('hotelSelected')}`)
			.then(response => resolve(response))
			.catch(error => {
				reject(error);
			})
			.finally(() => {});
	});
}
export function getHotelSelectedName () {
	return new Promise((resolve, reject) => {
		return http
			.get(`/hotels/${localStorage.getItem('hotelSelected')}`)
			.then(response => resolve(response))
			.catch(error => {
				reject(error);
			})
			.finally(() => {});
	});
}