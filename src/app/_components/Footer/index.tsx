import { FooterNav } from "./FooterNav";
import styles from "./index.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="inner">
        <FooterNav />
        <div className={styles.bottom}>
            <small className={styles.copyright}>Copyright © ONEPLUS 2025. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
