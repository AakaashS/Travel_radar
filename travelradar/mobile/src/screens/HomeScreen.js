import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import { fetchRadarRecommendations } from '../api/radarApi';
import POICard from '../components/POICard';

export default function HomeScreen() {
  const [budget, setBudget] = useState(500);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Default coordinates (Kochi)
  const userLat = 9.9658;
  const userLng = 76.2599;

  const loadRadar = async (currentBudget) => {
    setLoading(true);
    try {
      const data = await fetchRadarRecommendations(userLat, userLng, currentBudget);
      setRecommendations(data.recommendations || []);
    } catch (err) {
      console.log('Failed to load radar items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRadar(budget);
  }, [budget]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>TravelRadar 🎯</Text>
      
      {/* Financial Geofence Budget Slider */}
      <View style={styles.sliderBox}>
        <Text style={styles.sliderLabel}>Max Budget: ₹{budget}</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={50}
          maximumValue={1000}
          step={50}
          value={budget}
          onSlidingComplete={(value) => setBudget(value)}
          minimumTrackTintColor="#1976d2"
          maximumTrackTintColor="#d3d3d3"
        />
      </View>

      {/* Recommendations Feed */}
      {loading ? (
        <ActivityIndicator size="large" color="#1976d2" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={recommendations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <POICard item={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No recommendations match this budget.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, color: '#111' },
  sliderBox: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  sliderLabel: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  emptyText: { textAlign: 'center', color: '#777', marginTop: 30 }
});