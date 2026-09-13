import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { FineSelectOption } from './types';

export const RadioIndicator = ({
    selected,
    color,
    inactiveColor,
}: {
    selected: boolean;
    color: string;
    inactiveColor: string;
}) => (
    <View
        style={[
            styles.radioOuter,
            { borderColor: selected ? color : inactiveColor },
        ]}
    >
        {selected && <View style={[styles.radioInner, { backgroundColor: color }]} />}
    </View>
);

export const CheckboxIndicator = ({
    selected,
    color,
    inactiveColor,
}: {
    selected: boolean;
    color: string;
    inactiveColor: string;
}) => (
    <View
        style={[
            styles.checkboxOuter,
            {
                borderColor: selected ? color : inactiveColor,
                backgroundColor: selected ? color : 'transparent',
            },
        ]}
    >
        {selected && <Text style={styles.checkmark}>✓</Text>}
    </View>
);

export const SearchIcon = ({ color }: { color: string }) => (
    <Text style={[styles.searchGlyph, { color }]}>🔍</Text>
);

export const CaretDownIcon = ({ color }: { color: string }) => (
    <View style={styles.caretWrap}>
        <View style={[styles.caret, { borderColor: color }]} />
    </View>
);

export const OptionVisual = ({ item }: { item: FineSelectOption }) => {
    if (item.imageIcon) {
        return <View style={styles.optionVisual}>{item.imageIcon}</View>;
    }
    if (item.imageUrl) {
        return (
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.optionImage}
                resizeMode="cover"
            />
        );
    }
    return null;
};

const styles = StyleSheet.create({
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    checkboxOuter: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
        lineHeight: 14,
    },
    searchGlyph: {
        fontSize: 15,
    },
    caretWrap: {
        width: 12,
        height: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    caret: {
        width: 8,
        height: 8,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        marginTop: -4,
        transform: [{ rotate: '45deg' }],
    },
    optionVisual: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionImage: {
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 10,
    },
});
