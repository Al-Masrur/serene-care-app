import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert, Animated, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// ─── Animated background blob ─────────────────────────────────────────────────
function FloatBlob({ color, size, style }: { color: string; size: number; style: object }) {
  const y = useRef(new Animated.Value(0)).current;
  const x = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const dur = 3500 + Math.random() * 2000;
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(y, { toValue: -20, duration: dur, useNativeDriver: true }),
          Animated.timing(x, { toValue: 12,  duration: dur, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(y, { toValue: 0, duration: dur, useNativeDriver: true }),
          Animated.timing(x, { toValue: 0, duration: dur, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      pointerEvents="none"
      style={[style, { width: size, height: size, borderRadius: size / 2, backgroundColor: color, position: 'absolute', transform: [{ translateY: y }, { translateX: x }] }]}
    />
  );
}

const FREQUENCIES = ['Daily', 'Weekly', 'Monthly', 'As Needed'];

export default function AddMedicineScreen() {
  const [medicineName, setMedicineName] = useState('');
  const [totalPills, setTotalPills]     = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [frequency, setFrequency]       = useState('Daily');
  const [notes, setNotes]               = useState('');
  const [dosage, setDosage]             = useState('');

  const handleSave = () => {
    if (!medicineName.trim()) {
      Alert.alert('Missing Info', 'Please enter the medicine name.');
      return;
    }
    if (!reminderTime.trim()) {
      Alert.alert('Missing Info', 'Please enter a reminder time (e.g. 9:00 AM).');
      return;
    }
    Alert.alert(
      '✅ Reminder Saved!',
      `${medicineName} has been added to your schedule at ${reminderTime} — ${frequency}.`,
      [{ text: 'Great!', onPress: () => router.back() }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f3ff' }}>
      {/* Animated background blobs */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <FloatBlob color="rgba(99,102,241,0.15)"  size={240} style={{ top: -60,  left: -60 }} />
        <FloatBlob color="rgba(236,72,153,0.12)"  size={200} style={{ top: 300,  right: -80 }} />
        <FloatBlob color="rgba(16,185,129,0.11)"  size={180} style={{ bottom: 150, left: -40 }} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={22} color="#6366f1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Medicine</Text>
          <View style={{ width: 40 }} />
        </View>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            {/* ── Hero Card ── */}
            <LinearGradient
              colors={['#6366f1', '#8b5cf6', '#ec4899']}
              style={styles.heroCard}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
              <View style={styles.heroIcon}>
                <MaterialIcons name="medication" size={40} color="#6366f1" />
              </View>
              <Text style={styles.heroTitle}>New Reminder</Text>
              <Text style={styles.heroSub}>Fill in the details below to set up your medication reminder.</Text>
            </LinearGradient>

            {/* ── Medicine Name ── */}
            <Text style={styles.label}>Medicine Name</Text>
            <View style={styles.inputRow}>
              <MaterialIcons name="local-pharmacy" size={20} color="#6366f1" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. Vitamin D3"
                placeholderTextColor="#94a3b8"
                value={medicineName}
                onChangeText={setMedicineName}
              />
            </View>

            {/* ── Dosage & Total Pills (row) ── */}
            <View style={styles.twoCol}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Dosage</Text>
                <View style={styles.inputRow}>
                  <MaterialIcons name="science" size={20} color="#8b5cf6" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. 10mg"
                    placeholderTextColor="#94a3b8"
                    value={dosage}
                    onChangeText={setDosage}
                  />
                </View>
              </View>
              <View style={{ width: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Total Pills</Text>
                <View style={styles.inputRow}>
                  <MaterialIcons name="pin" size={20} color="#ec4899" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="30"
                    placeholderTextColor="#94a3b8"
                    value={totalPills}
                    onChangeText={setTotalPills}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </View>

            {/* ── Reminder Time ── */}
            <Text style={styles.label}>Reminder Time</Text>
            <View style={styles.inputRow}>
              <MaterialIcons name="schedule" size={20} color="#0ea5e9" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. 9:00 AM"
                placeholderTextColor="#94a3b8"
                value={reminderTime}
                onChangeText={setReminderTime}
              />
            </View>

            {/* ── Frequency ── */}
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.chipRow}>
              {FREQUENCIES.map(f => {
                const active = frequency === f;
                return (
                  <TouchableOpacity key={f} onPress={() => setFrequency(f)} style={active ? styles.chipActive : styles.chip}>
                    {active
                      ? <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.chipGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                          <Text style={styles.chipTextActive}>{f}</Text>
                        </LinearGradient>
                      : <Text style={styles.chipText}>{f}</Text>
                    }
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* ── Notes ── */}
            <Text style={styles.label}>Notes (Optional)</Text>
            <View style={[styles.inputRow, { alignItems: 'flex-start', paddingTop: 14 }]}>
              <MaterialIcons name="notes" size={20} color="#94a3b8" style={[styles.inputIcon, { marginTop: 2 }]} />
              <TextInput
                style={[styles.input, { height: 90, textAlignVertical: 'top' }]}
                placeholder="e.g. Take after breakfast with a full glass of water..."
                placeholderTextColor="#94a3b8"
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={{ height: 100 }} />
          </ScrollView>
        </KeyboardAvoidingView>

        {/* ── Save Button (pinned bottom) ── */}
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={handleSave} style={{ borderRadius: 18, overflow: 'hidden' }}>
            <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.saveBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <MaterialIcons name="check-circle" size={22} color="#fff" />
              <Text style={styles.saveBtnText}>Save Reminder</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const inputCard = {
  backgroundColor: '#fff',
  borderRadius: 16,
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  paddingHorizontal: 14,
  marginBottom: 16,
  shadowColor: '#6366f1',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 3,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(99,102,241,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1e293b' },

  scroll: { paddingHorizontal: 16, paddingBottom: 20 },

  heroCard: {
    borderRadius: 24, padding: 24, marginBottom: 24,
    alignItems: 'center', overflow: 'hidden',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25, shadowRadius: 16, elevation: 8,
  },
  heroIcon: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  heroTitle: { fontSize: 22, fontWeight: '900', color: '#fff', marginBottom: 6 },
  heroSub: { fontSize: 14, color: 'rgba(255,255,255,0.88)', textAlign: 'center', lineHeight: 20 },

  label: { fontSize: 12, fontWeight: '700', color: '#64748b', marginBottom: 8, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 0.8 },

  inputRow: { ...inputCard },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#1e293b', fontWeight: '500', paddingVertical: 14 },

  twoCol: { flexDirection: 'row', marginBottom: 0 },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  chip: {
    borderRadius: 20, backgroundColor: '#fff',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
    overflow: 'hidden',
  },
  chipActive: {
    borderRadius: 20, overflow: 'hidden',
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4,
  },
  chipGrad: { paddingHorizontal: 18, paddingVertical: 10 },
  chipText: { paddingHorizontal: 18, paddingVertical: 10, fontSize: 14, fontWeight: '600', color: '#64748b' },
  chipTextActive: { fontSize: 14, fontWeight: '700', color: '#fff' },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 16, paddingBottom: 24, paddingTop: 12,
    backgroundColor: 'rgba(245,243,255,0.95)',
  },
  saveBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, paddingVertical: 18, borderRadius: 18,
  },
  saveBtnText: { fontSize: 17, fontWeight: '800', color: '#fff' },
});
