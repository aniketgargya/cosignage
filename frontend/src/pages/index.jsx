import { useCart } from "../contexts";

const Index = () => {
    return (
        <>
            <style jsx>{`

            header {
                width: 100%;

                display: flex;
            }

            .header__image {
                width: 50%;
                height: 45rem;
                background-image: url("store.jpg");
                background-size: cover;
                background-position: center;
                filter: grayscale(80%);
            }

            .header__text {
                width: 50%;
                padding: 4rem 4rem;
                background-color: #fafafa;
            }

            h2 {
                font-size: 4rem;
                font-weight: 200;
            }

            p {
                font-size: 1.6rem;
                font-weight: 500;
            }

            .contact-us {
                padding: 10rem 0;
                text-align: center;
            }

            .contact-button {
                display: inline-block;
                font-size: 3rem;
                border: 2px solid currentColor;
                padding: 2rem 6rem;
                border-radius: 5px;
                cursor: pointer;
                transition: all .25s;
            }

            .contact-button:hover {
                background-color: black;
                color: white;
            }

            p:not(last-child) {
                margin-bottom: 2rem;
            }

            @media only screen and (max-width: 1500px) {
                h2 {
                    font-size: 3rem;
                }
            }

            @media only screen and (max-width: 1050px) {
                header {
                    flex-direction: column;
                }

                .header__image {
                    width: 100%;
                }

                .header__text {
                    width: 100%;
                    padding: 4rem 8rem;
                }

                h2 {
                    font-size: 4rem;
                    font-weight: 200;
                    margin-bottom: 2rem;
                }
            }

            @media only screen and (max-width: 500px) {
                h2 {
                    font-size: 2.8rem;

                }

                .contact-button {
                    font-size: 2.5rem;
                    padding: 1.5rem 4rem;
                }
            }

            `}</style>

            <header>
                <div className="header__image"></div>
                <div className="header__text">
                    <h2>Get Cosignage For Your Business</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus rerum iusto nulla quibusdam odit saepe iure cupiditate eum optio perspiciatis tenetur, cum eius odio pariatur! Dolor illo quidem at delectus? Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus rerum iusto nulla quibusdam odit saepe iure cupiditate eum optio perspiciatis tenetur, cum eius odio pariatur!</p>
                </div>
            </header>
        </>
    );
};

export default Index;