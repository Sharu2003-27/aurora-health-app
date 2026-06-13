import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  current: number;
  goal: number;
  width?: number;
  height?: number;
}

export default function WaterBottle({ current, goal, width = 120, height = 260 }: Props) {
  const percent = Math.min(1, goal > 0 ? current / goal : 0);
  const fillHeight = Math.round(height * percent);

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.bottle}>
        <View style={[styles.fill, { height: fillHeight, bottom: 0 }]} />
      </View>
      <Text style={styles.label}>{Math.round(percent * 100)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  bottle: {
    width: '60%',
    height: '80%',
    borderWidth: 4,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  fill: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#60A5FA',
  },
  label: { marginTop: 8, color: '#374151' },
});
