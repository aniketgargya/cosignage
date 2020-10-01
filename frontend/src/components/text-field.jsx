const TextField = ({ label, id, ...otherProps }) => (
    <>
        <style jsx>{`
            label {
                color: var(--color-gray-dark-2)
            }
            input {
                padding: 10px;
                width: 100%;
                outline: none;
                display: block;
                font: inherit;
            }
        `}</style>

        <label htmlFor={id}>{label}</label>
        <input className="text-field" type="text" id={id} {...otherProps} />
    </>
);

export { TextField };
