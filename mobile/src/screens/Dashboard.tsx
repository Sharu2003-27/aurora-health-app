import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import WaterBottle from '../components/WaterBottle';
import { hydrationService, userService, insightService } from '../services';

export default function DashboardScreen() {
  const [hydration, setHydration] = useState<number | null>(null);
  const [goal, setGoal] = useState<number>(2000);
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const [hRes, metricsRes, insightRes] = await Promise.all([
          hydrationService.getToday(),
          userService.getMetrics(),
          // insight service is not exported separately on mobile; call via services
        ]);

        if (!mounted) return;
        setHydration(hRes.data?.total ?? 0);
        setGoal(metricsRes.data?.dailyHydrationGoal ?? 2000);

        // Call daily insight via insightService through API
        try {
          const ins = await (await fetch(`${hydrationService && ''}`)).catch(()=>null);
        } catch (e) {}
      } catch (e) {
        // ignore for now
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Understand yourself better every day.</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View style={{ alignItems: 'center', marginVertical: 16 }}>
            <WaterBottle current={hydration ?? 0} goal={goal} />
            <Text style={styles.hydrationText}>{(hydration ?? 0) / 1000} L / {goal / 1000} L</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Daily Insight</Text>
            <Text style={styles.cardText}>{insight || 'Keep tracking your health today!'}</Text>
            <Button title="Refresh" onPress={() => { /* placeholder */ }} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '600', marginVertical: 8 },
  hydrationText: { marginTop: 8, fontSize: 16, color: '#374151' },
  card: { backgroundColor: '#F3F4F6', padding: 12, borderRadius: 10, marginTop: 16 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardText: { marginTop: 8, color: '#374151' },
});
