import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { MdMenu } from 'react-icons/md';

import Link from '../../infra/Link';
import {
    NavBarContainer,
    NavBarList,
    NavBarListItem,
    NavBarLink,
    NavBarLinkActive,
    NavBarBrandListItem,
    NavBarBrandingLink,
    NavBarFit,
    NavBarToggleButton,
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
    const [toggleState, setToggleState] = useState(false);

    function handleToggleMenuClick() {
        setToggleState((toggle) => !toggle);
    }

    return (
        <NavBarContainer className={`navbar ${className}`}>
            <NavBarList attachment="right">
                <NavBarBrandListItem>
                    <Link href="/" element={NavBarBrandingLink}>Inventare</Link>
                </NavBarBrandListItem>
                <NavBarToggleButton onClick={handleToggleMenuClick}>
                    <MdMenu size={32} color="#FFF" />
                </NavBarToggleButton>
                <NavBarFit />
                {items.map((item) => (
                    <NavBarListItem
                        className="navbar-item"
                        key={item.path}
                        visibleByToggle={toggleState}
                    >
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
