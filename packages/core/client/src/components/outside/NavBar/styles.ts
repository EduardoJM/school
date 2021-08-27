import styled from 'styled-components';
import { LinkRawElement } from '../../infra/Link';

export interface NavBarListProps {
    attachment: 'left' | 'right';
}

export const NavBarContainer = styled.nav`
`;

export const NavBarList = styled.ul<NavBarListProps>`
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: ${(props) => (props.attachment === 'left' ? 'flex-start' : 'flex-end')};
`;

export const NavBarListItem = styled.li`
`;

export const NavBarLink = styled(LinkRawElement)`
    cursor: pointer;
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    color: #FFF;
`;