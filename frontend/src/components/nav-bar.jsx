import { useState, useRef, useEffect } from "react";
import { HamburgerSpin } from "react-animated-burgers";
import Link from "next/link";
import styles from "../styles/components/nav-bar.css";

const NavBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const links = useRef();

    useEffect(() => {
        if (sidebarOpen) links.current?.classList.add("links-open");
        else links.current?.classList.remove("links-open");
    }, [sidebarOpen]);

    return (
        <>
            <style jsx>{styles}</style>

            <nav>
                <div className="logo-container">
                    <Link href="/">
                        <a>
                            <img className="logo" src="/img/icon/themed/logo.png" alt="Cosignage Logo" />
                        </a>
                    </Link>
                </div>

                <ul className="links" ref={links}>
                    {
                        [
                            {
                                href: "/why-cosignage",
                                a: "Why Cosignage?"
                            },
                            {
                                href: "/order",
                                a: "Order"
                            },
                            {
                                href: "/contact",
                                a: "Contact"
                            }
                        ].map(({ href, a }, i) => (
                            <Link key={i} href={href}><a onClick={() => setSidebarOpen(false)}>{a}</a></Link>
                            <li key={i}><Link href={href}><a onClick={() => setSidebarOpen(false)}>{a}</a></Link></li>
                        ))
                    }
                </ul>

                <Link href="/my-cart"><a><img className="shopping-cart" src="/img/icon/shopping-cart.png" /></a></Link>

                <div className="menu-container">
                    <HamburgerSpin isActive={sidebarOpen} toggleButton={() => setSidebarOpen(s => !s)} buttonStyle={{ outline: "none", padding: "0" }} barColor="var(--color-gray-dark-2)" />
                </div>
            </nav>
        </>
    );
};

export { NavBar };
