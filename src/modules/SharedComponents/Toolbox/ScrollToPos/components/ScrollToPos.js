import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function ScrollToPos({ selector = window, x = 0, y = 0 }) {
    const { pathname } = useLocation();

    useEffect(() => {
        typeof selector === 'string' ? document.querySelector(selector)?.scrollTo(x, y) : selector?.scrollTo(x, y);
    }, [pathname, selector, x, y]);

    return null;
}
