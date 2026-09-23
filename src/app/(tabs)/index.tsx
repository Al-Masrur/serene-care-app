import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const COLORS = {
  primary: '#6366f1',
  primaryFixed: '#e0e7ff',
  background: '#f8fafc',
  onSurface: '#1e293b',
  onSurfaceVariant: '#64748b',
  surfaceContainerLow: '#f1f5f9',
  white: '#ffffff',
  accent: '#ec4899',
  success: '#10b981',
};

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=68' }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.appBarTitle}>Pill Time</Text>
        <TouchableOpacity>
          <MaterialIcons name="wb-sunny" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Welcome Section */}
        <LinearGradient
          colors={['#6366f1', '#8b5cf6']}
          style={styles.welcomeSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.welcomeTitle}>Good morning, Alex</Text>
          <Text style={styles.welcomeSubtitle}>Ready for a mindful day of wellness?</Text>
        </LinearGradient>

        {/* Progress Adherence & Next Dose */}
        <View style={styles.bentoGrid}>
          {/* Progress Ring Card */}
          <View style={[styles.card, styles.progressCard]}>
            <View style={styles.progressRingPlaceholder}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressPercentage}>75%</Text>
                <Text style={styles.progressLabel}>Daily</Text>
              </View>
            </View>
            <Text style={styles.progressTitle}>Great Progress!</Text>
            <Text style={styles.progressSubtitle}>3 of 4 doses taken today</Text>
          </View>

          {/* Next Dose Card */}
          <View style={[styles.card, styles.nextDoseCard]}>
            <View style={styles.nextDoseHeader}>
              <View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>NEXT DOSE</Text>
                </View>
                <Text style={styles.medName}>Lisinopril</Text>
                <Text style={styles.medDetail}>10mg • Blood Pressure</Text>
              </View>
              <View style={styles.medIconContainer}>
                <MaterialIcons name="medication" size={28} color={COLORS.primary} />
              </View>
            </View>
            <View style={styles.nextDoseFooter}>
              <View style={styles.timeContainer}>
                <MaterialIcons name="schedule" size={20} color={COLORS.primary} />
                <Text style={styles.timeText}>9:00 AM</Text>
              </View>
              <TouchableOpacity style={styles.takeNowBtn}>
                <MaterialIcons name="check-circle" size={18} color={COLORS.white} />
                <Text style={styles.takeNowText}>Take Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Today's Schedule */}
        <View style={styles.scheduleHeader}>
          <Text style={styles.scheduleTitle}>Today's Schedule</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.scheduleList}>
          {/* Item 1 */}
          <View style={styles.scheduleItem}>
            <View style={styles.scheduleLeft}>
              <View style={[styles.itemIconContainer, { backgroundColor: '#fee2e2' }]}>
                <MaterialIcons name="local-pharmacy" size={24} color="#ef4444" />
              </View>
              <View>
                <Text style={styles.itemName}>Vitamin C</Text>
                <Text style={styles.itemDetail}>500mg • Once daily</Text>
              </View>
            </View>
            <View style={styles.scheduleRight}>
              <Text style={styles.remainingLabel}>Remaining</Text>
              <Text style={styles.remainingCount}>20 pills</Text>
            </View>
          </View>

          {/* Item 2 */}
          <View style={styles.scheduleItem}>
            <View style={styles.scheduleLeft}>
              <View style={[styles.itemIconContainer, { backgroundColor: '#dbeafe' }]}>
                <MaterialIcons name="water-drop" size={24} color="#3b82f6" />
              </View>
              <View>
                <Text style={styles.itemName}>Omega-3</Text>
                <Text style={styles.itemDetail}>1000mg • With food</Text>
              </View>
            </View>
            <View style={styles.scheduleRight}>
              <Text style={styles.remainingLabel}>Remaining</Text>
              <Text style={styles.remainingCount}>12 capsules</Text>
            </View>
          </View>

          {/* Item 3 (Completed) */}
          <View style={[styles.scheduleItem, { opacity: 0.6 }]}>
            <View style={styles.scheduleLeft}>
              <View style={[styles.itemIconContainer, { backgroundColor: '#e2e8f0' }]}>
                <MaterialIcons name="check" size={24} color="#64748b" />
              </View>
              <View>
                <Text style={[styles.itemName, { textDecorationLine: 'line-through' }]}>Multivitamin</Text>
                <Text style={styles.itemDetail}>Taken at 7:30 AM</Text>
              </View>
            </View>
            <View style={styles.scheduleRight}>
              <Text style={styles.remainingLabel}>Remaining</Text>
              <Text style={[styles.remainingCount, { color: '#64748b' }]}>45 pills</Text>
            </View>
          </View>
        </View>

        {/* Insight */}
        <View style={styles.insightCard}>
          <MaterialIcons name="lightbulb" size={28} color="#eab308" style={{ marginRight: 16 }} />
          <Text style={styles.insightText}>Taking your Lisinopril with a full glass of water helps absorption.</Text>
        </View>

      </ScrollView>

      {/* FAB → Add Medicine */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/(tabs)/add')}>
        <MaterialIcons name="add" size={28} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainerLow,
  },
  profileContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: COLORS.primaryFixed,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  appBarTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  welcomeSection: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
  },
  bentoGrid: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 32,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  progressCard: {
    alignItems: 'center',
  },
  progressRingPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: COLORS.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  progressCircle: {
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
  },
  progressLabel: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    fontWeight: '600',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  nextDoseCard: {},
  nextDoseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  badge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1d4ed8',
  },
  medName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  medDetail: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  medIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primaryFixed,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextDoseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.onSurface,
    marginLeft: 6,
  },
  takeNowBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  takeNowText: {
    color: COLORS.white,
    fontWeight: '700',
    marginLeft: 6,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  viewAllText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  scheduleList: {
    gap: 12,
    marginBottom: 32,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  scheduleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 2,
  },
  itemDetail: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
  },
  scheduleRight: {
    alignItems: 'flex-end',
  },
  remainingLabel: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginBottom: 2,
  },
  remainingCount: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  insightCard: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#eab308',
    marginBottom: 32,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.onSurface,
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
});
