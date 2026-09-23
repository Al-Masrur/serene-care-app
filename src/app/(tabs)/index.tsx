import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
  TouchableOpacity, Image, Animated, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// ─── Animated glow blob (lives INSIDE a card) ─────────────────────────────
function GlowBlob({ color, style }: { color: string; style: object }) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.25)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale,   { toValue: 1.5,  duration: 2800, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.5,  duration: 2800, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale,   { toValue: 1,    duration: 2800, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.25, duration: 2800, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      pointerEvents="none"
      style={[style, { borderRadius: 999, backgroundColor: color, opacity, transform: [{ scale }] }]}
    />
  );
}

// ─── Pulse ring around progress circle ───────────────────────────────────────
function PulseRing() {
  const scale   = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale,   { toValue: 1.3, duration: 900, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0,   duration: 900, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale,   { toValue: 1,   duration: 0,   useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.7, duration: 0,   useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute', width: 100, height: 100, borderRadius: 50,
        borderWidth: 3, borderColor: 'rgba(255,255,255,0.7)',
        opacity, transform: [{ scale }],
      }}
    />
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function DashboardScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* ── Colorful background ── */}
      <LinearGradient
        colors={['#e0e7ff', '#fdf2f8', '#ecfdf5']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {/* Decorative background circles */}
      <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />
        <View style={styles.bgCircle3} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        {/* ── App Bar ── */}
        <View style={styles.appBar}>
          <View style={styles.profileBorder}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=68' }} style={styles.profileImage} />
          </View>
          <Text style={styles.appBarTitle}>Pill Time</Text>
          <TouchableOpacity style={styles.notifBtn}>
            <MaterialIcons name="notifications-none" size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* ── Welcome Card ── */}
          <LinearGradient
            colors={['#6366f1', '#8b5cf6', '#a855f7']}
            style={styles.welcomeCard}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          >
            <GlowBlob color="rgba(255,255,255,0.25)" style={styles.blobTR} />
            <GlowBlob color="rgba(255,255,255,0.15)" style={styles.blobBL} />
            <Text style={styles.welcomeTitle}>Good morning, Alex 👋</Text>
            <Text style={styles.welcomeSub}>Ready for a mindful day of wellness?</Text>
          </LinearGradient>

          {/* ── Bento Row ── */}
          <View style={styles.bentoRow}>
            {/* Progress Ring Card */}
            <LinearGradient
              colors={['#ec4899', '#f97316']}
              style={styles.progressCard}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
              <GlowBlob color="rgba(255,255,255,0.2)" style={styles.blobCenter} />
              <View style={styles.ringWrapper}>
                <PulseRing />
                <View style={styles.ring}>
                  <Text style={styles.ringPct}>75%</Text>
                  <Text style={styles.ringLabel}>Daily</Text>
                </View>
              </View>
              <Text style={styles.progressTitle}>Great Progress!</Text>
              <Text style={styles.progressSub}>3 of 4 taken today</Text>
            </LinearGradient>

            {/* Next Dose Card */}
            <LinearGradient
              colors={['#0ea5e9', '#6366f1']}
              style={styles.nextDoseCard}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
              <GlowBlob color="rgba(255,255,255,0.18)" style={styles.blobTR} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>NEXT DOSE</Text>
              </View>
              <View style={styles.medIconBox}>
                <MaterialIcons name="medication" size={26} color="#6366f1" />
              </View>
              <Text style={styles.medName}>Lisinopril</Text>
              <Text style={styles.medDetail}>10mg • Blood Pressure</Text>
              <View style={styles.doseRow}>
                <MaterialIcons name="schedule" size={15} color="rgba(255,255,255,0.85)" />
                <Text style={styles.timeText}>9:00 AM</Text>
              </View>
              <TouchableOpacity style={styles.takeBtn}>
                <MaterialIcons name="check-circle" size={15} color="#0ea5e9" />
                <Text style={styles.takeBtnText}>Take Now</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* ── Schedule Header ── */}
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <TouchableOpacity onPress={() => Alert.alert('All Medications', 'Full schedule screen coming soon!')}>
              <Text style={styles.viewAll}>View All →</Text>
            </TouchableOpacity>
          </View>

          {/* Item 1 – Vitamin C */}
          <LinearGradient
            colors={['#ef4444', '#f97316']}
            style={styles.scheduleCard}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <GlowBlob color="rgba(255,255,255,0.15)" style={styles.blobBL} />
            <View style={styles.scheduleLeft}>
              <View style={styles.schedIcon}>
                <MaterialIcons name="local-pharmacy" size={22} color="#fff" />
              </View>
              <View>
                <Text style={styles.schedName}>Vitamin C</Text>
                <Text style={styles.schedDetail}>500mg • Once daily</Text>
              </View>
            </View>
            <View style={styles.schedRight}>
              <Text style={styles.schedCount}>20</Text>
              <Text style={styles.schedCountLabel}>pills left</Text>
            </View>
          </LinearGradient>

          {/* Item 2 – Omega-3 */}
          <LinearGradient
            colors={['#3b82f6', '#06b6d4']}
            style={styles.scheduleCard}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <GlowBlob color="rgba(255,255,255,0.15)" style={styles.blobTR} />
            <View style={styles.scheduleLeft}>
              <View style={styles.schedIcon}>
                <MaterialIcons name="water-drop" size={22} color="#fff" />
              </View>
              <View>
                <Text style={styles.schedName}>Omega-3</Text>
                <Text style={styles.schedDetail}>1000mg • With food</Text>
              </View>
            </View>
            <View style={styles.schedRight}>
              <Text style={styles.schedCount}>12</Text>
              <Text style={styles.schedCountLabel}>capsules left</Text>
            </View>
          </LinearGradient>

          {/* Item 3 – Completed (NO GlowBlob to avoid any rendering issue) */}
          <LinearGradient
            colors={['#94a3b8', '#64748b']}
            style={[styles.scheduleCard, { opacity: 0.75 }]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <View style={styles.scheduleLeft}>
              <View style={styles.schedIcon}>
                <MaterialIcons name="check" size={22} color="#fff" />
              </View>
              <View>
                <Text style={[styles.schedName, { textDecorationLine: 'line-through' }]}>Multivitamin</Text>
                <Text style={styles.schedDetail}>Taken at 7:30 AM ✓</Text>
              </View>
            </View>
            <View style={styles.schedRight}>
              <Text style={styles.schedCount}>45</Text>
              <Text style={styles.schedCountLabel}>pills left</Text>
            </View>
          </LinearGradient>

          {/* ── Insight Card ── */}
          <LinearGradient
            colors={['#f59e0b', '#fbbf24']}
            style={styles.insightCard}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          >
            <GlowBlob color="rgba(255,255,255,0.2)" style={styles.blobBL} />
            <MaterialIcons name="lightbulb" size={26} color="#fff" style={{ marginRight: 12 }} />
            <Text style={styles.insightText}>
              Taking Lisinopril with a full glass of water helps absorption.
            </Text>
          </LinearGradient>

        </ScrollView>
      </SafeAreaView>

      {/* ── FAB → Add Medicine ── */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/(tabs)/add')}>
        <LinearGradient
          colors={['#6366f1', '#ec4899']}
          style={styles.fabInner}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          <MaterialIcons name="add" size={30} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const cardShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.18,
  shadowRadius: 16,
  elevation: 8,
};

const styles = StyleSheet.create({
  // ── Background deco ──
  bgCircle1: {
    position: 'absolute', top: -80, left: -80,
    width: 280, height: 280, borderRadius: 140,
    backgroundColor: 'rgba(99,102,241,0.12)',
  },
  bgCircle2: {
    position: 'absolute', top: 200, right: -100,
    width: 320, height: 320, borderRadius: 160,
    backgroundColor: 'rgba(236,72,153,0.1)',
  },
  bgCircle3: {
    position: 'absolute', bottom: 100, left: -60,
    width: 240, height: 240, borderRadius: 120,
    backgroundColor: 'rgba(16,185,129,0.1)',
  },

  // ── App Bar ──
  appBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  profileBorder: {
    width: 42, height: 42, borderRadius: 21,
    borderWidth: 2, borderColor: '#a78bfa', overflow: 'hidden',
  },
  profileImage: { width: '100%', height: '100%' },
  appBarTitle: { fontSize: 22, fontWeight: '800', color: '#6366f1' },
  notifBtn: { padding: 4 },

  scroll: { padding: 16, paddingBottom: 110 },

  // ── Welcome ──
  welcomeCard: {
    borderRadius: 22, padding: 22, overflow: 'hidden',
    marginBottom: 14, ...cardShadow,
  },
  welcomeTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 5 },
  welcomeSub: { fontSize: 14, color: 'rgba(255,255,255,0.88)' },

  // ── Bento ──
  bentoRow: { flexDirection: 'row', gap: 14, marginBottom: 14 },

  progressCard: {
    flex: 1, borderRadius: 22, padding: 16,
    alignItems: 'center', overflow: 'hidden', ...cardShadow,
  },
  ringWrapper: { alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  ring: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center', justifyContent: 'center',
  },
  ringPct: { fontSize: 22, fontWeight: '900', color: '#fff' },
  ringLabel: { fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
  progressTitle: { fontSize: 14, fontWeight: '700', color: '#fff', textAlign: 'center' },
  progressSub: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: 2 },

  nextDoseCard: {
    flex: 1.1, borderRadius: 22, padding: 16, overflow: 'hidden', ...cardShadow,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 8, alignSelf: 'flex-start', marginBottom: 10,
  },
  badgeText: { fontSize: 9, fontWeight: '800', color: '#fff', letterSpacing: 1 },
  medIconBox: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  medName: { fontSize: 17, fontWeight: '800', color: '#fff', marginBottom: 2 },
  medDetail: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  doseRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 },
  timeText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  takeBtn: {
    backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 5, paddingVertical: 8, borderRadius: 12,
  },
  takeBtnText: { color: '#0ea5e9', fontWeight: '800', fontSize: 13 },

  // ── Section header ──
  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1e293b' },
  viewAll: { fontSize: 14, color: '#6366f1', fontWeight: '700' },

  // ── Schedule cards ──
  scheduleCard: {
    borderRadius: 20, padding: 16,
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden', marginBottom: 12, ...cardShadow,
  },
  scheduleLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  schedIcon: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
  },
  schedName: { fontSize: 15, fontWeight: '700', color: '#fff', marginBottom: 2 },
  schedDetail: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  schedRight: { alignItems: 'flex-end' },
  schedCount: { fontSize: 22, fontWeight: '900', color: '#fff' },
  schedCountLabel: { fontSize: 11, color: 'rgba(255,255,255,0.75)' },

  // ── Insight ──
  insightCard: {
    borderRadius: 20, padding: 16,
    flexDirection: 'row', alignItems: 'center',
    overflow: 'hidden', ...cardShadow,
  },
  insightText: { flex: 1, fontSize: 13, color: '#fff', lineHeight: 20, fontWeight: '600' },

  // ── Blob positions ──
  blobTR:     { position: 'absolute', top: -25, right: -25, width: 90, height: 90 },
  blobBL:     { position: 'absolute', bottom: -25, left: -25, width: 70, height: 70 },
  blobCenter: { position: 'absolute', top: '15%', right: '15%', width: 70, height: 70 },

  // ── FAB ──
  fab: {
    position: 'absolute', bottom: 90, right: 20,
    width: 60, height: 60, borderRadius: 30,
    shadowColor: '#6366f1', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5, shadowRadius: 15, elevation: 10,
  },
  fabInner: {
    width: 60, height: 60, borderRadius: 30,
    alignItems: 'center', justifyContent: 'center',
  },
});
