import { useState, useCallback } from 'react';
import { getStorage } from '@/tools/storage';

export interface NoteItem {
    id: string;
    title: string;
    body: string;
    date: Date;
}

export const useGetNotes = () => {
    const [notes, setNotes] = useState<NoteItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPointer, setCurrentPointer] = useState<number | null>(null);

    const PAGE_SIZE = 10;

    const fetchNotes = useCallback(
        (isRefresh = false) => {
            setIsLoading(true);
            try {
                const countStr = getStorage('notes_count');
                const totalCount = countStr ? parseInt(countStr, 10) : 0;

                if (totalCount === 0) {
                    setNotes([]);
                    setHasMore(false);
                    setIsLoading(false);
                    return;
                }

                let startPointer = isRefresh ? totalCount : currentPointer;
                if (startPointer === null) {
                    startPointer = totalCount;
                }

                if (startPointer <= 0) {
                    setHasMore(false);
                    setIsLoading(false);
                    return;
                }

                const newNotes: NoteItem[] = [];
                let i = startPointer;
                let fetchedCount = 0;

                while (i > 0 && fetchedCount < PAGE_SIZE) {
                    const noteId = `N${i}`;
                    const noteStr = getStorage(noteId);

                    if (noteStr) {
                        try {
                            const noteData = JSON.parse(noteStr);
                            newNotes.push({
                                id: noteId,
                                title: noteData.title || '',
                                body: noteData.body || '',
                                // If no date was saved, fallback to current time to avoid crashing
                                date: noteData.date
                                    ? new Date(noteData.date)
                                    : new Date(),
                            });
                            fetchedCount++;
                        } catch (e) {
                            console.error('Failed to parse note:', noteId);
                        }
                    }
                    i--;
                }

                if (isRefresh) {
                    setNotes(newNotes);
                } else {
                    setNotes(prev => [...prev, ...newNotes]);
                }

                setCurrentPointer(i);
                setHasMore(i > 0);
            } catch (error) {
                console.error('Failed to fetch notes:', error);
            } finally {
                setIsLoading(false);
            }
        },
        [currentPointer],
    );

    const refreshNotes = useCallback(() => {
        fetchNotes(true);
    }, [fetchNotes]);

    const loadMore = useCallback(() => {
        if (!isLoading && hasMore) {
            fetchNotes(false);
        }
    }, [isLoading, hasMore, fetchNotes]);

    return { notes, isLoading, refreshNotes, loadMore };
};
