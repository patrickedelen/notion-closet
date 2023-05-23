import { motion } from 'framer-motion'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShirt, faHatCowboy, faShoePrints, faSnowflake, faTableColumns } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from "react-redux"
import { selectFormType } from "../../store/clothesSlice";

import styles from './headerForm.module.css'

const IconContainer = ({ children }) => (
    <motion.button className={styles.iconButton}>
        {children}
    </motion.button>
)

export default function HeaderForm({ type }) {
    // define options for different types
    // set type in store on click
    // close the header form on click or x button

    // need interesting layout for different options

    const radius = '90px'
    const slice = 360/5

    const icons = [
        <FontAwesomeIcon icon={faShirt} size="2x" />,
        <FontAwesomeIcon icon={faSnowflake} size="2x" />,
        <FontAwesomeIcon icon={faShoePrints} size="2x" />,
        <FontAwesomeIcon icon={faHatCowboy} size="2x" />,
        <FontAwesomeIcon icon={faTableColumns} size="2x" />,
    ]

    return (
        <motion.div className={styles.formContainer}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h3 className={styles.title}>select a type for this piece</h3>
            <div className={styles.iconsContainer}
            >
                {icons.map((icon, i) => {
                    const rotate = slice * i
                    return (
                        <IconContainer key={i}>
                            {icon}
                        </IconContainer>
                    )
                })}
            </div>
            <motion.button className={styles.close}>
                <h3>close</h3>
            </motion.button>
        </motion.div>
    )
}