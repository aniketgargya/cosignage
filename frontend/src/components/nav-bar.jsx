import { useState, useRef, useEffect } from "react";
import { HamburgerSpin } from "react-animated-burgers";
// import { useCart } from "../contexts";

const NavBar = () => {
    // const cart = useCart();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const links = useRef();

    useEffect(() => {
        if (sidebarOpen) links.current?.classList.add("sidebar-open");
        else links.current?.classList.remove("sidebar-open");
    }, [sidebarOpen]);

    return (
        <>
            <style jsx>{`

                nav {
                    padding: 2rem 5rem;
                    color: var(--gray-dark-1);
                    width: 100%;
                    /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1); */
                    
                    display: flex;
                    align-items: center;
                }

                .title {
                    margin-right: auto;
                }
                
                h1 {
                    text-transform: uppercase;
                    font-size: 5rem;
                    font-weight: 200;
                }

                .menu-container {
                    display: none;
                }

                .links {
                    width: 30%;

                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                li {
                    list-style: none;
                    font-size: 1.6rem;
                    font-weight: 200;
                }

                a {
                    position: relative;
                    cursor: pointer;
                }

                a::before {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    bottom: -20%;
                    left: 0;
                    background-color: #000;
                    visibility: hidden;
                    transform: scaleX(0);
                    transition: all 0.2s ease-in-out 0s;
                }
                
                a:hover::before {
                    visibility: visible;
                    transform: scaleX(1);
                    }

                @media only screen and (max-width: 1500px) {
                    .links {
                        width: 40%;
                    }
                }

                @media only screen and (max-width: 1100px) {
                    h1 {
                        font-size: 3.5rem;
                    }

                    li {
                        font-size: 1.2rem;
                        font-weight: 400;
                    }
                }

                @media only screen and (max-width: 900px) {
                    nav {
                        padding: 2rem 3rem;
                    }

                    .links {
                        width: 45%;
                    }
                }


                @media only screen and (max-width: 800px) {
                    .menu-container {
                        display: block;
                        z-index: 100;
                    }

                    .links {
                        position: absolute;
                        top: 0;
                        height: 100vh;
                        width: 100vw;
                        background-color: rgba(255, 255, 255, 0.9);
                        left: -100%;
                        z-index: 9;
                        transition: left .5s;

                        flex-direction: column;
                        justify-content: center;
                    }

                    .links li {
                        font-size: 2.5rem;
                    }

                    .links li:not(last-child) {
                        margin-bottom: 2rem;
                    }

                    .links.sidebar-open {
                        left: 0;
                    }
                }

                @media only screen and (max-width: 450px) {
                    nav {
                        padding: 2rem;
                    }

                    h1 {
                        font-size: 3rem;
                    }
                }

                @media only screen and (max-width: 350px) {
                    h1 {
                        font-size: 2.5rem;
                    }
                }

            `}</style>

            <nav>
                <div className="title">
                    <h1>Cosignage</h1>
                </div>

                <div className="menu-container">
                    <HamburgerSpin isActive={sidebarOpen} toggleButton={() => setSidebarOpen(s => !s)} buttonStyle={{ outline: "none" }} barColor="var(--gray-dark-1)" />
                </div>

                <ul className="links" ref={links}>
                    <li><a>Why Cosignage?</a></li>
                    <li><a>Order</a></li>
                    <li><a>Contact</a></li>
                    <li><a>My Cart</a></li>
                </ul>
            </nav>
        </>
    );
};

export { NavBar };
