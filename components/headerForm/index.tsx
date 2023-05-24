// @ts-nocheck
import { motion } from 'framer-motion'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShirt, faHatCowboy, faShoePrints, faSnowflake, faTableColumns } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from "react-redux"
import { selectFormType, setFormState, setGenericNew } from "../../store/clothesSlice";

import styles from './headerForm.module.css'

const IconContainer = ({ children, onClick }) => (
    <motion.button
        className={styles.iconButton}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}    
    >
        {children}
    </motion.button>
)

const TextButton = ({ children, onClick }) => (
    <motion.button
        className={styles.textButton}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
    >
        {children}
    </motion.button>    
)

const types = {
    'type': {
        items: [
            'TOP',
            'BOTTOM',
            'OUTER',
            'SHOE',
            'OTHER'
        ],
        icons: [
            <FontAwesomeIcon icon={faShirt} size="2x" key="1" />,
            <FontAwesomeIcon icon={faTableColumns} size="2x" key="2" />,
            <FontAwesomeIcon icon={faSnowflake} size="2x" key="3" />,
            <FontAwesomeIcon icon={faShoePrints} size="2x" key="4" />,
            <FontAwesomeIcon icon={faHatCowboy} size="2x" key="5"/>,
        ],
        title: 'what type of piece is this?'
    },
    'cost': {
        items: [
            '200+',
            '100',
            '50',
            '20',
            '10'
        ],
        title: 'how much did it cost?'
    },
    'age': {
        items: [
            '<3mo',
            '3-6mo',
            '~1yr',
            '1+ years'
        ],
        title: 'when did you get it?'
    }
}

export default function HeaderForm() {
    // define options for different types
    // set type in store on click
    // close the header form on click or x button

    const type = useSelector(selectFormType)

    const dispatch = useDispatch()

    const closeForm = () => {
        dispatch(setFormState({ formOpen: false }))
    }

    const onSelect = (data) => {
        dispatch(setGenericNew({ type: type, data: data }))
        setTimeout(() => {
            dispatch(setFormState({ formOpen: false }))
        }, 100)
    }

    const radius = '90px'
    const slice = 360/5

    const { items, title, icons = [] } = types[type] 

    console.log('bla', items, title, icons)

    return (
        <motion.div className={styles.formContainer}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
        >
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.iconsContainer}
            >
                {items.map((item, i) => {
                    if (icons.length > 0) {
                        return (
                            <IconContainer key={i} onClick={() => onSelect(item)}>
                                {icons[i]}
                            </IconContainer>
                        )    
                    }
                    return (
                        <TextButton key={i} onClick={() => onSelect(item)}>
                            {item}
                        </TextButton>
                    )
                })}
            </div>
            <motion.button
                className={styles.close}
                onClick={closeForm}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                close
            </motion.button>
        </motion.div>
    )
}