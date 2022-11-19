let sunriseElement;
let sunsetElement;
let locationElement;
let sunElement;
let timeLeftElement;
let totalTime = 0;
// place sun on left and bottom position
// based on total and current time
const placeSun = (city) => {
	const now = new Date();

	const sunrise = new Date(city.sunrise * 1000);
	const sunset = new Date(city.sunset * 1000);

	const totalMinutesDayTime = (sunset.getHours() * 60 + sunset.getMinutes()) - (sunrise.getHours() * 60 + sunrise.getMinutes());

	const timeNow = (now.getHours() * 60 + now.getMinutes()) - (sunrise.getHours() * 60 + sunrise.getMinutes());  // tijd nu tenopzichte van zonsopgang

	const percentage = timeNow / totalMinutesDayTime * 100;

	const sunLeftPosition = percentage;
	const sunBottomPosition = percentage > 50 ? 100 - percentage : percentage * 2;

	sunElement.style.left = `${sunLeftPosition}%`;
	sunElement.style.bottom = `${sunBottomPosition}%`;

	updateTimeAndTimeLeft((sunset.getHours() * 60 + sunset.getMinutes()) - (now.getHours() * 60 + now.getMinutes()));
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
