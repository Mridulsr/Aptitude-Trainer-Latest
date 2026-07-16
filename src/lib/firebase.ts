import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, query, orderBy, limit, where, getDocFromServer } from 'firebase/firestore';
import { ChatMessage, SpeedLog, UserStats, AppUser } from '../types';

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

// Validate Connection to Firestore on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration or connection.");
    }
  }
}
testConnection();

// LocalStorage backup keys
const STORAGE_STATS_KEY = 'aptistreak_stats';
const STORAGE_LOGS_KEY = 'aptistreak_logs';
const STORAGE_CHAT_KEY = 'aptistreak_chats';

// Get current dynamic session ID (defaults to 'default_student_user' for guest)
export function getCurrentUserId(): string {
  const cachedUser = localStorage.getItem('dsa_auth_user');
  if (cachedUser) {
    try {
      const parsed = JSON.parse(cachedUser);
      if (parsed && parsed.uid) {
        return parsed.uid;
      }
    } catch (e) {
      // Ignore
    }
  }
  return 'default_student_user';
}

// Get the full logged in user object
export function getCurrentUser(): AppUser | null {
  const cachedUser = localStorage.getItem('dsa_auth_user');
  if (cachedUser) {
    try {
      return JSON.parse(cachedUser) as AppUser;
    } catch (e) {
      return null;
    }
  }
  return null;
}

// --- DATABASE REGISTER & LOGIN ---

export async function registerUser(
  name: string,
  email: string,
  password?: string,
  targetCompany?: string,
  levelPreference?: string,
  phone?: string,
  authMethod?: 'email' | 'phone' | 'google'
): Promise<AppUser> {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Verify if email exists
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', cleanEmail));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error('This email is already registered! Please log in instead.');
  }

  // 2. Generate custom unique uid
  const uid = 'usr_' + Math.random().toString(36).substring(2, 11);

  const newUser: AppUser = {
    uid,
    name: name.trim(),
    email: cleanEmail,
    phone: phone || '',
    authMethod: authMethod || 'email',
    password: password || '',
    targetCompany: targetCompany || 'All',
    levelPreference: levelPreference || 'All',
    createdAt: new Date().toISOString()
  };

  // 3. Save profile to "users" collection
  const userDocRef = doc(db, 'users', uid);
  await setDoc(userDocRef, newUser);

  // Initialize their UserStats too in Firestore
  const defaultStats: UserStats = {
    streak: 1,
    lastActive: new Date().toISOString().split('T')[0],
    score: 0,
    solvedCount: 0,
    totalTimeSpent: 0,
  };
  await setDoc(userDocRef, defaultStats, { merge: true });

  // 4. Save local session cache
  localStorage.setItem('dsa_auth_user', JSON.stringify(newUser));
  localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(defaultStats));
  localStorage.removeItem(STORAGE_LOGS_KEY);
  localStorage.removeItem(STORAGE_CHAT_KEY);

  saveLocalUserBackup(newUser);

  return newUser;
}

export async function registerOrLoginWithGoogle(
  name: string,
  email: string
): Promise<AppUser> {
  const cleanEmail = email.trim().toLowerCase();

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', cleanEmail));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Log them in!
    let existingUser: AppUser | null = null;
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      existingUser = {
        uid: docSnap.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        authMethod: data.authMethod || 'google',
        targetCompany: data.targetCompany,
        levelPreference: data.levelPreference,
        createdAt: data.createdAt
      };
    });
    
    if (existingUser) {
      localStorage.setItem('dsa_auth_user', JSON.stringify(existingUser));
      localStorage.removeItem(STORAGE_STATS_KEY);
      localStorage.removeItem(STORAGE_LOGS_KEY);
      localStorage.removeItem(STORAGE_CHAT_KEY);
      saveLocalUserBackup(existingUser);
      return existingUser;
    }
  }

  // Create new user with Google login method
  const uid = 'usr_g_' + Math.random().toString(36).substring(2, 11);
  const newUser: AppUser = {
    uid,
    name: name.trim(),
    email: cleanEmail,
    authMethod: 'google',
    targetCompany: 'All',
    levelPreference: 'Easy',
    createdAt: new Date().toISOString()
  };

  const userDocRef = doc(db, 'users', uid);
  await setDoc(userDocRef, newUser);

  // Initialize statistics
  const defaultStats: UserStats = {
    streak: 1,
    lastActive: new Date().toISOString().split('T')[0],
    score: 0,
    solvedCount: 0,
    totalTimeSpent: 0,
  };
  await setDoc(userDocRef, defaultStats, { merge: true });

  localStorage.setItem('dsa_auth_user', JSON.stringify(newUser));
  localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(defaultStats));
  localStorage.removeItem(STORAGE_LOGS_KEY);
  localStorage.removeItem(STORAGE_CHAT_KEY);

  saveLocalUserBackup(newUser);

  return newUser;
}

export async function registerOrLoginWithPhone(
  phone: string,
  name?: string
): Promise<AppUser> {
  const cleanPhone = phone.trim();

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('phone', '==', cleanPhone));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Log them in!
    let existingUser: AppUser | null = null;
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      existingUser = {
        uid: docSnap.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        authMethod: data.authMethod || 'phone',
        targetCompany: data.targetCompany,
        levelPreference: data.levelPreference,
        createdAt: data.createdAt
      };
    });
    
    if (existingUser) {
      localStorage.setItem('dsa_auth_user', JSON.stringify(existingUser));
      localStorage.removeItem(STORAGE_STATS_KEY);
      localStorage.removeItem(STORAGE_LOGS_KEY);
      localStorage.removeItem(STORAGE_CHAT_KEY);
      saveLocalUserBackup(existingUser);
      return existingUser;
    }
  }

  // Create new user with Phone login method
  const uid = 'usr_p_' + Math.random().toString(36).substring(2, 11);
  const newUser: AppUser = {
    uid,
    name: name ? name.trim() : `Student ${cleanPhone.slice(-4)}`,
    email: `${cleanPhone}@phone-login.dsa.viz`,
    phone: cleanPhone,
    authMethod: 'phone',
    targetCompany: 'All',
    levelPreference: 'Easy',
    createdAt: new Date().toISOString()
  };

  const userDocRef = doc(db, 'users', uid);
  await setDoc(userDocRef, newUser);

  // Initialize statistics
  const defaultStats: UserStats = {
    streak: 1,
    lastActive: new Date().toISOString().split('T')[0],
    score: 0,
    solvedCount: 0,
    totalTimeSpent: 0,
  };
  await setDoc(userDocRef, defaultStats, { merge: true });

  localStorage.setItem('dsa_auth_user', JSON.stringify(newUser));
  localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(defaultStats));
  localStorage.removeItem(STORAGE_LOGS_KEY);
  localStorage.removeItem(STORAGE_CHAT_KEY);

  saveLocalUserBackup(newUser);

  return newUser;
}

export async function loginUser(email: string, password?: string): Promise<AppUser> {
  const cleanEmail = email.trim().toLowerCase();

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', cleanEmail));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error('Account not found with this email. Please register first!');
  }

  // Find matching user document
  let matchedUser: AppUser | null = null;
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.email === cleanEmail) {
      if (!password || data.password === password) {
        matchedUser = {
          uid: docSnap.id,
          name: data.name,
          email: data.email,
          targetCompany: data.targetCompany,
          levelPreference: data.levelPreference,
          createdAt: data.createdAt
        };
      }
    }
  });

  if (!matchedUser) {
    throw new Error('Incorrect password. Please verify your credentials.');
  }

  // Save session locally
  localStorage.setItem('dsa_auth_user', JSON.stringify(matchedUser));

  // Reset caches so we pull the fresh user data
  localStorage.removeItem(STORAGE_STATS_KEY);
  localStorage.removeItem(STORAGE_LOGS_KEY);
  localStorage.removeItem(STORAGE_CHAT_KEY);

  saveLocalUserBackup(matchedUser);

  return matchedUser;
}

export function logoutUser(): void {
  localStorage.removeItem('dsa_auth_user');
  localStorage.removeItem(STORAGE_STATS_KEY);
  localStorage.removeItem(STORAGE_LOGS_KEY);
  localStorage.removeItem(STORAGE_CHAT_KEY);
}

// --- LOCAL USERS DATABASE BACKUP & LIVE DIRECTORY ---
export function getLocalUsersBackup(): AppUser[] {
  try {
    const list = localStorage.getItem('dsa_local_users_db');
    return list ? JSON.parse(list) : [];
  } catch (e) {
    return [];
  }
}

export function saveLocalUserBackup(user: AppUser) {
  try {
    const list = getLocalUsersBackup();
    if (!list.some(u => (user.email && u.email === user.email) || (user.phone && u.phone === user.phone))) {
      list.push(user);
      localStorage.setItem('dsa_local_users_db', JSON.stringify(list));
    }
  } catch (e) {
    // Ignore
  }
}

export async function getAllRegisteredUsers(): Promise<AppUser[]> {
  const localList = getLocalUsersBackup();
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    const cloudList: AppUser[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.email || data.phone) {
        cloudList.push({
          uid: docSnap.id,
          name: data.name || 'Anonymous Student',
          email: data.email || '',
          phone: data.phone || '',
          authMethod: data.authMethod || 'email',
          targetCompany: data.targetCompany || 'All',
          levelPreference: data.levelPreference || 'Easy',
          createdAt: data.createdAt || new Date().toISOString()
        });
      }
    });

    // Merge lists by email / phone to avoid duplicates
    const mergedMap = new Map<string, AppUser>();
    // First load local to make sure we have offline additions
    localList.forEach(u => {
      const key = u.email ? u.email.toLowerCase() : u.phone;
      if (key) mergedMap.set(key, u);
    });
    // Overwrite/merge with official cloud records
    cloudList.forEach(u => {
      const key = u.email ? u.email.toLowerCase() : u.phone;
      if (key) mergedMap.set(key, u);
    });

    const result = Array.from(mergedMap.values());
    // Sort by createdAt desc
    return result.sort((a, b) => {
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
  } catch (error) {
    console.warn('Firestore failed to fetch all users, using local fallback:', error);
    return localList.sort((a, b) => {
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
  }
}

// --- STREAK & STATS SYNC ---
export async function loadUserStats(): Promise<UserStats> {
  const defaultStats: UserStats = {
    streak: 1,
    lastActive: new Date().toISOString().split('T')[0],
    score: 0,
    solvedCount: 0,
    totalTimeSpent: 0,
  };

  const userId = getCurrentUserId();

  try {
    const userDocRef = doc(db, 'users', userId);
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
  const userId = getCurrentUserId();
  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, stats, { merge: true });
  } catch (error) {
    console.error('Failed to sync user stats to cloud:', error);
  }
}

// --- SPEED LOGS / PERFORMANCE TRACKING ---
export async function loadSpeedLogs(): Promise<SpeedLog[]> {
  const userId = getCurrentUserId();
  try {
    const logsCol = collection(db, 'users', userId, 'speedLogs');
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
  const userId = getCurrentUserId();
  try {
    const logsCol = collection(db, 'users', userId, 'speedLogs');
    await addDoc(logsCol, logEntry);
  } catch (error) {
    console.error('Failed to save speed log to cloud:', error);
  }

  return newLog;
}

// --- CHAT HISTORY SYNC ---
export async function loadChatHistory(): Promise<ChatMessage[]> {
  const userId = getCurrentUserId();
  try {
    const chatsCol = collection(db, 'users', userId, 'chatHistory');
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
  const userId = getCurrentUserId();
  try {
    const chatsCol = collection(db, 'users', userId, 'chatHistory');
    await addDoc(chatsCol, message);
  } catch (error) {
    console.error('Failed to save chat message to cloud:', error);
  }
}

export async function clearChatHistory(): Promise<void> {
  localStorage.removeItem(STORAGE_CHAT_KEY);
  // Optional: could delete from firestore, but simple local reset is enough for clear chat workflow
}
