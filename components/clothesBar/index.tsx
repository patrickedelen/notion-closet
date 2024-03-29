// @ts-nocheck
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Image } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from "react-redux"
import { selectOutfitIds, selectOutfitFormOpen, setOutfitFormOpen, selectShowClothesBar, setHeaderBarOpen, resetState } from "../../store/outfitSlice"
import { selectItemById } from '../../store/clothesSlice'

import HeroButton from '@/components/heroButton'

import styles from './clothesBar.module.css'

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
    const item = useSelector(selectItemById(id))
    console.log(item)

    const heroUrl = item.imageUrl.replace('notion-closet', 'wywt-output') + '-hero'

    const listItem = {
        hidden: { opacity: 0, x: 50 },
        enter: { opacity: 1, x: 0 },
        exit: { opacity: 0 },
    };

    return (
        <motion.div className={styles.clothesItem}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={listItem}
            key={id}
        >
            <ImageWithFallback 
                src={heroUrl}
                fallbackSrc={item.imageUrl}
            />
        </motion.div>
    )
}

const OpenButton = ({ onClick, outfitFormOpen }) => {
    return (
        <motion.button className={styles.openButton}
            animate={{
                rotate: outfitFormOpen ? 180 : 0,
            }}
        >
            <FontAwesomeIcon icon={faArrowDown} size="xl" onClick={onClick} />
        </motion.button>
    )
}

export default function SuccessScreen() {
    const dispatch = useDispatch()
    const router = useRouter()

    const [title, setTitle] = useState('confirm')

    console.log('rerender')

    const outfitFormOpen = useSelector(selectOutfitFormOpen)
    const showClothesBar = useSelector(selectShowClothesBar)

    const clothesIds = useSelector(selectOutfitIds)
    console.log(clothesIds)

    const toggleOutfitForm = () => {
        dispatch(setOutfitFormOpen(!outfitFormOpen))
    }

    const submitOutfit = () => {
        console.log('submitting outfit')
        setTimeout(() => {
            setTitle('submitted!')

            setTimeout(() => {
                dispatch(resetState())
                setTitle('confirm')
            }, 1000)
        }, 500)
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
                    showClothesBar && (
                        <motion.div className={styles.barContainer} initial={{opacity: 0}} 
                            animate={{opacity: 1}} exit={{opacity: 0}}
                        >
                        {
                            clothesIds.map((id, i) => (
                                <ClothesItem id={id} key={id} outfitFormOpen={outfitFormOpen} />
                            ))
                        }
                        

                        <OpenButton onClick={toggleOutfitForm} outfitFormOpen={outfitFormOpen} />
                        

                        </motion.div>
                    )
                }
            </AnimatePresence>
            
            <AnimatePresence>
                {
                    outfitFormOpen && (
                        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} onClick={submitOutfit} className={styles.confirmButton}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.75 }}
                        >
                            {title}
                        </motion.button>
                    )
                }
            </AnimatePresence>
                
                
            

        </>

    )

}



{/* 
{/* {
                outfitFormOpen && (
                    <div className={styles.barContainer}>
                    test 1
                    {/* <AnimatePresence>
                        {
                            clothesIds.map((id, i) => (
                                <ClothesItem id={id} key={id} outfitFormOpen={outfitFormOpen} />
                            ))
                        }
                    </AnimatePresence>
                     

<OpenButton onClick={toggleOutfitForm} />

</div>
 */}

                //     className={styles.barContainer}
                //     height="7vh"
                //     animate={{ 
                //         opacity: 1,
                //         // background: outfitFormOpen ? 'red' : 'black',
                //     }}
                //     transition={{ delay: 0.2 }}
                // >
                    

                // </motion.div>

        // <AnimatePresence>
        //     {
        //         showClothesBar && (
        //             <motion.div
        //                 className={styles.barContainer}
        //                 animate={{ height: outfitFormOpen ? '500px' : '100px', opacity: 1 }}
        //             >
        //                 <AnimatePresence>
        //                     {
        //                         clothesIds.map((id, i) => (
        //                             <ClothesItem id={id} key={id} outfitFormOpen={outfitFormOpen} />
        //                         ))
        //                     }
        //                 </AnimatePresence>
        //             </motion.div>
        //         )
        //     }
        
        // </AnimatePresence>