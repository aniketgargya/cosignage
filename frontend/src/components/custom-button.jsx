import styles from "../styles/components/custom-button.css";

const CustomButtom = ({ value, ...otherProps }) => (
    <>
        <style jsx>{styles}</style>

        <button className="custom-button" {...otherProps}>{value}</button>
    </>
);

export { CustomButtom };
