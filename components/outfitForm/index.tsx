// @ts-nocheck
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Image, Badge, Loading } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown, faX } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from "react-redux"
import { selectOutfitIds, selectOutfitFormOpen, selectShowClothesBar, setHeaderBarOpen, resetState, removeItem, selectWearingCount, setOutfitFormOpen, createOutfit, selectNotionUrl } from "../../store/outfitSlice"
import { selectItemById } from '../../store/clothesSlice'


import HeroButton from '@/components/heroButton'

import styles from './outfitForm.module.css'


const ImageWithFallback = (props) => {
    const { src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);
    const [fallbackStyle, setFallbackStyle] = useState('');
    const [fallbackTries, setFallbackTries] = useState(0);

    const pollForFullImage = () => {
        if (fallbackTries < 10) {
            setFallbackTries(fallbackTries + 1);

            setTimeout(() => {
                fetch(src, { mode: 'no-cors', method: 'HEAD' })
                    .then((res) => {
                        if (res.ok) {
                            setImgSrc(src)
                            setFallbackStyle('')
                        } else {
                            pollForFullImage()
                        }
                    })
                    .catch((error) => {
                        pollForFullImage()
                    })
            }, 5000)
        } else {
            setFallbackStyle(styles.fallbackImage)
        }
    }
    

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => {
                setFallbackStyle(styles.fallbackImage)
                setImgSrc(fallbackSrc)
                // pollForFullImage() -- fix
            }}
            alt="clothing item"
            className={[styles.image, fallbackStyle]}
        />
    );
};

const ClothesItem = ({ id }) => {
    const dispatch = useDispatch()
    const item = useSelector(selectItemById(id))
    const wearingCount = useSelector(selectWearingCount)

    const onClickRemove = () => {
        console.log('got click remove')
        if (wearingCount === 1) {
            dispatch(setOutfitFormOpen(false))
        }
        dispatch(removeItem({ id }))

    }

    console.log(item)

    const heroUrl = item.heroUrl

    const listItem = {
        hidden: { opacity: 0, scale: 0.9 },
        enter: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
    };

    return (
        <motion.div className={styles.clothesItem}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={listItem}
            key={id}
        >
            <Badge
                content={(
                    <button className={styles.removeButton} onClick={onClickRemove}>
                        <FontAwesomeIcon icon={faX} size="md" />
                    </button>
                )}
                css={{ background: 'black', color: 'white' }}
                size="md"
                disableAnimation
            >

            <ImageWithFallback 
                src={heroUrl}
                fallbackSrc={item.imageUrl}
                />
            </Badge>
        </motion.div>
    )
}

export default function HeaderForm() {
    // define options for different types
    // set type in store on click
    // close the header form on click or x button

    const dispatch = useDispatch()
    const router = useRouter()

    const [title, setTitle] = useState('confirm')

    console.log('rerender')

    const outfitFormOpen = useSelector(selectOutfitFormOpen)
    const showClothesBar = useSelector(selectShowClothesBar)
    const notionUrl = useSelector(selectNotionUrl)
    const [submitting, setSubmitting] = useState(false)

    const clothesIds = useSelector(selectOutfitIds)
    console.log(clothesIds)

    const resetOutfit = () => {
        dispatch(resetState())
    }

    const toggleOutfitForm = () => {
        dispatch(setOutfitFormOpen(!outfitFormOpen))
    }


    const submitOutfit = () => {
        dispatch(createOutfit())
        setSubmitting(true)
        console.log('submitting outfit')
        setTitle('submitted!')
        // setTimeout(() => {

        //     setTimeout(() => {
        //         dispatch(resetState())
        //         setTitle('confirm')
        //     }, 1000)
        // }, 500)
    }

    const openPage = () => {
        dispatch(resetState())
        window.open(notionUrl, '_blank')
    }

    const containerVariants = {
        hidden: { opacity: 0, x: 10 },
        enter: { opacity: 1, x: 0, height: '7vh' },
        exit: { opacity: 0, x: -10 },
        outfitFormOpen: { opacity: 1, x: 0, height: '90vh' },
    }

    const height = showClothesBar ? '7vh' : outfitFormOpen ? '90vh' : '0vh'

    const containerClass = outfitFormOpen ? styles.outfitFormContainer : styles.barContainer

    return (
        <>
            <AnimatePresence>
                {
                    outfitFormOpen && (
                        <motion.div key="a" className={styles.barContainer} initial={{opacity: 0}} 
                        animate={{opacity: 1}} exit={{opacity: 0}}
                        >
                            <AnimatePresence>
                        {
                            clothesIds.map((id, i) => (
                                <ClothesItem id={id} key={id} outfitFormOpen={outfitFormOpen} />
                            ))
                        }
                        </AnimatePresence>
                        <motion.div className={styles.submitButtonContainer}>
                            {notionUrl ? (
                                <motion.button key="b"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} onClick={openPage} className={styles.confirmButton}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.75 }}
                                >
                                    Visit Page
                                </motion.button>
                            ) : (
                                <>
                            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} onClick={submitOutfit} className={styles.confirmButton}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.75 }}
                            >
                                {submitting ? (<Loading type="points" color="currentColor" size="md" />) : title}
                            </motion.button><motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} onClick={resetOutfit} className={styles.confirmButton}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.75 }}
                            >
                                clear
                            </motion.button>
                                </>
                            )}

                        </motion.div>
                        

                        </motion.div>
                    )
                }
            </AnimatePresence>
        
                
                
            

        </>

    )

}