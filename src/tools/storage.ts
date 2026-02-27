import { createMMKV } from 'react-native-mmkv';

const appName = require('../../package.json').name;

const storage = createMMKV({
  id: `user-storage-${appName.toLowerCase()}`,
});

/**
 * Get item from storage
 */
const getStorage = (key: string): string | null => {
  try {
    const result = storage.getString(key);
    return result ?? null;
  } catch (error) {
    console.log('get storage error', error);
    return null;
  }
};

/**
 * Set item in storage
 */
const setStorage = (key: string, value: string): void => {
  try {
    storage.set(key, value);
  } catch (error) {
    console.log('set storage error', error);
  }
};

/**
 * Remove specific item from storage
 */
const removeItem = (key: string): void => {
  try {
    storage.remove(key);
  } catch (error) {
    console.log('remove storage error', error);
  }
};

/**
 * Clear all storage
 */
const clearAll = (): void => {
  try {
    storage.clearAll();
  } catch (error) {
    console.log('clear all storage error', error);
  }
};

// Aliases for compatibility
const clearStorage = removeItem;

export { getStorage, setStorage, removeItem, clearStorage, clearAll };

export default {
  getItem: getStorage,
  setItem: setStorage,
  removeItem: removeItem,
  clearAll: clearAll,
};
