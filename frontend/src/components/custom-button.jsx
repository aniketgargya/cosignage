const CustomButton = ({ value, ...otherProps }) => (
    <>
        <style jsx>{`
            button {
                padding: 12px 40px;
                border: none;
                font-size: 15px;
                color: white;
                background-color: var(--color-primary);
                font: inherit;
                border-radius: 3px;
                transition: all .2s;
                cursor: pointer;
                outline: none;
                box-shadow: 0 5px 5px rgba(0, 0, 0, .3);
            }

            button:hover {
                box-shadow: 0 10px 5px rgba(0, 0, 0, .3);
            }

            button:disabled {
                background-color: var(--color-primary-dark);
                cursor: default;
                box-shadow: none;
            }

            @media only screen and (max-width: 400px) {
                button {
                    font-size: 13px;
                    padding: 12px 20px;
                }
            }
        `}</style>

        <button className="custom-button" {...otherProps}>{value}</button>
    </>
);

export { CustomButton };
