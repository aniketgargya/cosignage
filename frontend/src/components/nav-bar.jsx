import { useState, useRef, useEffect } from "react";
import { HamburgerSpin } from "react-animated-burgers";
import Link from "next/link";
import { useCart } from "../contexts";

const NavBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const links = useRef();
    const { cart } = useCart();

    const cartTotal = Object.keys(cart).reduce((a, b) => {
        return Object.keys(cart[b]).reduce((c, d) => cart[b][d] + c, 0) + a;
    }, 0);

    useEffect(() => {
        if (sidebarOpen) links.current?.classList.add("links-open");
        else links.current?.classList.remove("links-open");
    }, [sidebarOpen]);

    return (
        <>
            <style jsx>{`
                nav {
                    padding: 32px 48px;
                    width: 100%;
                    position: relative;
                    background-color: var(--color-white);
                    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.269);
                    
                    display: flex;
                    align-items: center;
                }

                .logo-container {
                    margin-right: auto;
                }

                .logo {
                    width: 250px;
                }

                .links {
                    list-style: none;
                    z-index: 100;
                    display: flex;
                }

                .links li {
                    margin-right: 30px;
                }

                .links a {
                    text-decoration: none;
                    color: var(--color-gray-dark-2);
                    font-size: 18px;
                    cursor: pointer;
                    position: relative;
                }

                .shopping-section {
                    position: relative;
                }

                .shopping-cart {
                    width: 40px;
                }

                .shopping-total {
                    position: absolute;
                    right: 0;
                    top: 0;
                    transform: translate(70%, -70%);
                    font-size: 12px;
                    background-color: var(--color-primary);
                    border-radius: 100%;
                    color:white;
                    padding: 5px;
                    min-width: 25px;
                    text-align: center;
                }

                .menu-container {
                    display: none;
                    z-index: 100;
                }

                .links li a::before {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    bottom: -5%;
                    left: 0;
                    background-color: #000;
                    visibility: hidden;
                    transform: scaleX(0);
                    transition: all 0.2s ease-in-out 0s;
                }

                .links li a:hover::before {
                    visibility: visible;
                    transform: scaleX(1);
                }

                @media only screen and (max-width: 900px) {
                    .menu-container {
                        display: block;
                    }

                    .links {
                        position: absolute;
                        height: 100vh;
                        width: 100vw;
                        top: 0;
                        left: -100%;
                        background-image: linear-gradient(to left, rgba(255, 255, 255, 0.95), rgba(226, 226, 226, 0.95));
                        transition: left .5s;

                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }

                    .links-open {
                        left: 0;
                    }

                    .links li {
                        margin: 0 0 20px 0;
                    }

                    .shopping-section {
                        margin-right: 40px;
                    }
                }

                @media only screen and (max-width: 600px) {
                    nav {
                        padding: 28px;
                    }

                    .logo {
                        width: 175px;
                    }

                    .shopping-section {
                        margin-right: 30px;
                    }

                    .shopping-cart {
                        width: 35px;
                    }
                }

                @media only screen and (max-width: 400px) {
                    nav {
                        padding: 28px 10px;
                    }

                    .shopping-section {
                        margin-right: 25px;
                    }

                    .shopping-cart {
                        width: 30px;
                    }
                }
            `}</style>

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
                            <li key={i}><Link href={href}><a onClick={() => setSidebarOpen(false)}>{a}</a></Link></li>
                        ))
                    }
                </ul>

                <Link href="/my-cart"><a className="shopping-section">
                    <img className="shopping-cart" alt="Shopping Cart Icon" src="/img/icon/themed/shopping-cart.png" />
                    <span className="shopping-total">{cartTotal}</span>
                </a></Link>

                <div className="menu-container">
                    <HamburgerSpin isActive={sidebarOpen} toggleButton={() => setSidebarOpen(s => !s)} buttonStyle={{ outline: "none", padding: "0" }} barColor="var(--color-gray-dark-2)" />
                </div>
            </nav>
        </>
    );
};

export { NavBar };
