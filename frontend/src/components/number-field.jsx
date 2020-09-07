import style from "../styles/components/number-field.css";

const NumberField = ({ onChange, value, min, max }) => {
    return (
        <>
            <style jsx>{style}</style>

            <div className="quantity">
                <button className="minus" onClick={() => onChange(value - 1)} disabled={value <= min}>-</button>
                <input type="number" value={value} readOnly />
                <button className="plus" onClick={() => onChange(value + 1)} disabled={value >= max}>+</button>
            </div>
        </>
    );
};

export { NumberField };
