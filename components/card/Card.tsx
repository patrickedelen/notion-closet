
// @ts-nocheck
import styles from './Card.module.css'
import { Image } from '@nextui-org/react'
import { Text, Button, Row } from "@nextui-org/react";
import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'

const ImageWithFallback = (props) => {
    const { src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
            alt="clothing item"
        />
    );
};

const variants = {
    wear: { scale: [1, 1.05, 1], background: 'linear-gradient(90deg, #69035F 0%, #001839 43.75%)', transition: { duration: 0.25 } },
    wearing: { scale: [1, 1.05, 1], background: 'linear-gradient(90deg, #69035F 40.02%, #001839 80.98%)', transition: { duration: 0.25 } },
};

export default function Card({ url, name}: { url: string, name: string }) {
    const [wearing, setWearing] = useState(false)
    const [heroFound, setHeroFound] = useState(false)
    const heroUrl = url.replace('notion-closet', 'wywt-output') + '-hero'
    // const heroUrl = 'https://wywt-output.s3.amazonaws.com/testimg7.webp-hero'

    // useEffect(() => {
    //     fetch(heroUrl, { model: 'no-cors' })
    //     .then((res) => setHeroFound(true))
    //     .catch((err) => console.log('could not fetch hero', err))
    // }, [])

    const handleClick = () => {
        setWearing(!wearing)
        console.log('fire request')
    }
    
    return (
        <div className={styles.cardContainer}>
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