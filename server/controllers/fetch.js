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

const fetchFlightWithDate = async (req, res) => {
  const { date, flightDirection } = req.query;

  if (!date) {
    return res.status(400).json({ message: 'Please provide a valid date in the query parameters' });
  }

  try {
    await fetchFlightData({ scheduleDate: date, includedelays: true, flightDirection }, res);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flight data', error: error.message });
  }
};

const fetchSelectedFlight = async (req, res) => {
  const { id } = req.query;
  try {
    const API_URL = `https://api.schiphol.nl/public-flights/flights/${id}`;
    const response = await axios.get(API_URL, {
      headers: {
        'app_id': process.env.SCHIPHOL_APP_ID,
        'app_key': process.env.SCHIPHOL_API_KEY,
        'ResourceVersion': 'v4',
      },
    });

    if (!response.data) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json(response.data); 
  } catch (error) {
    console.error('Error fetching flight:', error.message);
    res.status(500).json({ message: 'Failed to fetch flight data', error: error.message });
  }
};

module.exports = { fetchFlightsToday, fetchFlightsTomorrow, fetchFlightWithDate, fetchSelectedFlight };
