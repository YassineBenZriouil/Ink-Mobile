import { useState, useCallback } from 'react';
import { getStorage } from '@/tools/storage';
import { TodoData } from './useAddTodo';

export const useGetTodos = () => {
    const [todos, setTodos] = useState<TodoData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPointer, setCurrentPointer] = useState<number | null>(null);

    const PAGE_SIZE = 10;

    const fetchTodos = useCallback(
        (isRefresh = false) => {
            setIsLoading(true);
            try {
                const countStr = getStorage('todos_count');
                const totalCount = countStr ? parseInt(countStr, 10) : 0;

                if (totalCount === 0) {
                    setTodos([]);
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

                const newTodos: TodoData[] = [];
                let i = startPointer;
                let fetchedCount = 0;

                while (i > 0 && fetchedCount < PAGE_SIZE) {
                    const todoId = `TD${i}`;
                    const todoStr = getStorage(todoId);

                    if (todoStr) {
                        try {
                            const todoData = JSON.parse(todoStr) as TodoData;
                            newTodos.push({
                                ...todoData,
                                // If no date was saved, fallback to current time to avoid crashing
                                date: todoData.date || new Date().toISOString(),
                            });
                            fetchedCount++;
                        } catch (e) {
                            console.error('Failed to parse todo:', todoId);
                        }
                    }
                    i--;
                }

                if (isRefresh) {
                    setTodos(newTodos);
                } else {
                    setTodos(prev => [...prev, ...newTodos]);
                }

                setCurrentPointer(i);
                setHasMore(i > 0);
            } catch (error) {
                console.error('Failed to fetch todos:', error);
            } finally {
                setIsLoading(false);
            }
        },
        [currentPointer],
    );

    const refreshTodos = useCallback(() => {
        fetchTodos(true);
    }, [fetchTodos]);

    const loadMore = useCallback(() => {
        if (!isLoading && hasMore) {
            fetchTodos(false);
        }
    }, [isLoading, hasMore, fetchTodos]);

    return { todos, isLoading, refreshTodos, loadMore };
};
