import styled from 'styled-components';
import { LinkRawElement } from '../../infra/Link';

export interface NavBarListProps {
    attachment: 'left' | 'right';
}

export const NavBarContainer = styled.nav`
`;

export const NavBarList = styled.ul<NavBarListProps>`
    height: 64px;
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
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    text-decoration: none;
    color: #FFF;
    border-bottom: 2px solid transparent;
`;

export const NavBarLinkActive = styled(NavBarLink)`
    border-bottom: 2px solid #FFF;
`;

export const NavBarFit = styled.li`
    flex: 1;
`;

export const NavBarBrandingLink = styled(LinkRawElement)`
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    height: 100%;
    color: #FFF;
    text-decoration: none;
    font-size: 24pt;
`;
