import React from 'react';
import Link from '../../infra/Link';
import {
    NavBarContainer,
    NavBarList,
    NavBarListItem,
    NavBarLink,
} from './styles';

export interface NavBarItem {
    text: string;
    path: string;
}

export interface NavBarProps {
    className?: string;
    items?: NavBarItem[];
}

const NavBar: React.FC<NavBarProps> = (props) => {
    const {
        className = '',
        items = [],
    } = props;

    return (
        <NavBarContainer className={`navbar ${className}`}>
            <NavBarList attachment="right">
                {items.map((item) => (
                    <NavBarListItem className="navbar-item">
                        <Link href={item.path} element={NavBarLink}>
                            {item.text}
                        </Link>
                    </NavBarListItem>
                ))}
            </NavBarList>
        </NavBarContainer>
    );
};

export default NavBar;
