import styles from "../styles/components/custom-footer.css";

const CustomFooter = () => (
    <>
        <style jsx>{styles}</style>

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
