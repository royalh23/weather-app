import './style.css';

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
    },
    forecast: {
      forecastday: [
        getForecastData(0, data),
        getForecastData(1, data),
        getForecastData(2, data),
        getForecastData(3, data),
      ],
    },
  };
}

async function getWheatherData(location) {
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
    console.log(requiredData);
  } catch (error) {
    console.log(error.message);
  }
}

const input = document.querySelector('form input');
const searchBtn = document.querySelector('form button');

searchBtn.addEventListener('click', () => {
  getWheatherData(input.value);
});
