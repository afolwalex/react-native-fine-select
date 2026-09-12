import type { FineSelectThemeName } from './types';

export interface FineSelectColors {
    background: string;
    card: string;
    text: string;
    border: string;
    placeholder: string;
    inactive: string;
    overlay: string;
    cancelBackground: string;
    cancelText: string;
}

export const lightColors: FineSelectColors = {
    background: '#FFFFFF',
    card: '#F6F6F7',
    text: '#111111',
    border: '#E2E2E4',
    placeholder: '#808080',
    inactive: '#B5B5B5',
    overlay: '#000000AA',
    cancelBackground: '#F6F6F7',
    cancelText: '#111111',
};

export const darkColors: FineSelectColors = {
    background: '#1C1C1E',
    card: '#2C2C2E',
    text: '#F5F5F5',
    border: '#3A3A3C',
    placeholder: '#9B9B9B',
    inactive: '#6E6E73',
    overlay: '#000000CC',
    cancelBackground: '#2C2C2E',
    cancelText: '#F5F5F5',
};

export const getColors = (theme: FineSelectThemeName = 'light'): FineSelectColors =>
    theme === 'dark' ? darkColors : lightColors;
