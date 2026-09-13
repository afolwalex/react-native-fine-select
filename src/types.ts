import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { FineSelectColors } from './theme';

export interface FineSelectOption {
    label: string;
    value: string;
    imageUrl?: string;
    imageIcon?: ReactNode;
    other?: string;
}

export type FineSelectThemeName = 'light' | 'dark';

export interface FineSelectFontFamily {
    /** Item text, search input, trigger text, empty state. */
    regular?: string;
    /** Sheet title. Falls back to `regular` if omitted. */
    medium?: string;
    /** Cancel/Choose footer buttons. Falls back to `regular` if omitted. */
    bold?: string;
}

export interface FineSelectBaseProps {
    /** Options rendered in the picker list. */
    data?: FineSelectOption[];
    /** Title shown at the top of the picker sheet. */
    title?: string;
    /** Placeholder text shown on the trigger when nothing is selected. */
    placeholder?: string;
    /** Show the search input above the list. Defaults to false. */
    searchable?: boolean;
    searchPlaceholder?: string;
    /** Custom search icon element. Defaults to a built-in magnifier glyph. */
    searchIcon?: ReactNode;
    /** Custom trigger indicator element. Defaults to a built-in caret-down chevron. */
    caretIcon?: ReactNode;
    /** Accent color used for the selection indicator and the Choose button. */
    colorTheme?: string;
    /** Base color scheme of the sheet and trigger: 'light' (default) or 'dark'. */
    theme?: FineSelectThemeName;
    /** Overrides individual color tokens from the base `theme`, for a fully custom palette. */
    colors?: Partial<FineSelectColors>;
    /**
     * Font family applied to text in the trigger and sheet. Defaults to the system font.
     * Pass a string to apply one family everywhere, or an object to use distinct
     * families per weight (recommended for custom fonts on Android, which ignores
     * `fontWeight` on non-system typefaces).
     */
    fontFamily?: string | FineSelectFontFamily;
    /** Style applied to the trigger. */
    style?: StyleProp<ViewStyle>;
    /** Hide the built-in trigger and drive the sheet with `open`/`onOpenChange` instead. */
    hideTrigger?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    emptyText?: string;
    /** Close the sheet when tapping outside it. Defaults to true. */
    closeOnBackdropPress?: boolean;
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
