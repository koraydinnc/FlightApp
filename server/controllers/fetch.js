const axios = require('axios');

const fetchFlightData = async (req, res) => {
  const API_URL = 'https://api.schiphol.nl/public-flights/flights';

  try {
    const response = await axios.get(API_URL, {
      headers: {
        'app_id': process.env.SCHIPHOL_APP_ID, 
        'app_key': process.env.SCHIPHOL_API_KEY, 
        'ResourceVersion': 'v4',
      },
      params: {
        includedelays: 'true', 
      }
    });

    // Return flight data as JSON
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    res.status(500).json({ message: 'Failed to fetch flight data', error: error.message });
  }
};

module.exports = { fetchFlightData };
