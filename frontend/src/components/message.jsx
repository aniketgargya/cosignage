import styles from "../styles/components/message.css";

const Message = ({ message, success }) => (
    <>
        <style jsx>{styles}</style>

        <div className={`message ${success ? "positive" : "negative"}`}>
            {message}
        </div>
    </>
);

export { Message };
