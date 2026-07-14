import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { ChatMessage, SpeedLog, UserStats } from '../types';

// Web Firebase Configuration
const firebaseConfig = {
  projectId: "gen-lang-client-0395732885",
  appId: "1:801023012566:web:51bd523faca4fdd548e377",
  apiKey: "AIzaSyD1IdbIWMvXQjaou8EqMEIObTROBoMraBQ",
  authDomain: "gen-lang-client-0395732885.firebaseapp.com",
  databaseId: "ai-studio-9a194a61-5f5b-4d20-8e9b-0fe8d2b86a47",
  storageBucket: "gen-lang-client-0395732885.firebasestorage.app",
  messagingSenderId: "801023012566",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// LocalStorage backup keys
const STORAGE_STATS_KEY = 'aptistreak_stats';
const STORAGE_LOGS_KEY = 'aptistreak_logs';
const STORAGE_CHAT_KEY = 'aptistreak_chats';

const USER_ID = 'default_student_user';

// --- STREAK & STATS SYNC ---
export async function loadUserStats(): Promise<UserStats> {
  const defaultStats: UserStats = {
    streak: 1,
    lastActive: new Date().toISOString().split('T')[0],
    score: 0,
    solvedCount: 0,
    totalTimeSpent: 0,
  };

  try {
    const userDocRef = doc(db, 'users', USER_ID);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const dbData = userDoc.data() as Partial<UserStats>;
      const stats = { ...defaultStats, ...dbData };
      // Check and update streak logic
      const today = new Date().toISOString().split('T')[0];
      const lastActive = stats.lastActive;

      if (lastActive !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastActive === yesterdayStr) {
          stats.streak += 1;
        } else {
          stats.streak = 1; // Streak broken
        }
        stats.lastActive = today;
        await saveUserStats(stats);
      }
      localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(stats));
      return stats;
    }
  } catch (error) {
    console.warn('Firestore failed to load user stats, falling back to localStorage:', error);
  }

  // Local storage fallback
  const cached = localStorage.getItem(STORAGE_STATS_KEY);
  if (cached) {
    const parsed = JSON.parse(cached) as UserStats;
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (parsed.lastActive === yesterdayStr) {
        parsed.streak += 1;
      } else {
        parsed.streak = 1;
      }
      parsed.lastActive = today;
      localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(parsed));
    }
    return parsed;
  }

  // Save new default
  localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(defaultStats));
  return defaultStats;
}

export async function saveUserStats(stats: UserStats): Promise<void> {
  localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(stats));
  try {
    const userDocRef = doc(db, 'users', USER_ID);
    await setDoc(userDocRef, stats, { merge: true });
  } catch (error) {
    console.error('Failed to sync user stats to cloud:', error);
  }
}

// --- SPEED LOGS / PERFORMANCE TRACKING ---
export async function loadSpeedLogs(): Promise<SpeedLog[]> {
  try {
    const logsCol = collection(db, 'users', USER_ID, 'speedLogs');
    const q = query(logsCol, orderBy('timestamp', 'desc'), limit(50));
    const querySnapshot = await getDocs(q);
    const logs: SpeedLog[] = [];
    querySnapshot.forEach((docSnap) => {
      logs.push({ id: docSnap.id, ...docSnap.data() } as SpeedLog);
    });
    localStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(logs));
    return logs.reverse(); // old to new for graphs
  } catch (error) {
    console.warn('Firestore speed logs load failed, using local fallback:', error);
  }

  const cached = localStorage.getItem(STORAGE_LOGS_KEY);
  return cached ? JSON.parse(cached) : [];
}

export async function saveSpeedLog(logEntry: Omit<SpeedLog, 'id'>): Promise<SpeedLog> {
  const newLog: SpeedLog = {
    ...logEntry,
    id: Math.random().toString(36).substring(2, 9),
  };

  // Update local
  const cached = localStorage.getItem(STORAGE_LOGS_KEY);
  const currentLogs: SpeedLog[] = cached ? JSON.parse(cached) : [];
  currentLogs.push(newLog);
  localStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(currentLogs));

  // Update cloud
  try {
    const logsCol = collection(db, 'users', USER_ID, 'speedLogs');
    await addDoc(logsCol, logEntry);
  } catch (error) {
    console.error('Failed to save speed log to cloud:', error);
  }

  return newLog;
}

// --- CHAT HISTORY SYNC ---
export async function loadChatHistory(): Promise<ChatMessage[]> {
  try {
    const chatsCol = collection(db, 'users', USER_ID, 'chatHistory');
    const q = query(chatsCol, orderBy('timestamp', 'asc'), limit(100));
    const querySnapshot = await getDocs(q);
    const messages: ChatMessage[] = [];
    querySnapshot.forEach((docSnap) => {
      messages.push({ id: docSnap.id, ...docSnap.data() } as ChatMessage);
    });
    localStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(messages));
    return messages;
  } catch (error) {
    console.warn('Firestore chat history load failed, using local fallback:', error);
  }

  const cached = localStorage.getItem(STORAGE_CHAT_KEY);
  return cached ? JSON.parse(cached) : [];
}

export async function saveChatMessage(message: ChatMessage): Promise<void> {
  // Update local
  const cached = localStorage.getItem(STORAGE_CHAT_KEY);
  const currentChats: ChatMessage[] = cached ? JSON.parse(cached) : [];
  currentChats.push(message);
  localStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(currentChats));

  // Update cloud
  try {
    const chatsCol = collection(db, 'users', USER_ID, 'chatHistory');
    await addDoc(chatsCol, message);
  } catch (error) {
    console.error('Failed to save chat message to cloud:', error);
  }
}

export async function clearChatHistory(): Promise<void> {
  localStorage.removeItem(STORAGE_CHAT_KEY);
  // Optional: could delete from firestore, but simple local reset is enough for clear chat workflow
}
