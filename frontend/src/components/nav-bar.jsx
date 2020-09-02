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
                            <img className="logo" src="/img/icon/logo.png" />
                        </a>
                    </Link>
                </div>

                <ul className="links" ref={links}>
                    <Link href="/why-cosignage"><a>Why Cosignage?</a></Link>
                    <Link href="/order"><a>Order</a></Link>
                    <Link href="/contact"><a>Contact</a></Link>
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
