
// @ts-nocheck
import styles from './Card.module.css'
import { Image } from '@nextui-org/react'
import { Text, Button, Row } from "@nextui-org/react";
import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { isWearingItem, addItem, removeItem } from '../../store/outfitSlice';

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

const variants = {
    wear: { scale: [1, 1.05, 1], background: 'linear-gradient(90deg, #69035F 0%, #001839 43.75%)', transition: { duration: 0.25 } },
    wearing: { scale: [1, 1.05, 1], background: 'linear-gradient(90deg, #69035F 40.02%, #001839 80.98%)', transition: { duration: 0.25 } },
};

export default function Card({ url, name, id}: { url: string, name: string, id: string }) {
    const dispatch = useDispatch()

    const wearing = useSelector(isWearingItem(id))
    console.log('isWearing', wearing)
    const [heroFound, setHeroFound] = useState(false)
    const heroUrl = url.replace('notion-closet', 'wywt-output') + '-hero'
    // const heroUrl = 'https://wywt-output.s3.amazonaws.com/testimg7.webp-hero'

    const handleClick = () => {
        if (wearing) {
            dispatch(removeItem(id))
        } else {
            dispatch(addItem(id))
        }
    }
    
    return (
        <div className={styles.cardContainer} key={id}>
            <ImageWithFallback src={heroUrl} fallbackSrc={url} alt={name} height={250} />
            <Row justify='center'>
                <motion.button
                    onClick={handleClick}
                    variants={variants}
                    animate={wearing ? 'wearing' : 'wear'}
                    initial={'wear'}
                    className={styles.cardButton}
                    >
                    {wearing ? 'Wearing!' : 'Wear'}
                </motion.button>
            </Row>
        </div>
    )
}