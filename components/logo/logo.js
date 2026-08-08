import Image from "next/image";
import img from "./img/companyLogo.png";
import styles from "../../styles/logoStyle.module.css";

const Logo = () => {
  return (
    <Image
      src={img}
      alt="Company logo"
      width={48}
      height={48}
      className={styles.image}
    />
  );
};

export default Logo;
