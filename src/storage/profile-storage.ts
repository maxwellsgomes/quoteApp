import { UserProfile } from '@/types/UserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = '@meu_orcamento:profile';

export const profileStorage = {
  async get(): Promise<UserProfile | null> {
    const data = await AsyncStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  },

  async save(profile: UserProfile): Promise<void> {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },
};