import style from "../styles/pages/index.css";

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
            <section>
                <div className="card">
                    <span className="title">Recognizable</span>
                    <p className="description">Visible from afar and universally uniform.</p>
                </div>
                <div className="card">
                    <span className="title">Customizable</span>
                    <p className="description">Choose from six visuals and a variety of sizes to meet your business' specific needs.</p>
                </div>
                <div className="card">
                    <span className="title">Affordable</span>
                    <p className="description">Accessible to all business of all sizes.</p>
                </div>
            </section>
        </>
    );
};

export default Index;