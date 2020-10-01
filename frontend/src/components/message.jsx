const Message = ({ message, success }) => (
    <>
        <style jsx>{`
            .message {
                font-size: 15px;
                border: 2px currentColor solid;
                margin-top: 20px;
                border-radius: 2px;
                padding: 10px;
                font-weight: 700;
            }

            .message.positive {
                color: rgb(0, 128, 0);
                background-color: rgb(235, 255, 235);
            }

            .message.negative{
                color: red;
                background-color: rgb(255, 235, 235);
            }
        `}</style>

        <div className={`message ${success ? "positive" : "negative"}`}>
            {message}
        </div>
    </>
);

export { Message };
