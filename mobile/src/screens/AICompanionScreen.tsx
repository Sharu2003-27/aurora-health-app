import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import VoiceRecorder from '../components/VoiceRecorder';
import { aiService } from '../services';
import { Audio } from 'expo-av';

export default function AICompanionScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const onVoiceComplete = async (audioBase64: string, transcription?: string) => {
    try {
      setLoading(true);
      const res = await aiService.voiceChat(audioBase64);
      const data = res as any;

      // data.data contains message, audioBase64
      if (data?.data) {
        const assistantMessage = data.data.message;
        const assistantAudioBase64 = data.data.audioBase64;

        setMessages(prev => [...prev, { id: Date.now().toString(), type: 'user', content: transcription || 'Voice input' }]);
        setMessages(prev => [...prev, { id: (Date.now()+1).toString(), type: 'assistant', content: assistantMessage }]);

        // Play assistant audio
        if (assistantAudioBase64) {
          const filename = `${FileSystem.cacheDirectory}assistant_${Date.now()}.mp3`;
          await FileSystem.writeAsStringAsync(filename, assistantAudioBase64, { encoding: FileSystem.EncodingType.Base64 });
          const { sound } = await Audio.Sound.createAsync({ uri: filename });
          await sound.playAsync();
        }
      }
    } catch (e:any) {
      Alert.alert('Error', e?.message || 'AI request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Aurora — Your health companion</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, item.type === 'assistant' ? styles.assistant : styles.user]}>
            <Text style={{ color: item.type === 'assistant' ? '#111827' : '#fff' }}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingVertical: 12 }}
      />

      {loading && <ActivityIndicator size="large" />}

      <VoiceRecorder onComplete={onVoiceComplete} />
    </View>
  );
}

import * as FileSystem from 'expo-file-system';
const FileSystemRef = FileSystem; // keep TS happy

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: '700' },
  message: { padding: 12, borderRadius: 12, marginVertical: 6, maxWidth: '80%' },
  assistant: { alignSelf: 'flex-start', backgroundColor: '#F3F4F6' },
  user: { alignSelf: 'flex-end', backgroundColor: '#6366F1' },
});
