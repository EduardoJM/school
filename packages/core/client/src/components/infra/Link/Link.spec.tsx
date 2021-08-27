import React, { forwardRef, ExoticComponent, RefAttributes } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import Link from './Link';

describe('Link Component', () => {
    it('The Link Component should be render a <a> element with same href', () => {
        const { getByText } = render(<Link href="/testing">test</Link>);
        const element = getByText(/test/i);
        expect(element).not.toBeUndefined();
        expect(element.tagName).toEqual('A');
        expect(element.getAttribute('href')).toEqual('/testing');
    });

    it('The Link Component with passHref={false} should be render a <a> element without same href', () => {
        const { getByText } = render(<Link href="/testing" passHref={false}>test</Link>);
        const element = getByText(/test/i);
        expect(element).not.toBeUndefined();
        expect(element.tagName).toEqual('A');
        expect(element.getAttribute('href')).toBeNull();
    });

    it('The Link Component with element property should be render this element', () => {
        const TestElement: ExoticComponent = forwardRef<RefAttributes<HTMLSpanElement>>(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ children, ...rest }, ref) => (
                <span {...rest}>{children}</span>
            ),
        );
        const { getByText } = render(<Link href="/testing" element={TestElement} passHref={false}>test</Link>);
        const element = getByText(/test/i);
        expect(element).not.toBeUndefined();
        expect(element.tagName).toEqual('SPAN');
    });
});
