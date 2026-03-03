import React, { useRef, useState } from 'react';
import {
    View,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import useStyles from './styles';
import closeIcon from '@/assets/images/close.png';
import { tr } from '@/locales/i18n';
import Checkbox from '../todoCard/components/Checkbox';
import { useTheme } from '@/contexts/themeContext';

export interface AddTodoPopUpProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (
        mode: 'single' | 'list',
        title: string,
        subTodos: { id: string; title: string; isCompleted: boolean }[],
    ) => void;
}

const AddTodoPopUp: React.FC<AddTodoPopUpProps> = ({
    visible,
    onClose,
    onSubmit,
}) => {
    const styles = useStyles();
    const { theme } = useTheme();
    const scrollViewRef = useRef<ScrollView>(null);

    const [mode, setMode] = useState<
        'selection' | 'single' | 'list-title' | 'list-items'
    >('selection');
    const [title, setTitle] = useState('');
    const [subTodos, setSubTodos] = useState([
        { id: Date.now().toString(), title: '', isCompleted: false },
    ]);

    const resetState = () => {
        setMode('selection');
        setTitle('');
        setSubTodos([
            { id: Date.now().toString(), title: '', isCompleted: false },
        ]);
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const handleNext = () => {
        if (mode === 'list-title' && title.trim() !== '') {
            setMode('list-items');
        }
    };

    const handleCreate = () => {
        // Filter out empty sub-todos
        const filteredSubTodos = subTodos.filter(
            todo => todo.title.trim() !== '',
        );

        if (mode === 'single' && title.trim() !== '') {
            onSubmit('single', title.trim(), []);
            handleClose();
        } else if (mode === 'list-items' && title.trim() !== '') {
            onSubmit('list', title.trim(), filteredSubTodos);
            handleClose();
        }
    };

    const addSubTodoRow = () => {
        setSubTodos([
            ...subTodos,
            { id: Date.now().toString(), title: '', isCompleted: false },
        ]);
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const updateSubTodoTitle = (id: string, newTitle: string) => {
        setSubTodos(
            subTodos.map(todo =>
                todo.id === id ? { ...todo, title: newTitle } : todo,
            ),
        );
    };

    const isCreateDisabled = () => {
        if (mode === 'single') return title.trim() === '';
        if (mode === 'list-items') return title.trim() === '';
        return true;
    };

    // Validation: Plus button is disabled if the last input is empty
    const isAddRowDisabled =
        subTodos.length > 0 &&
        subTodos[subTodos.length - 1].title.trim() === '';

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={handleClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={handleClose}>
                    <View style={styles.overlay}>
                        <View
                            style={styles.container}
                            onStartShouldSetResponder={() => true}
                        >
                            {/* Close button */}
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={handleClose}
                            >
                                <Image
                                    source={closeIcon}
                                    style={styles.closeButtonImage}
                                />
                            </TouchableOpacity>

                            {mode === 'selection' && (
                                <View style={styles.selectionContainer}>
                                    <Text style={styles.selectionTitle}>
                                        Choose Type
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.modeButton}
                                        onPress={() => setMode('single')}
                                    >
                                        <Text style={styles.modeButtonText}>
                                            A To Do
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.modeButton}
                                        onPress={() => setMode('list-title')}
                                    >
                                        <Text style={styles.modeButtonText}>
                                            To Do List
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {mode === 'single' && (
                                <View style={styles.contentContainer}>
                                    <View style={styles.singleRow}>
                                        <Checkbox
                                            value={false}
                                            disabled
                                            size={24}
                                        />
                                        <TextInput
                                            style={styles.singleInput}
                                            placeholder="What needs to be done?"
                                            placeholderTextColor={theme.gray}
                                            value={title}
                                            onChangeText={setTitle}
                                            autoFocus
                                        />
                                    </View>
                                </View>
                            )}

                            {mode === 'list-title' && (
                                <View style={styles.contentContainer}>
                                    <TextInput
                                        style={styles.listTitleInput}
                                        placeholder="To Do List title"
                                        placeholderTextColor={theme.gray}
                                        value={title}
                                        onChangeText={setTitle}
                                        autoFocus
                                    />
                                </View>
                            )}

                            {mode === 'list-items' && (
                                <View style={styles.contentContainer}>
                                    <Text style={styles.listTitleLabel}>
                                        {title}
                                    </Text>

                                    <ScrollView
                                        ref={scrollViewRef}
                                        style={styles.subTodosScroll}
                                        showsVerticalScrollIndicator
                                        keyboardShouldPersistTaps="handled"
                                        nestedScrollEnabled
                                        onContentSizeChange={() =>
                                            scrollViewRef.current?.scrollToEnd({
                                                animated: true,
                                            })
                                        }
                                    >
                                        {subTodos.map((todo, index) => (
                                            <View
                                                key={todo.id}
                                                style={styles.subTodoRow}
                                            >
                                                <Checkbox
                                                    value={false}
                                                    disabled
                                                    size={18}
                                                />
                                                <TextInput
                                                    style={styles.subTodoInput}
                                                    placeholder="Task details"
                                                    placeholderTextColor={
                                                        theme.gray
                                                    }
                                                    value={todo.title}
                                                    onChangeText={val =>
                                                        updateSubTodoTitle(
                                                            todo.id,
                                                            val,
                                                        )
                                                    }
                                                    autoFocus={
                                                        index ===
                                                        subTodos.length - 1
                                                    }
                                                />
                                                {index ===
                                                    subTodos.length - 1 && (
                                                    <TouchableOpacity
                                                        style={[
                                                            styles.addRowButton,
                                                            isAddRowDisabled &&
                                                                styles.addRowButtonDisabled,
                                                        ]}
                                                        onPress={addSubTodoRow}
                                                        disabled={
                                                            isAddRowDisabled
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.addRowPlus
                                                            }
                                                        >
                                                            +
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            {mode === 'list-title' && (
                                <TouchableOpacity
                                    style={[
                                        styles.createButton,
                                        title.trim() === '' &&
                                            styles.createButtonDisabled,
                                    ]}
                                    onPress={handleNext}
                                    disabled={title.trim() === ''}
                                >
                                    <Text style={styles.createButtonText}>
                                        Next
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {(mode === 'single' || mode === 'list-items') && (
                                <TouchableOpacity
                                    style={[
                                        styles.createButton,
                                        isCreateDisabled() &&
                                            styles.createButtonDisabled,
                                    ]}
                                    onPress={handleCreate}
                                    disabled={isCreateDisabled()}
                                >
                                    <Text style={styles.createButtonText}>
                                        Create
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default AddTodoPopUp;
