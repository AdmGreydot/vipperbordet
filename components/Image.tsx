import NextImage from 'next/image';
import type { ReactNode } from 'react';

import classes from './Image.module.css';

type ImageProps = {
    src: string;
    alt?: string;
    children: ReactNode;
    textInside?: boolean;
};

export default function Image({
    src,
    alt = '',
    textInside = false,
    children
}: ImageProps) {
    return (
        <div className={`${classes.image} ${textInside ? classes.textInside : ''}`}>
            {textInside ? (
                <NextImage
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 400px) 100vw, 100%"
                    className={classes.imageTag}
                />
            ) : (
                <NextImage
                    src={src}
                    alt={alt}
                    width={1200}
                    height={800}
                    className={classes.imageTag}
                />
            )}

            <div className={classes.text}>
                {children}
            </div>
        </div>
    );
}