import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    Modal,
    StyleProp,
    ViewStyle,
} from 'react-native';
import type { FineSelectMultipleProps, FineSelectOption, FineSelectProps } from './types';
import { getColors } from './theme';
import { CheckboxIndicator, OptionVisual, RadioIndicator, SearchIcon } from './components';

const DEFAULT_ACCENT_COLOR = '#ED212D';

const isMultipleProps = (p: FineSelectProps): p is FineSelectMultipleProps =>
    p.multiple === true;

const FineSelect = (props: FineSelectProps) => {
    const {
        data = [],
        multiple = false,
        title = 'Select',
        placeholder = 'Choose',
        searchable = true,
        searchPlaceholder = 'Search',
        colorTheme = DEFAULT_ACCENT_COLOR,
        theme = 'light',
        style,
        hideTrigger = false,
        open = false,
        onOpenChange,
        disabled = false,
        emptyText = 'No results found',
    } = props;

    const colors = getColors(theme);

    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [tempValues, setTempValues] = useState<string[]>([]);

    const selectedValues: string[] = useMemo(() => {
        if (isMultipleProps(props)) {
            return (props.value || []).map(item => item.value);
        }
        return props.value ? [props.value.value] : [];
    }, [props]);

    const closeModal = () => {
        setVisible(false);
        onOpenChange?.(false);
    };

    const openModal = () => {
        if (disabled) return;
        setTempValues(multiple ? [...selectedValues] : []);
        setSearch('');
        setVisible(true);
    };

    useEffect(() => {
        if (open) openModal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const cancelHandler = () => closeModal();

    const chooseHandler = () => {
        if (!isMultipleProps(props)) return;
        const selectedOptions = data.filter(item => tempValues.includes(item.value));
        props.onChange(selectedOptions);
        closeModal();
    };

    const selectItem = (item: FineSelectOption) => {
        if (isMultipleProps(props)) {
            setTempValues(prev =>
                prev.includes(item.value)
                    ? prev.filter((v: string) => v !== item.value)
                    : [...prev, item.value],
            );
            return;
        }
        props.onChange(item);
        closeModal();
    };

    const filteredData = useMemo(() => {
        if (!search) return data;
        const query = search.toLowerCase();
        return data.filter(item => item.label.toLowerCase().includes(query));
    }, [data, search]);

    const selectedLabel = useMemo(() => {
        if (isMultipleProps(props)) {
            return (props.value || []).map(item => item.label).join(', ');
        }
        return props.value?.label ?? '';
    }, [props]);

    const isSelected = (item: FineSelectOption) =>
        multiple ? tempValues.includes(item.value) : selectedValues.includes(item.value);

    const renderItem = ({ item }: { item: FineSelectOption }) => {
        const selected = isSelected(item);
        return (
            <TouchableOpacity
                style={styles.item}
                activeOpacity={0.7}
                onPress={() => selectItem(item)}
            >
                <View style={styles.itemLeft}>
                    <OptionVisual item={item} />
                    <View style={styles.itemTextWrap}>
                        <Text
                            style={[
                                styles.itemText,
                                { color: colors.text },
                                selected && {
                                    color: colorTheme,
                                    fontWeight: '600' as const,
                                },
                            ]}
                            numberOfLines={1}
                        >
                            {item.label}
                        </Text>
                        {!!item.other && (
                            <Text
                                style={[styles.itemOther, { color: colors.placeholder }]}
                                numberOfLines={1}
                            >
                                {item.other}
                            </Text>
                        )}
                    </View>
                </View>
                {multiple ? (
                    <CheckboxIndicator
                        selected={selected}
                        color={colorTheme}
                        inactiveColor={colors.inactive}
                    />
                ) : (
                    <RadioIndicator
                        selected={selected}
                        color={colorTheme}
                        inactiveColor={colors.inactive}
                    />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <>
            {!hideTrigger && (
                <TouchableOpacity
                    style={[styles.input, style as StyleProp<ViewStyle>, disabled && styles.disabled]}
                    activeOpacity={0.7}
                    onPress={openModal}
                    disabled={disabled}
                >
                    <Text
                        style={[
                            styles.inputText,
                            { color: selectedLabel ? colors.text : colors.placeholder },
                        ]}
                        numberOfLines={1}
                    >
                        {selectedLabel || placeholder}
                    </Text>
                </TouchableOpacity>
            )}
            <Modal
                animationType="slide"
                transparent
                visible={visible}
                onRequestClose={cancelHandler}
            >
                <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
                    <View
                        style={[styles.modalView, { backgroundColor: colors.background }]}
                    >
                        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                        {searchable && (
                            <View
                                style={[
                                    styles.searchBox,
                                    {
                                        backgroundColor: colors.card,
                                        borderColor: colors.border,
                                    },
                                ]}
                            >
                                <SearchIcon color={colors.placeholder} />
                                <TextInput
                                    style={[styles.searchInput, { color: colors.text }]}
                                    placeholder={searchPlaceholder}
                                    placeholderTextColor={colors.placeholder}
                                    value={search}
                                    onChangeText={setSearch}
                                />
                            </View>
                        )}
                        <FlatList
                            style={styles.list}
                            data={filteredData}
                            keyExtractor={item => item.value}
                            renderItem={renderItem}
                            keyboardShouldPersistTaps="handled"
                            ItemSeparatorComponent={() => (
                                <View
                                    style={[styles.separator, { backgroundColor: colors.border }]}
                                />
                            )}
                            ListEmptyComponent={
                                <Text style={[styles.emptyText, { color: colors.text }]}>
                                    {emptyText}
                                </Text>
                            }
                        />
                        {multiple && (
                            <View style={styles.footer}>
                                <TouchableOpacity
                                    style={[
                                        styles.footerBtn,
                                        { backgroundColor: colors.cancelBackground },
                                    ]}
                                    onPress={cancelHandler}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[styles.cancelBtnText, { color: colors.cancelText }]}
                                    >
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.footerBtn, { backgroundColor: colorTheme }]}
                                    onPress={chooseHandler}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.chooseBtnText}>Choose</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
    inputText: {
        fontSize: 16,
    },
    overlay: {
        flex: 1,
    },
    modalView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '75%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 15,
        textAlign: 'center',
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    searchInput: {
        flex: 1,
        height: 42,
        marginLeft: 8,
        fontSize: 15,
    },
    list: {
        flex: 1,
        marginTop: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    itemTextWrap: {
        flex: 1,
    },
    itemText: {
        fontSize: 15,
    },
    itemOther: {
        fontSize: 12,
        marginTop: 2,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
    },
    emptyText: {
        textAlign: 'center',
        paddingVertical: 30,
    },
    footer: {
        flexDirection: 'row',
        marginTop: 15,
        gap: 10,
    },
    footerBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelBtnText: {
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    chooseBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        textTransform: 'uppercase',
    },
});

export default FineSelect;
