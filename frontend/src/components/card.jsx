import styles from "../styles/components/card.css";

const Card = ({ iconUrl, title, description }) => (
    <>
        <style jsx>{styles}</style>

        <div className="card">
            <img src={iconUrl} alt={description} />
            <span className="title">{title}</span>
            <span className="description">{description}</span>
        </div >
    </>
);

export { Card };
