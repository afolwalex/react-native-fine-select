# react-native-fine-select

A themeable single/multiple select (dropdown) component for React Native. Renders as a bottom-sheet picker with search, optional per-option image/icon, and light/dark theming.

## Install

```sh
npm install react-native-fine-select
```

`react` and `react-native` are peer dependencies and must already be present in your project.

## Usage

### Single select

```tsx
import React, { useState } from 'react';
import FineSelect, { FineSelectOption } from 'react-native-fine-select';

const countries: FineSelectOption[] = [
  { label: 'Nigeria', value: 'ng' },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
];

const Example = () => {
  const [country, setCountry] = useState<FineSelectOption | null>(null);

  return (
    <FineSelect
      data={countries}
      value={country}
      onChange={setCountry}
      title="Select a country"
      placeholder="Choose a country"
    />
  );
};
```

### Multiple select

```tsx
const [tags, setTags] = useState<FineSelectOption[]>([]);

<FineSelect
  multiple
  data={tags}
  value={tags}
  onChange={setTags}
  title="Select tags"
/>;
```

For `multiple`, the Cancel/Choose footer is shown so selections only apply when the user taps Choose. For single select, tapping an option applies it immediately and no footer is shown.

### Options with an image or icon

```tsx
const users: FineSelectOption[] = [
  { label: 'Ada Lovelace', value: 'ada', imageUrl: 'https://example.com/ada.png', other: '@ada' },
  { label: 'Alan Turing', value: 'alan', imageIcon: <MyIcon name="user" /> },
];
```

### Dark theme

```tsx
<FineSelect data={countries} value={country} onChange={setCountry} theme="dark" />
```

### Controlled open state (no trigger)

```tsx
<FineSelect
  data={countries}
  value={country}
  onChange={setCountry}
  hideTrigger
  open={isOpen}
  onOpenChange={setIsOpen}
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `FineSelectOption[]` | `[]` | Options to render. |
| `value` | `FineSelectOption \| null` (single) or `FineSelectOption[]` (multiple) | - | Current selection. |
| `onChange` | `(value) => void` | - | Called with the new selection. |
| `multiple` | `boolean` | `false` | Enables multi-select and the Cancel/Choose footer. |
| `title` | `string` | `'Select'` | Sheet header text. |
| `placeholder` | `string` | `'Choose'` | Trigger text when nothing is selected. |
| `searchable` | `boolean` | `true` | Shows the search input. |
| `searchPlaceholder` | `string` | `'Search'` | Search input placeholder. |
| `colorTheme` | `string` | `'#ED212D'` | Accent color for the selection indicator and Choose button. |
| `theme` | `'light' \| 'dark'` | `'light'` | Color scheme of the sheet. |
| `style` | `StyleProp<ViewStyle>` | - | Style applied to the trigger. |
| `hideTrigger` | `boolean` | `false` | Hides the built-in trigger; drive the sheet with `open`/`onOpenChange`. |
| `open` | `boolean` | `false` | Opens the sheet when set to `true`. |
| `onOpenChange` | `(open: boolean) => void` | - | Called when the sheet opens/closes. |
| `disabled` | `boolean` | `false` | Disables the trigger. |
| `emptyText` | `string` | `'No results found'` | Text shown when the search has no matches. |

## FineSelectOption

```ts
interface FineSelectOption {
  label: string;
  value: string;
  imageUrl?: string;
  imageIcon?: React.ReactNode;
  other?: string;
}
```

## License

MIT
