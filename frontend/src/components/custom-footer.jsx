const CustomFooter = () => (
    <>
        <style jsx>{`
            footer {
                background-color: var(--color-gray-light-2);
                padding: 100px;
            }

            footer .footer-mid {
                display: flex;
                justify-content: space-between;
                max-width: 1200px;
                margin: 0 auto;
                align-items: center;
            }

            footer img.logo {
                width: 100px;
                height: 100px;
            }

            footer .contact-us .email, footer .contact-us .phone {
                padding: 12px 0;
            }

            footer .contact-us a {
                color: var(--color-gray-dark-2);
                font-size: 18px;
            }

            footer .title {
                color: var(--color-primary);
                font-size: 28px;
            }

            footer .social-links {
                margin: 0 auto;
                margin-top: 30px;

                display: flex;
                justify-content: center;
            }

            footer .social-links img {
                width: 35px;
            }

            footer .social-links a:not(:last-child) {
                margin-right: 60px;
            }

            footer .copyright {
                margin-top: 30px;
                text-align: center;
                font-size: 20px;
            }

            @media only screen and (max-width: 800px) {
                footer {
                    padding: 50px 20px;
                }

                .footer-mid {
                    flex-direction: column-reverse;
                    text-align: center;
                }

                footer .title {
                    font-size: 22px;
                }

                footer img.logo {
                    margin-bottom: 30px;
                }

                footer .social-links img {
                    width: 30px;
                }

                footer .copyright {
                    margin-top: 30px;
                    font-size: 15px;
                }
            }
        `}</style>

        <footer>
            <div className="footer-mid">
                <div className="contact-us">
                    <div className="title">Contact Us</div>
                    <div className="email"><a href="mailto:contact@cosignage.info">contact@cosignage.info</a></div>
                    <div className="phone"><a href="tel:2176737346">(217)-673-7346</a></div>
                </div>
                <img className="logo" src="/img/icon/themed/logo-two.png" alt="Cosignage Logo" />
            </div>
            <div className="social-links">
                <a href="https://www.facebook.com/cosignage"><img src="/img/icon/social-media/facebook.svg" alt="Facebook Logo" /></a>
                <a href="https://twitter.com/cosignage_"><img src="/img/icon/social-media/twitter.svg" alt="Twitter Logo" /></a>
                <a href="https://www.instagram.com/cosignage/"><img src="/img/icon/social-media/instagram.svg" alt="Instagram Logo" /></a>
            </div>
            <p className="copyright">&copy; 2020 Cosignage, LLC. All Rights Reserved.</p>
        </footer>
    </>
);

export { CustomFooter };
