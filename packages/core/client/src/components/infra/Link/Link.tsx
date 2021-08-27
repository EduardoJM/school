import React, {
    ForwardRefExoticComponent,
    forwardRef,
    LinkHTMLAttributes,
    ComponentType,
    RefAttributes,
} from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

export interface LinkProps extends Omit<LinkHTMLAttributes<HTMLAnchorElement>, 'href' | 'as'>, NextLinkProps {
    element?: ComponentType;
}

export const LinkRawElement: ForwardRefExoticComponent<
RefAttributes<HTMLAnchorElement>
> = forwardRef<HTMLAnchorElement>(({ children, ...rest }, ref) => (
    <a ref={ref} {...rest}>{children}</a>
));

const Link: React.FC<LinkProps> = (props) => {
    const {
        children,
        element: Element = LinkRawElement,
        href,
        as,
        replace,
        scroll,
        shallow,
        passHref,
        prefetch,
        locale,
        ...nativeProps
    } = props;

    return (
        <NextLink
            href={href}
            as={as}
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            passHref={passHref || true}
            prefetch={prefetch}
            locale={locale}
        >
            <Element {...nativeProps}>
                {children}
            </Element>
        </NextLink>
    );
};

export default Link;
