const NumberField = ({ onChange, value, min, max }) => {
    return (
        <>
            <style jsx>{`
                .quantity {
                    display: flex;
                }
                
                input, .quantity button {
                    font-weight: 900;
                    background: white;
                    border: 1px solid #aaa;
                }

                button {
                    padding: 12px;
                    outline: none;
                    cursor: pointer;
                }
                
                .quantity span {
                    text-align: center;
                    padding: 10px 30px;
                    border: 1px solid #aaa;
                    border-left: none;
                    border-right: none;
                    outline: none;
                    cursor: auto;
                }

                @media only screen and (max-width) {
                    .quantity input {
                        width: 50px;
                        padding: 2px;
                    }
                }
            `}</style>

            <div className="quantity">
                <button className="minus" onClick={() => onChange(value - 1)} disabled={value <= min}>-</button>
                <span type="number">{value}</span>
                <button className="plus" onClick={() => onChange(value + 1)} disabled={value >= max}>+</button>
            </div>
        </>
    );
};

export { NumberField };
