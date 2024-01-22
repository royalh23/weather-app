import './style.css';

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

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

getWheatherData('baku');
