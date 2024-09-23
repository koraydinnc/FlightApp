const axios = require('axios');

// Utility function to handle API requests
const fetchFlightData = async (params, res) => {
  const API_URL = 'https://api.schiphol.nl/public-flights/flights';
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'app_id': process.env.SCHIPHOL_APP_ID,
        'app_key': process.env.SCHIPHOL_API_KEY,
        'ResourceVersion': 'v4',
      },
      params: {
        ...params,
        page: 1,
        sort: '+scheduleTime',
        searchDateTimeField: 'lastUpdatedAt',
      },
    });

    const flights = response.data.flights;

    if (!flights || flights.length === 0) {
      return res.status(404).json({ message: 'No flights found for the specified date and direction' });
    }

    res.status(200).json(flights);
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    res.status(500).json({ message: 'Failed to fetch flight data', error: error.message });
  }
};

const fetchFlightsToday = async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  await fetchFlightData({ scheduleDate: today, flightDirection: 'A', includedelays: true }, res);
};

const fetchFlightsTomorrow = async (req, res) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = tomorrow.toISOString().split('T')[0];
  
  await fetchFlightData({ scheduleDate: formattedTomorrow, flightDirection: 'A', includedelays: true }, res);
};


module.exports = { fetchFlightsToday, fetchFlightsTomorrow };
