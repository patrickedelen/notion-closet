import {
  Navbar,
  Button,
  Link,
  Text,
  Card,
  Radio,
  Row,
} from "@nextui-org/react";

import { useState } from "react";

import styles from './Header.module.css'

import { motion } from 'framer-motion'

import HeaderForm from '@/components/headerForm'

import { useSelector, useDispatch } from "react-redux"
import { selectFormOpen, setFormState } from "../../store/clothesSlice";

const PlusLink = () => {
  return (
      <Link className={styles.uploadLink} href="/upload">+</Link>
  )
}

// container styles, flex row

const headerVariants = {
  closed: { height: '100px', transition: { duration: 0.5 }},
  open: { height: '90%', transition: { duration: 0.5 }},
}

export default function Header() {
  const [open, setOpen] = useState(true);
  console.log('got render', open)
  const dispatch = useDispatch()


  const openHeader = () => {
    console.log('got open event', open)
    setOpen(!open)
  }

  const closeHeader = () => {
    console.log('got close event')
    dispatch(setFormState({ formOpen: false }))
  }

  const formOpen = useSelector(selectFormOpen)

  console.log('formOpen', formOpen)

  return (
    <header className={styles.shadowHeader}>
      <motion.div 
        animate={{
          height: formOpen ? '90vh' : 100,
        }}
        className={styles.headerContainer}
      >
        <div className={styles.headerRow}>
          <Link href="/" className={styles.titleLarge}>
            What are you wearing today?
          </Link>
          <Link href="/" className={styles.titleSmall}>
            WYWT?
          </Link>
          <PlusLink />
        </div>

        {
          formOpen && 
          <>
            <HeaderForm />
            <span className={styles.closeArea} onClick={closeHeader}></span>
          </>
        }
        <div className={styles.headerBottom}></div>
      </motion.div>
      {/* {
        formOpen && <span className={styles.closeArea} onClick={closeHeader}>

        </span>
      } */}
    </header>
  );
}
