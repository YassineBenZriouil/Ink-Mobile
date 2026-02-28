import { useState } from 'react';
import { getStorage, setStorage } from '@/tools/storage';

export interface Note {
    title: string;
    body: string;
    date?: string;
}

export const useAddNote = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addNote = (title: string, body: string) => {
        setIsLoading(true);
        try {
            // Retrieve current counter to generate the next ID (e.g., N1, N2)
            const countStr = getStorage('notes_count');
            const currentCount = countStr ? parseInt(countStr, 10) : 0;
            const nextCount = currentCount + 1;

            const noteId = `N${nextCount}`;

            const noteData: Note = {
                title,
                body,
                date: new Date().toISOString(),
            };

            // Store the note in JSON (adjacent) format under its specific ID
            setStorage(noteId, JSON.stringify(noteData));

            // Update the counter
            setStorage('notes_count', nextCount.toString());

            setIsLoading(false);
            return noteId;
        } catch (error) {
            console.error('Failed to add note:', error);
            setIsLoading(false);
            throw error;
        }
    };

    return { addNote, isLoading };
};
