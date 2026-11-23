import {
    Kalam,
    Libertinus_Serif,
    Noto_Serif,
    Roboto,
    Abril_Fatface,
    Lobster,
    Great_Vibes,
    Oswald,
} from 'next/font/google';

const kalam = Kalam({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const libertinusSerif = Libertinus_Serif({
    subsets: ['latin'],
    weight: ['400'],
});
const notoSerif = Noto_Serif({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const abrilFatface = Abril_Fatface({
    subsets: ['latin'],
    weight: ['400'],
});

const lobster = Lobster({
    subsets: ['latin'],
    weight: ['400'],
});

const greatVibes = Great_Vibes({
    subsets: ['latin'],
    weight: ['400'],
});

const oswald = Oswald({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export const DESIGN_FONTS = [
    {
        value: 'Noto Serif',
        label: 'Noto Serif',
        fontFamily: notoSerif.style.fontFamily,
    },
    {
        value: 'Roboto',
        label: 'Roboto',
        fontFamily: roboto.style.fontFamily,
    },
    {
        value: 'Abril Fatface',
        label: 'Abril Fatface',
        fontFamily: abrilFatface.style.fontFamily,
    },
    {
        value: 'Lobster',
        label: 'Lobster',
        fontFamily: lobster.style.fontFamily,
    },
    {
        value: 'Great Vibes',
        label: 'Great Vibes',
        fontFamily: greatVibes.style.fontFamily,
    },
    {
        value: 'Oswald',
        label: 'Oswald',
        fontFamily: oswald.style.fontFamily,
    },
    {
        value: 'Kalam',
        label: 'Kalam',
        fontFamily: kalam.style.fontFamily,
        className: kalam.className,
        weights: ['400', '700'],
    },
    {
        value: 'Libertinus Serif',
        label: 'Libertinus Serif',
        fontFamily: libertinusSerif.style.fontFamily,
        className: libertinusSerif.className,
        weights: ['400'],
    },
];

