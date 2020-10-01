import { Card, CustomButton } from "../components";
import Head from "next/head";
import Link from "next/link";

const Index = () => {
    return (
        <>
            <style jsx>{`
                header {
                    width: 100%;
                    background-color: var(--color-gray-light-1);
                    
                    display: flex;
                }

                header .hero-picture {
                    width: 50%;
                    align-self: center;
                }

                header .hero-image {
                    width: 100%;
                }

                header .text {
                    flex: 1;
                    padding: 30px 48px;
                    text-align: right;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                header .text h1 {
                    margin-bottom: 15px;
                }

                .cards-container {
                    padding: 100px 0;
                    background-color: var(--color-gray-light-2);
                }

                .cards {
                    margin: 0 auto;
                    width: 75%;
                    max-width: 1000px;
                    min-width: 800px;
                    display: flex;
                    justify-content: space-between;
                }

                .our-signs {
                    padding: 100px 48px;
                }

                .our-signs h1 {
                    text-align: center;
                    margin-bottom: 50px;
                }

                .signs {
                    max-width: 1300px;
                    margin: 0 auto;

                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    row-gap: 75px;
                    justify-items: center;
                }

                .signs .sign {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .signs .sign img {
                    width: 200px;
                }

                .signs .sign span {
                    text-align: center;
                    font-size: 24px;
                    color: var(--color-gray-dark-1);
                    margin-top: 20px;
                }

                .our-signs .cta-container {
                    margin-top: 50px;
                    text-align: center;
                }

                @media only screen and (max-width: 900px) {
                    header {
                        flex-direction: column;
                    }

                    header .hero-picture {
                        width: 100%;
                    }

                    header .text {
                        text-align: left;
                        padding-top: 60px;
                        padding-bottom: 60px;
                    }

                    .cards-container {
                        padding: 50px 0;
                    }

                    .cards {
                        flex-direction: column;
                        align-items: center;
                        width: 100%;
                        max-width: none;
                        min-width: 0;
                    }

                    .cards > :global(*) {
                        margin-bottom: 30px;
                    }

                    .signs {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .signs .sign img {
                        width: 150px;
                    }
                }

                @media only screen and (max-width: 600px) {
                    .our-signs {
                        padding: 48px;
                    }

                    .signs {
                        grid-template-columns: repeat(1, 1fr);
                    }
                }

                @media only screen and (max-width: 550px) {
                    header .text {
                        padding-top: 30px;
                        padding-bottom: 30px;
                    }
                }
            `}</style>

            <Head>
                <title>Cosignage</title>
                <meta name="description" content="Cosignage is a universally recognizable and easily customizable coronavirus-communication signage meant to assist you and your business in advertising your services to consumers during the COVID-19 pandemic." />
            </Head>

            <header>
                <picture className="hero-picture">
                    <source media="(max-width: 600px)" srcSet="/img/big/hero-image/600.jpg" />
                    <source media="(max-width: 900px)" srcSet="/img/big/hero-image/900.jpg" />
                    <source media="(max-width: 1000px)" srcSet="/img/big/hero-image/1000.jpg" />
                    <source media="(max-width: 1500px)" srcSet="/img/big/hero-image/1500.jpg" />
                    <source media="(max-width: 2000px)" srcSet="/img/big/hero-image/2000.jpg" />
                    <source media="(max-width: 2500px)" srcSet="/img/big/hero-image/2500.jpg" />
                    <img className="hero-image" src="/img/big/hero-image/max.jpg" alt="Outdoor seating and mask required cosignage signs hung on window" />
                </picture>
                <div className="text">
                    <h1>Get Cosignage For Your Business</h1>
                    <p>Cosignage is a Coronavirus-communication signage meant to assist you and your business in advertising your services to consumers during the COVID-19 pandemic. Universally recognizable and easily customizable, Cosignage is the perfect choice to aid your business in recovering from  the coronavirus pandemic.</p>
                </div>
            </header>

            <section className="cards-container">
                <div className="cards">
                    <Card
                        iconUrl="/img/icon/card/world.svg#world"
                        title="Recognizable"
                        description="Visible from afar and universally uniform."
                    />
                    <Card
                        iconUrl="/img/icon/card/pencil.svg#pencil"
                        title="Customizable"
                        description="Choose from six visuals and a variety of sizes to meet your business' specific needs."
                    />
                    <Card
                        iconUrl="/img/icon/card/dollar.svg#dollar"
                        title="Affordable"
                        description="Accessible to all business of all sizes."
                    />
                </div>
            </section>

            <section className="our-signs">
                <h1>Our Signs</h1>
                <div className="signs">
                    {
                        [
                            {
                                imageUrl: "/img/signs/mask-required.png",
                                sign: "Mask Required"
                            },
                            {
                                imageUrl: "/img/signs/delivery.png",
                                sign: "Delivery"
                            },
                            {
                                imageUrl: "/img/signs/curbside-pickup.png",
                                sign: "Curbside Pickup"
                            },
                            {
                                imageUrl: "/img/signs/outdoor-seating.png",
                                sign: "Outdoor Seating"
                            },
                            {
                                imageUrl: "/img/signs/max-capacity.png",
                                sign: "Maximum Capacity"
                            },
                            {
                                imageUrl: "/img/signs/minority-owned.png",
                                sign: "Minority Owned"
                            }
                        ].map(({ imageUrl, sign }, i) => (
                            <div key={i} className="sign">
                                <img src={imageUrl} alt={`Cosignage ${sign}`} />
                                <span>{sign}</span>
                            </div>
                        ))
                    }
                </div>

                <div className="cta-container">
                    <Link href="/order"><CustomButton value="Order Now" /></Link>
                </div>
            </section>
        </>
    );
};

export default Index;
