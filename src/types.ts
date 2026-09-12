import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface FineSelectOption {
    label: string;
    value: string;
    imageUrl?: string;
    imageIcon?: ReactNode;
    other?: string;
}

export type FineSelectThemeName = 'light' | 'dark';

export interface FineSelectBaseProps {
    /** Options rendered in the picker list. */
    data?: FineSelectOption[];
    /** Title shown at the top of the picker sheet. */
    title?: string;
    /** Placeholder text shown on the trigger when nothing is selected. */
    placeholder?: string;
    /** Show the search input above the list. Defaults to true. */
    searchable?: boolean;
    searchPlaceholder?: string;
    /** Accent color used for the selection indicator and the Choose button. */
    colorTheme?: string;
    /** Color scheme of the sheet: 'light' (default) or 'dark'. */
    theme?: FineSelectThemeName;
    style?: StyleProp<ViewStyle>;
    /** Hide the built-in trigger and drive the sheet with `open`/`onOpenChange` instead. */
    hideTrigger?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    emptyText?: string;
}

export interface FineSelectSingleProps extends FineSelectBaseProps {
    multiple?: false;
    value?: FineSelectOption | null;
    onChange: (value: FineSelectOption | null) => void;
}

export interface FineSelectMultipleProps extends FineSelectBaseProps {
    multiple: true;
    value?: FineSelectOption[];
    onChange: (value: FineSelectOption[]) => void;
}

export type FineSelectProps = FineSelectSingleProps | FineSelectMultipleProps;
