import style from "../styles/pages/index.css";
import { Card } from "../components/card";
import Head from "next/head";

const Index = () => {
    return (
        <>
            <style jsx>{style}</style>

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
                        iconUrl="/img/icon/world.svg#world"
                        title="Recognizable"
                        description="Visible from afar and universally uniform."
                    />
                    <Card
                        iconUrl="/img/icon/pencil.svg#pencil"
                        title="Customizable"
                        description="Choose from six visuals and a variety of sizes to meet your business' specific needs."
                    />
                    <Card
                        iconUrl="/img/icon/dollar.svg#dollar"
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
            </section>
        </>
    );
};

export default Index;