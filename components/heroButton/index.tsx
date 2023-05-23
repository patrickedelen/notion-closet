import { motion } from 'framer-motion'

import styles from './heroButton.module.css'

const variants = {
    wear: { scale: [1, 1.05, 1], background: 'linear-gradient(90deg, #69035F 0%, #001839 43.75%)', transition: { duration: 0.25 } },
    wearing: { scale: [1, 1.05, 1], background: 'linear-gradient(90deg, #69035F 40.02%, #001839 80.98%)', transition: { duration: 0.25 } },
};

export default function HeroButton({ title, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            variants={variants}
            initial={'wear'}
            className={styles.cardButton}
            >
            { title }
        </motion.button>
    )
}