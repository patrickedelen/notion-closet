
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { motion, AnimatePresence } from "framer-motion"

import styles from './CustomIcon.module.css'

export default function CustomIcons({ type = '', color = '#333', size = '36', checked = false }) {
    let svgIcon = <></>

    switch (type) {
        case 'TOP':
            svgIcon = <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9L18 4H30L39 9L43 24L35 30V44H13V30L5 24L9 9Z" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 31L13 24" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M35 31L35 24" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            break;    
        case 'BOTTOM':
            svgIcon = <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33 44H42L38 4H10L6 44H15L24 19L33 44Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 4V9.5" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.0004 4C17.0004 4 17.0004 10 15.0004 12C13.0004 14 8.90039 15 8.90039 15" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M31 4C31 4 31 10 33 12C35 14 39.1 15 39.1 15" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            break;
        case 'OUTER':
            svgIcon = <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 10L18 4H30L42 10L40 35H34V44H24H14V35H8L6 10Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 35L14 20" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M34 35V20" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 10C27.3137 10 30 7.31371 30 4H18C18 7.31371 20.6863 10 24 10Z" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            break;
        case 'OTHER':
            svgIcon = <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="34" width="40" height="10" rx="2" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 26V34" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 26V34" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M33 26V34" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/><circle cx={size} cy="8" r="4" fill="none" stroke={color} strokeWidth="4"/><path d="M8 34C8 25.75 9 12 24 12C39 12 40 25.75 40 34" stroke={color} strokeWidth="4"/></svg>
            break;
        case 'SHOE':
            svgIcon = <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 6H28V14H44V6Z" stroke={color} strokeWidth="4" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M44 14V36C44 37.11 43.11 38 42 38H8C5.79 38 4 36.21 4 34V28C4 23.58 7.58 20 12 20H28V14H44Z" fill="none" stroke={color} strokeWidth="4" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 26V20" stroke={color} strokeWidth="4" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 26V20" stroke={color} strokeWidth="4" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 42V38" stroke={color} strokeWidth="4" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 42V38" stroke={color} strokeWidth="4" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 42V38" stroke={color} strokeWidth="4" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M34 42V38" stroke={color} strokeWidth="4" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M41 42V38" stroke={color} strokeWidth="4" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 20L12 20" stroke={color} strokeWidth="4" strokeMiterlimit="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            break;
    }

    return (
        <AnimatePresence>
            {checked && <motion.span initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}><FontAwesomeIcon key="1" icon={faCheck} color={color} size="2x" className={styles.checkedFa} /></motion.span>}
            <motion.div key="2" animate={{ opacity: checked ? 0.2 : 1}} >{svgIcon}</motion.div>
        </AnimatePresence>
    )
}
