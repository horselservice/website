import { usePrice } from "../../context/priceContext";
import styles from "../../styles/customerTypeToggle.module.css";

export default function CustomerTypeToggle() {
  const { customerType, setCustomerType } = usePrice();

  return (
    <div className={styles.toggle} aria-label="Välj kundtyp">
      <button
        type="button"
        onClick={() => setCustomerType("private")}
        aria-pressed={customerType === "private"}
        className={`${styles.button} ${
          customerType === "private" ? styles.active : ""
        }`}
      >
        Privat
      </button>

      <button
        type="button"
        onClick={() => setCustomerType("business")}
        aria-pressed={customerType === "business"}
        className={`${styles.button} ${
          customerType === "business" ? styles.active : ""
        }`}
      >
        Företag / Kommun
      </button>
    </div>
  );
}