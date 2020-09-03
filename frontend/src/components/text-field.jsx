import styles from "../styles/components/text-field.css";

const TextField = ({ label, ...otherProps }) => (
    <>
        <style jsx>{styles}</style>

        <label>{label}</label>
        <input className="text-field" type="text" {...otherProps} />
    </>
);

export { TextField };