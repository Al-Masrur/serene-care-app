import AsyncStorage from '@react-native-async-storage/async-storage';

const MEDICINES_KEY = 'medicines_list';

export type Medicine = {
  id: string;
  name: string;
  dosage: string;
  totalPills: string;
  reminderTime: string; // e.g. "9:00 AM"
  frequency: string;
  notes: string;
  taken: boolean;
};

// Parse "9:00 AM" / "10:30 PM" to minutes since midnight for sorting
export function parseTimeToMinutes(timeStr: string): number {
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 9999;
  let hours = parseInt(match[1]);
  const mins = parseInt(match[2]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + mins;
}

export function getCurrentMinutes(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export async function getMedicines(): Promise<Medicine[]> {
  try {
    const data = await AsyncStorage.getItem(MEDICINES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function saveMedicine(medicine: Omit<Medicine, 'id' | 'taken'>): Promise<void> {
  const existing = await getMedicines();
  const newMedicine: Medicine = {
    ...medicine,
    id: Date.now().toString(),
    taken: false,
  };
  await AsyncStorage.setItem(MEDICINES_KEY, JSON.stringify([...existing, newMedicine]));
}

export async function markMedicineTaken(id: string): Promise<void> {
  const existing = await getMedicines();
  const updated = existing.map(m => m.id === id ? { ...m, taken: true } : m);
  await AsyncStorage.setItem(MEDICINES_KEY, JSON.stringify(updated));
}

export async function resetDailyTaken(): Promise<void> {
  const existing = await getMedicines();
  const reset = existing.map(m => ({ ...m, taken: false }));
  await AsyncStorage.setItem(MEDICINES_KEY, JSON.stringify(reset));
}

export function getNextDose(medicines: Medicine[]): Medicine | null {
  const now = getCurrentMinutes();
  const upcoming = medicines
    .filter(m => !m.taken)
    .sort((a, b) => parseTimeToMinutes(a.reminderTime) - parseTimeToMinutes(b.reminderTime));

  // First try to find one after current time
  const afterNow = upcoming.find(m => parseTimeToMinutes(m.reminderTime) >= now);
  return afterNow || upcoming[0] || null;
}
