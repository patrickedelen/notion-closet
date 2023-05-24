// @ts-nocheck
import { motion } from 'framer-motion'
import { Link } from '@nextui-org/react'
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShirt, faHatCowboy, faShoePrints, faSnowflake, faTableColumns } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from "react-redux"
import { selectFormType, setFormState, setGenericNew, setSuccessScreen } from "../../store/clothesSlice";

import styles from './successScreen.module.css'

export default function SuccessScreen() {
    const dispatch = useDispatch()
    const router = useRouter()

    const onClickHome = () => {
        dispatch(setSuccessScreen(false))
        router.push('/')
    }

    return (
        <motion.div
            className={styles.successContainer}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1>item uploaded :)</h1>
            <h3>processing now...</h3>

            <motion.button
                className={styles.close}
                onClick={onClickHome}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                go home
            </motion.button>
        </motion.div>
    )

}