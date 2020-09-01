import styles from "../styles/components/custom-footer.css";

const CustomFooter = () => (
    <>
        <style jsx>{styles}</style>

        <footer>
            <div className="footer-mid">
                <div>
                    <div className="title">Contact Us</div>
                    <div className="email"><a href="mailto:contact@cosignage.info">contact@cosignage.info</a></div>
                    <div className="phone"><a href="tel:2176737346">(217)-673-7346</a></div>
                </div>
                <img src="/img/signs/mask-required.png" />
            </div>
            <p className="copyright">Copyright &copy; 2020 Cosignage. All rights reserved.</p>
        </footer>
    </>
);

export { CustomFooter };
