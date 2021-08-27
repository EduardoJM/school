import React from 'react';
import { useRouter } from 'next/router';
import Link from '../../infra/Link';
import {
    NavBarContainer,
    NavBarList,
    NavBarListItem,
    NavBarLink,
    NavBarLinkActive,
    NavBarBrandingLink,
    NavBarFit,
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
    const router = useRouter();

    return (
        <NavBarContainer className={`navbar ${className}`}>
            <NavBarList attachment="right">
                <NavBarListItem>
                    <Link href="/" element={NavBarBrandingLink}>Inventare</Link>
                </NavBarListItem>
                <NavBarFit />
                {items.map((item) => (
                    <NavBarListItem className="navbar-item" key={item.path}>
                        <Link
                            href={item.path}
                            element={router.asPath === item.path ? NavBarLinkActive : NavBarLink}
                        >
                            {item.text}
                        </Link>
                    </NavBarListItem>
                ))}
            </NavBarList>
        </NavBarContainer>
    );
};

export default NavBar;
