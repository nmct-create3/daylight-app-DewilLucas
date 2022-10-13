let sunriseElement;
let sunsetElement;
let locationElement;
let sunElement;
let timeLeftElement;
let totalTime = 0;
// place sun on left and bottom position
// based on total and current time
const placeSun = () => {
	const now = new Date();
	const totalDate = new Date(totalTime * 1000);

	const minutesLeft = now.getHours() * 60 + totalDate.getMinutes() - (totalDate.getHours() * 60 + totalDate.getMinutes());
	const percentage = (totalTime / 100) * minutesLeft;

	const sunLeft = percentage;
	const sunBottom = percentage > 50 ? 100 - percentage : percentage * 2;

	sunElement.style.left = `${sunLeft}%`;
	sunElement.style.bottom = `${sunBottom}%`;
};


const updateTimeAndTimeLeft = (timeLeftTimeStamp) => {
	sunElement.dataset.time = new Date().toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});
	timeLeftElement.innerText = timeLeftTimeStamp;
};



const setDomElements = () => {
	sunriseElement = document.querySelector('.js-sunrise');
	sunsetElement = document.querySelector('.js-sunset');
	locationElement = document.querySelector('.js-location');
	sunElement = document.querySelector('.js-sun');
	timeLeftElement = document.querySelector('.js-time-left');
	if (!sunriseElement || !sunsetElement || !locationElement || !sunsetElement || !timeLeftElement) {
		throw new Error('Invalid dom elements');
	}
};

const makeReadableTimeFormat = (timestamp) => {
	return new Date(timestamp * 1000).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});
};

const setLocationData = (city) => {
	sunriseElement.innerText = makeReadableTimeFormat(city.sunrise);
	sunsetElement.innerText = makeReadableTimeFormat(city.sunset);
	locationElement.innerText = `${city.name} , ${city.country} `;
};

const getData = (endpoint) => {
	return fetch(endpoint)
		.then((response) => response.json())
		.catch((e) => console.error(e));
};
document.addEventListener('DOMContentLoaded', async function () {
	// 1 We will query the API with longitude and latitude.
	let lat = 50.8027841;
	let long = 3.2097454;
	const endpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=fdfc264635b7c51277bac9d18da0125b&units=metric&lang=nl&cnt=1`;
	setDomElements();
	const { city } = await getData(endpoint);
	console.log(city);
	setLocationData(city);
	totalTime = new Date(city.sunset * 1000 - city.sunrise * 1000);
	updateTimeAndTimeLeft(makeReadableTimeFormat(totalTime));
	placeSun(city.sunrise);
});
