const Card = ({ iconUrl, title, description }) => (
    <>
        <style jsx>{`
            .card {
                background-color: var(--color-primary-dark);
                width: 250px;
                min-height: 325px;
                padding: 25px 40px;
                border-radius: 7px;
                box-shadow: 0 8px 4px rgba(0, 0, 0, 0.5);
            }

            .card img {
                height: 57px;
                width: 57px;
                display: block;
                margin: 0 auto 30px auto;
            }

            .card .title, .card .description {
                color: var(--color-white);
                text-align: center;
            }

            .card .title {
                display: block;
                font-size: 26px;
                margin-bottom: 30px;
            }

            .card .description {
                display: inline-block;
                font-size: 18px;
                text-align: center;
            }
        `}</style>

        <div className="card">
            <img src={iconUrl} alt={description} />
            <span className="title">{title}</span>
            <span className="description">{description}</span>
        </div >
    </>
);

export { Card };
