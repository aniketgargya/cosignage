import style from "../styles/pages/index.css";
import { Card } from "../components/card";

const Index = () => {
    return (
        <>
            <style jsx>{style}</style>

            <header>
                <img className="hero-image" />
                <div className="text"> <h1>Get Cosignage For Your Business</h1>
                    <p>Cosignage is a Coronavirus-communication Signage meant to assist you and your business in advertising your services to consumers during the COVID-19 pandemic. Universally recognizable and easily customizable, Cosignage is the perfect choice to aid your business in recovering from  the coronavirus pandemic.</p>
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
        </>
    );
};

export default Index;