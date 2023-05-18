import {
  Navbar,
  Button,
  Link,
  Text,
  Card,
  Radio,
  Row,
} from "@nextui-org/react";

import styles from './Header.module.css'

const PlusLink = () => {
  return (
      <Link className={styles.uploadLink} href="/upload">+</Link>
  )
}

// container styles, flex row


export default function Header() {
  return (
    <header>
    <div className={styles.headerContainer}>
      <h1 className={styles.titleLarge}>
        What are you wearing today?
      </h1>
      <h1 className={styles.titleSmall}>
        WYWT?
      </h1>
      <PlusLink />
    </div>
    </header>
  );
}
