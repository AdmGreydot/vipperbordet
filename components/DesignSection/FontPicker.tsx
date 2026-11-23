import { TextElement } from '@/types/kile';
import { DESIGN_FONTS } from '@/lib/design/fonts';
import Select from '../controls/Select';

type FontPickerProps = {
    font: string;
    layer: TextElement;
    onChange: (element: TextElement) => void;
};

export default function FontPicker({
    layer,
    font,
    onChange,
}: FontPickerProps) {

    function handleSelectFont(value: string) {
        onChange({
            ...layer,
            fontFamily: value,
        });
    }
    const fontOptions = DESIGN_FONTS.map((font) => ({
        value: font.value,
        label: (
            <span style={{ fontFamily: font.fontFamily }}>
                {font.label}
            </span>
        ),
    }));
    return (
            <Select 
                label='Skrifttype'
                placeholder='Vælg skrifttype'
                value={font}
                onChange={handleSelectFont}
                options={fontOptions}
            />

    );
}
