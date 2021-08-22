import React from 'react';
import NextHead from 'next/head';

export interface HeadProps {
    title?: string;
}

const Head: React.FC<HeadProps> = (props) => {
    const { title } = props;

    return (
        <NextHead>
            <title>{`${title ? `${title} - ` : ''}Instituto Inventare`}</title>
        </NextHead>
    );
};

export default Head;
