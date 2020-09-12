import styles from "../styles/components/text-field.css";

const TextField = ({ label, id, ...otherProps }) => (
    <>
        <style jsx>{styles}</style>

        <label for={id}>{label}</label>
        <input className="text-field" type="text" id={id} {...otherProps} />
    </>
);

export { TextField };