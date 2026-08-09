import axios from 'axios';

// 10.0.2.2 is local loopback for Android Emulator, use local IP for physical devices
const API_BASE_URL = 'http://10.0.2.2:8000/api/v1';

export const fetchRadarRecommendations = async (lat, lng, budget) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/radar`, {
      params: {
        lat: lat,
        lng: lng,
        remaining_budget: budget,
        hour_of_day: new Date().getHours()
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching radar data:', error);
    throw error;
  }
};