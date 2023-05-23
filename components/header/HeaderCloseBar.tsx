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

export default function HeaderCloseBar() {
    const dispatch = useDispatch()
    const formOpen = useSelector(selectFormOpen)

    
    const closeHeader = () => {
        dispatch(setFormState({ formOpen: false, formType: 'cost' }))
    }

    return (
        <>
            {
                formOpen && 
                <span className={styles.closeArea} onClick={closeHeader}></span>
            }
        </>
    )
}