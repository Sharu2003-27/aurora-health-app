import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import WaterBottle from '../components/WaterBottle';
import { hydrationService, userService } from '../services';

export default function HydrationScreen() {
  const [current, setCurrent] = useState(0);
  const [goal, setGoal] = useState(2000);
  const [custom, setCustom] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const hRes = await hydrationService.getToday();
        const mRes = await userService.getMetrics();
        setCurrent(hRes.data?.total ?? 0);
        setGoal(mRes.data?.dailyHydrationGoal ?? 2000);
      } catch (e) {
        // ignore
      }
    };
    load();
  }, []);

  const quickAdd = async (amount: number) => {
    try {
      await hydrationService.addHydration(amount, 'Quick add');
      const hRes = await hydrationService.getToday();
      setCurrent(hRes.data?.total ?? current + amount);
    } catch (e:any) {
      Alert.alert('Error', e?.response?.data?.error?.message || 'Failed to add hydration');
    }
  };

  const addCustom = async () => {
    const amt = parseInt(custom);
    if (!amt || amt <= 0) return Alert.alert('Invalid', 'Enter a valid amount in ml');
    await quickAdd(amt);
    setCustom('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hydration</Text>
      <View style={{ alignItems: 'center', marginVertical: 16 }}>
        <WaterBottle current={current} goal={goal} />
        <Text style={styles.hydText}>{current} ml / {goal} ml</Text>
      </View>

      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickButton} onPress={() => quickAdd(250)}>
          <Text>+250 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickButton} onPress={() => quickAdd(500)}>
          <Text>+500 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickButton} onPress={() => quickAdd(1000)}>
          <Text>+1000 ml</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 24 }}>
        <Text style={{ marginBottom: 8 }}>Custom amount (ml)</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            keyboardType="numeric"
            value={custom}
            onChangeText={setCustom}
            placeholder="e.g., 350"
            style={styles.input}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addCustom}>
            <Text style={{ color: '#fff' }}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: '700', marginTop: 8 },
  hydText: { marginTop: 8, fontSize: 16, color: '#374151' },
  quickRow: { flexDirection: 'row', justifyContent: 'space-between' },
  quickButton: { backgroundColor: '#EEF2FF', padding: 12, borderRadius: 8, width: '30%', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#E5E7EB', padding: 10, borderRadius: 8, marginRight: 8 },
  addBtn: { backgroundColor: '#6366F1', padding: 12, borderRadius: 8 },
});
