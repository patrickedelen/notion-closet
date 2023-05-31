// @ts-nocheck

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBarsStaggered, faCircle } from '@fortawesome/free-solid-svg-icons'

import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback } from "react"

import CustomIcon from '@/components/customIcon'

import styles from './Filter.module.css'

import { useSelector, useDispatch } from 'react-redux';
import { selectFiltering, selectFilterType, setFilter } from '../../store/clothesSlice'


export const CLOTHES_TYPES = [ 'TOP', 'BOTTOM', 'OUTER', 'SHOE', 'OTHER' ]


const variants = {
    open: {
        height: '220px'
    },
    closed: {
        height: '50px'
    }
}

const ActiveCircle = () => {
    return (
        <motion.div className={styles.activeCircle}>
            <FontAwesomeIcon icon={faCircle} color="white" size="2xs" />
        </motion.div>
    )
}

export default function Filter() {
    const dispatch = useDispatch()

    const filtering = useSelector(selectFiltering)
    const filterType = useSelector(selectFilterType)

    // state for open filter
    // selector for selected filter / filtering

    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)

    const onClickFilter = (type) => {
        console.log('filtering on ', type)
        dispatch(setFilter({ type }))
    }

    // motion change for height of filter bar

    return (
        <motion.div 
            className={styles.container}
            animate={open ? 'open' : 'closed'}
            variants={variants}
        >
            <motion.button
                onClick={toggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={styles.buttonMain}
            >
                <FontAwesomeIcon icon={faBarsStaggered} flip="horizontal" color="white" size="xl" />
            </motion.button>

            <AnimatePresence>
                { open && CLOTHES_TYPES.map(clothesType => (
                    <motion.button
                        key={clothesType}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={styles.button}
                        onClick={() => onClickFilter(clothesType)}
                    >
                        { filterType === clothesType && (
                            <ActiveCircle />
                        )}
                        <CustomIcon type={clothesType} color="white" size="24" />
                    </motion.button>
                ))}
            </AnimatePresence>
            

        </motion.div>
    )
}
