import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, fireEvent } from '@testing-library/react';
import ToolBarButton from './ToolBarButton';

describe('ToolBarButton', () => {
    it('The ToolBarButton should be render a button with button type', () => {
        const { getByRole } = render(<ToolBarButton />);
        const button = getByRole('button');
        expect(button).not.toBeUndefined();
        expect(button.getAttribute('type')).toEqual('button');
    });

    it('The ToolBarButton should be render the children as children of the button', () => {
        const { getByRole } = render((
            <ToolBarButton>
                <span>span inner</span>
                <p>p inner</p>
            </ToolBarButton>
        ));
        const button = getByRole('button');
        expect(button.children.length).toEqual(2);
        expect(button.children[0].tagName).toEqual('SPAN');
        expect(button.children[0].textContent).toEqual('span inner');
        expect(button.children[1].tagName).toEqual('P');
        expect(button.children[1].textContent).toEqual('p inner');
    });

    it('The ToolBarButton with \'clickable\' type, onClick and clickFunction properties should be call the onClick property', () => {
        const onClickFn = jest.fn();
        const { getByRole } = render(<ToolBarButton type="clickable" onClick={onClickFn} clickFunction="test" />);
        const button = getByRole('button');
        fireEvent.click(button);
        expect(onClickFn).toHaveBeenCalledTimes(1);
        expect(onClickFn).toHaveBeenCalledWith('test');
    });

    it('The ToolBarButton with \'blockType\' type, onToggleBlockType and blockType properties should be call the onToggleBlockType property', () => {
        const onToggleBlockTypeFn = jest.fn();
        const { getByRole } = render(<ToolBarButton type="blockType" onToggleBlockType={onToggleBlockTypeFn} blockType="TEST_TYPE" />);
        const button = getByRole('button');
        fireEvent.click(button);
        expect(onToggleBlockTypeFn).toHaveBeenCalledTimes(1);
        expect(onToggleBlockTypeFn).toHaveBeenCalledWith('TEST_TYPE');
    });

    it('The ToolBarButton with \'inlineStyle\' type, onToggleStyle and inlineStyle properties should be call the onToggleStyle property', () => {
        const onToggleStyleFn = jest.fn();
        const { getByRole } = render(<ToolBarButton type="inlineStyle" onToggleStyle={onToggleStyleFn} inlineStyle="INLINE_STYLE" />);
        const button = getByRole('button');
        fireEvent.click(button);
        expect(onToggleStyleFn).toHaveBeenCalledTimes(1);
        expect(onToggleStyleFn).toHaveBeenCalledWith('INLINE_STYLE');
    });
});
