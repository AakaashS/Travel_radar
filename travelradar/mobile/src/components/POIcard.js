import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function POICard({ item }) {
  // Determine badge color from backend safety tint
  const getBadgeColor = (tint) => {
    switch (tint) {
      case 'GREEN': return '#2e7d32';
      case 'AMBER': return '#ed6c02';
      case 'RED': return '#d32f2f';
      default: return '#757575';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={[styles.badge, { backgroundColor: getBadgeColor(item.safety_tint) }]}>
          <Text style={styles.badgeText}>{item.safety_tint}</Text>
        </View>
      </View>

      <Text style={styles.details}>
        Category: {item.category} | Cost: ₹{item.cost}
      </Text>
      <Text style={styles.distance}>Distance: {item.distance_meters}m away</Text>
      
      <View style={styles.rationaleBox}>
        <Text style={styles.rationaleText}>💡 {item.why_this_place}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  details: { color: '#555', marginTop: 4 },
  distance: { color: '#888', fontSize: 12, marginTop: 2 },
  rationaleBox: {
    backgroundColor: '#f0f4f8',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  rationaleText: { fontSize: 13, color: '#1a237e', italic: true },
});