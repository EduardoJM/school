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
    
    @media (max-width: 992px) {
        flex-direction: column;
        align-items: flex-start;
        height: unset;
        position: relative;
    }
`;

export interface NavBarListItemProps {
    visibleByToggle: boolean;
}

export const NavBarListItem = styled.li<NavBarListItemProps>`
    @media (max-width: 992px) {
        align-self: stretch;
        display: ${(props) => (props.visibleByToggle ? 'block' : 'none')};
    }
`;

export const NavBarBrandListItem = styled.li`
    @media (max-width: 992px) {
        height: 64px;
    }
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
    
    @media (max-width: 992px) {
        border-bottom: 2px solid transparent;
        font-weight: bold;
    }
`;

export const NavBarFit = styled.li`
    flex: 1;

    @media (max-width: 992px) {
        display: none;
    }
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

export const NavBarToggleButton = styled.li`
    cursor: pointer;
    
    height: 64px;

    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 992px) {
        display: none;
    }
`;
