import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { authStyles as styles } from './styles';
import Header from '@/components/Header';
import TrashIcon from '@/assets/images/trash.png';
import ThemeIcon from '@/assets/images/brush.png';
import ShareIcon from '@/assets/images/share.png';
import COLORS from '@/theme';
import { tr } from '@/locales/i18n';
import { useAddNote } from '../hooks/useAddNote';
import { useGetNote } from '../hooks/useGetNote';
import { setStorage } from '@/tools/storage';

const NoteDetails = () => {
    const route = useRoute<any>();
    const { newNote, noteId: routeNoteId } = route.params || {};

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState<string | null>(null);
    const [noteId, setNoteId] = useState<string | null>(routeNoteId || null);

    const { addNote } = useAddNote();
    const { note } = useGetNote(routeNoteId);

    // If param newNote is true, generate an ID instantly using useAddNote
    useEffect(() => {
        if (newNote && !noteId) {
            const newId = addNote('', '');
            setNoteId(newId);
            setDate(new Date().toISOString());
        }
    }, [newNote]);

    // If an existing note is loaded, prepopulate states
    useEffect(() => {
        if (note && !newNote) {
            setTitle(note.title || '');
            setBody(note.body || '');
            if (note.date) setDate(note.date);
        }
    }, [note]);

    // Keep refs up-to-date so setInterval avoids re-renders
    const titleRef = useRef(title);
    const bodyRef = useRef(body);
    const idRef = useRef(noteId);

    useEffect(() => {
        titleRef.current = title;
        bodyRef.current = body;
        idRef.current = noteId;
    }, [title, body, noteId]);

    // Continuously auto-save interval (every second)
    useEffect(() => {
        const interval = setInterval(() => {
            const currentId = idRef.current;
            if (currentId) {
                const now = new Date().toISOString();
                const noteData = {
                    title: titleRef.current,
                    body: bodyRef.current,
                    date: now,
                };
                setStorage(currentId, JSON.stringify(noteData));
                setDate(now); // Keep UI up-to-date with the autosave timestamp
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const headerOptions = [
        {
            id: '1',
            name: tr('app.delete'),
            icon: TrashIcon,
            onPress: () => console.log('Settings'),
        },
        {
            id: '2',
            name: tr('app.theme'),
            icon: ThemeIcon,
            onPress: () => console.log('Theme'),
        },
        {
            id: '3',
            name: tr('app.share'),
            icon: ShareIcon,
            onPress: () => console.log('Share'),
        },
    ];

    return (
        <View style={styles.container}>
            <Header
                back
                title={title || 'New Note'}
                options={headerOptions}
                additionalStyle={{ marginBottom: 20 }}
            />
            {date && (
                <Text style={styles.dateText}>
                    {new Date(date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
            )}
            <TextInput
                style={styles.titleInput}
                placeholder={tr('noteDetails.titlePlaceHolder')}
                placeholderTextColor={COLORS.darkGray}
                multiline
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.bodyInput}
                placeholder={tr('noteDetails.bodyPlaceHolder')}
                placeholderTextColor={COLORS.darkGray}
                multiline
                textAlignVertical="top"
                value={body}
                onChangeText={setBody}
            />
        </View>
    );
};

export default NoteDetails;
