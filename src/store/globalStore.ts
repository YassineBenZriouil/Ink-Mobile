import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import MMKVStorage from '@/tools/storage';
// Define the GlobalState interface
interface GlobalState {
    // Auth & Settings
    currentUser: any | null; // Current user data
    settings: any | null; // Api settings data
    modeGuest: boolean; // Mode guest data
    eventsTypes: any[]; // Events types data
    professions: any[]; // Professions categories data
    // List of professional users
    professionals: any[];
    orders: any[]; // List of orders

    // Refresh trigger for user data
    userRefreshTrigger: number;

    // Array of Products
    basket: any[];

    // Publish draft data (persists across navigation)
    publishDraft: any | null;
    publishStep: number;

    // Server error state (for 500 errors popup)
    serverError: boolean;
    serverRetryFn: (() => void) | null;

    // Auth & Settings Actions
    setCurrentUser: (currentUser: any) => void;
    setSettings: (settings: any) => void;
    setModeGuest: (modeGuest: boolean) => void;
    setEventsTypes: (eventsTypes: any[]) => void;
    setProfessions: (professions: any[]) => void;
    setProfessionals: (professionals: any[]) => void;
    setOrders: (orders: any[]) => void;

    // Refresh trigger action
    triggerUserRefresh: () => void;

    // Basket Actions
    setBasket: (basket: any[]) => void;
    updateBasket: (updatedBasket: any[]) => void;
    clearBasket: () => void;

    // Publish draft Actions
    setPublishDraft: (data: any) => void;
    setPublishStep: (step: number) => void;
    clearPublishDraft: () => void;

    // Server error Actions
    setServerError: (error: boolean, retryFn?: () => void) => void;

    // Clear All Action
    clearAll: () => void;
}

// Create a Zustand store for global state
export const useGlobalStore = create<GlobalState>()(
    persist(
        set => ({
            // Initial Auth & Settings state
            currentUser: null,
            settings: null,
            modeGuest: false,
            eventsTypes: [],
            professions: [],
            professionals: [],
            orders: [],

            // Refresh trigger initial state
            userRefreshTrigger: 0,

            // Initial basket state
            basket: [],

            // Initial publish draft state
            publishDraft: null,
            publishStep: 1,

            // Initial server error state
            serverError: false,
            serverRetryFn: null,

            // Auth & Settings Actions
            setCurrentUser: currentUser => {
                set({ currentUser });
            },
            setModeGuest: modeGuest => {
                set({ modeGuest });
            },
            setSettings: settings => {
                set({ settings });
            },
            setEventsTypes: eventsTypes => {
                set({ eventsTypes });
            },
            setProfessions: professions => {
                set({ professions });
            },
            setProfessionals: professionals => {
                set({ professionals });
            },
            setOrders: orders => {
                set({ orders });
            },

            // Trigger user refresh action
            triggerUserRefresh: () => {
                set(state => ({
                    userRefreshTrigger: state.userRefreshTrigger + 1,
                }));
            },

            // Basket Actions
            setBasket: basket => {
                set({ basket });
            },

            updateBasket: updatedBasket => {
                set(state => ({
                    basket: state.basket
                        ? { ...state.basket, ...updatedBasket }
                        : updatedBasket,
                }));
            },

            clearBasket: () => {
                set({ basket: [] });
            },

            // Publish Draft Actions
            setPublishDraft: data => {
                set({ publishDraft: data });
            },
            setPublishStep: step => {
                set({ publishStep: step });
            },
            clearPublishDraft: () => {
                set({ publishDraft: null, publishStep: 1 });
            },

            // Server error Actions
            setServerError: (error, retryFn) => {
                set({ serverError: error, serverRetryFn: retryFn || null });
            },

            // Clear All Action - Reset to initial state
            clearAll: () => {
                set({
                    currentUser: null,
                    settings: null,
                    modeGuest: false,
                    eventsTypes: [],
                    basket: [],
                    professions: [],
                    professionals: [],
                    orders: [],
                    publishDraft: null,
                    publishStep: 1,
                });
            },
        }),
        {
            name: 'global-storage', // Key for localStorage
            storage: createJSONStorage(() => MMKVStorage), // Use MMKV for React Native
            partialize: state => ({
                currentUser: state.currentUser,
                settings: state.settings,
                basket: state.basket, // Persist single basket
                eventsTypes: state.eventsTypes,
                professions: state.professions,
            }), // Store only necessary fields
        },
    ),
);
