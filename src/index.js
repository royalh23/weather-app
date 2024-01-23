import './style.css';

const input = document.querySelector('form input');
const searchBtn = document.querySelector('form button');
const main = document.querySelector('.main');

function getForecastData(day, data) {
  return {
    date: data.forecast.forecastday[day].date,
    day: {
      condition: {
        text: data.forecast.forecastday[day].day.condition.text,
        icon: data.forecast.forecastday[day].day.condition.icon,
      },
      daily_chance_of_rain:
        data.forecast.forecastday[day].day.daily_chance_of_rain,
      avgtemp_c: data.forecast.forecastday[day].day.avgtemp_c,
      avgtemp_f: data.forecast.forecastday[day].day.avgtemp_f,
      avghumidity: data.forecast.forecastday[day].day.avghumidity,
    },
  };
}

function getRequiredData(data) {
  return {
    location: {
      name: data.location.name,
      country: data.location.country,
      localtime: data.location.localtime,
    },
    current: {
      condition: {
        text: data.current.condition.text,
        icon: data.current.condition.icon,
      },
      temp_c: data.current.temp_c,
      temp_f: data.current.temp_f,
      feelslike_c: data.current.feelslike_c,
      feelslike_f: data.current.feelslike_f,
      humidity: data.current.humidity,
      wind_kph: data.current.wind_kph,
    },
    forecast: {
      forecastday: [
        getForecastData(1, data),
        getForecastData(2, data),
        getForecastData(3, data),
      ],
    },
  };
}

function displayData(data) {
  main.textContent = '';
  main.className = 'main';

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const today = document.createElement('div');
  const todayMainData = document.createElement('div');
  const city = document.createElement('div');
  const country = document.createElement('div');
  const date = document.createElement('div');
  const icon = new Image();
  const condition = document.createElement('div');
  const todayAddData = document.createElement('div');
  const temp = document.createElement('div');
  const tempTitle = document.createElement('div');
  const tempText = document.createElement('div');
  const feelslike = document.createElement('div');
  const feelslikeTitle = document.createElement('div');
  const feelslikeText = document.createElement('div');
  const humidity = document.createElement('div');
  const humidityTitle = document.createElement('div');
  const humidityText = document.createElement('div');
  const chanceOfRain = document.createElement('div');
  const chanceOfRainTitle = document.createElement('div');
  const chanceOfRainText = document.createElement('div');
  const windSpeed = document.createElement('div');
  const windSpeedTitle = document.createElement('div');
  const windSpeedText = document.createElement('div');

  today.classList.add('today');
  todayMainData.classList.add('main-data');
  city.classList.add('city');
  country.classList.add('country');
  date.classList.add('date');
  icon.classList.add('icon');
  condition.classList.add('condition');
  todayAddData.classList.add('additional-data');

  city.textContent = data.location.name;
  country.textContent = data.location.country;
  date.textContent = `${
    days[new Date(data.forecast.forecastday[0].date).getDay()]
  }, ${data.forecast.forecastday[0].date}`;
  icon.src = `https://${data.current.condition.icon.slice(2)}`;
  condition.textContent = data.current.condition.text;

  tempTitle.textContent = 'Temperature:';
  tempText.textContent = `${data.current.temp_c} °C`;
  feelslikeTitle.textContent = 'Feels Like:';
  feelslikeText.textContent = `${data.current.feelslike_c} °C`;
  humidityTitle.textContent = 'Humidity:';
  humidityText.textContent = `${data.current.humidity} %`;
  chanceOfRainTitle.textContent = 'Chance of Rain:';
  chanceOfRainText.textContent = `${data.forecast.forecastday[0].day.daily_chance_of_rain} %`;
  windSpeedTitle.textContent = 'Wind Speed:';
  windSpeedText.textContent = `${data.current.wind_kph} km/h`;

  todayMainData.append(city, country, date, icon, condition);
  temp.append(tempTitle, tempText);
  feelslike.append(feelslikeTitle, feelslikeText);
  humidity.append(humidityTitle, humidityText);
  chanceOfRain.append(chanceOfRainTitle, chanceOfRainText);
  windSpeed.append(windSpeedTitle, windSpeedText);
  todayAddData.append(temp, feelslike, humidity, chanceOfRain, windSpeed);
  today.append(todayMainData, todayAddData);
  main.append(today);

  data.forecast.forecastday.forEach((nextDay) => {
    const forecastDay = document.createElement('div');
    const weatherMain = document.createElement('div');
    const day = document.createElement('div');
    const tempAndHumidity = document.createElement('div');
    const nextDayTemp = document.createElement('div');
    const nextDayTempTitle = document.createElement('div');
    const nextDayTempText = document.createElement('div');
    const nextDayHumidity = document.createElement('div');
    const nextDayHumidityTitle = document.createElement('div');
    const nextDayHumidityText = document.createElement('div');
    const weatherAdd = document.createElement('div');
    const weatherIcon = new Image();
    const wheaterCondition = document.createElement('div');

    day.textContent = days[new Date(nextDay.date).getDay()];
    nextDayTempTitle.textContent = 'Temperature:';
    nextDayTempText.textContent = `${nextDay.day.avgtemp_c} °C`;
    nextDayHumidityTitle.textContent = 'Humidity:';
    nextDayHumidityText.textContent = `${nextDay.day.avghumidity} %`;
    weatherIcon.src = `https://${nextDay.day.condition.icon.slice(2)}`;
    wheaterCondition.textContent = nextDay.day.condition.text;

    nextDayTemp.classList.add('temp');
    nextDayHumidity.classList.add('humidity');
    weatherMain.classList.add('first');
    weatherAdd.classList.add('second');
    forecastDay.classList.add('forecast');

    nextDayTemp.append(nextDayTempTitle, nextDayTempText);
    nextDayHumidity.append(nextDayHumidityTitle, nextDayHumidityText);
    tempAndHumidity.append(nextDayTemp, nextDayHumidity);
    weatherMain.append(day, tempAndHumidity);
    weatherAdd.append(weatherIcon, wheaterCondition);
    forecastDay.append(weatherMain, weatherAdd);
    main.append(forecastDay);
  });
}

async function getWeatherData(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=6f555dcee5874f618c993013242001&q=${location}&days=4`,
      { mode: 'cors' },
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message);
    }

    const requiredData = getRequiredData(data);
    displayData(requiredData);
    console.log(requiredData);
  } catch (error) {
    main.className = 'main default';
    main.textContent = error.message;
  }
}

searchBtn.addEventListener('click', () => {
  getWeatherData(input.value);
});
