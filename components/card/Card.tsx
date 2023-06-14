
// @ts-nocheck
import styles from './Card.module.css'
import { Image } from '@nextui-org/react'
import { Text, Button, Row } from "@nextui-org/react";
import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import CustomIcon from '@/components/customIcon'

import { isWearingItem, addItem, removeItem, isWearingType, replaceItem } from '../../store/outfitSlice';

const ImageWithFallback = (props) => {
    const { src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);
    const [imageClass, setImageClass] = useState(styles.image);
    const [fallbackTries, setFallbackTries] = useState(0);

    const pollForFullImage = () => {
        if (fallbackTries < 10) {
            setFallbackTries(fallbackTries + 1);

            setTimeout(() => {
                fetch(src, { mode: 'no-cors', method: 'HEAD' })
                    .then((res) => {
                        if (res.ok) {
                            setImgSrc(src)
                            setImageClass('')
                        } else {
                            pollForFullImage()
                        }
                    })
                    .catch((error) => {
                        pollForFullImage()
                    })
            }, 5000)
        } else {
            setImageClass(styles.fallbackImage)
        }
    }
    

    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => {
                setImageClass(styles.fallbackImage)
                setImgSrc(fallbackSrc)
                // pollForFullImage() -- fix
            }}
            alt="clothing item"
            className={imageClass}
        />
    );
};

const variants = {
    wear: { scale: [1, 1.05, 1], background: 'linear-gradient(90deg, #69035F 0%, #001839 43.75%)', transition: { duration: 0.25 } },
    wearing: { scale: [1, 1.05, 1], background: 'linear-gradient(90deg, #69035F 40.02%, #001839 80.98%)', transition: { duration: 0.25 } },
};

export default function Card({ url, name, id, type }: { url: string, name: string, id: string, type: string }) {
    const dispatch = useDispatch()

    const wearing = useSelector(isWearingItem(id))
    const typeBeingWorn = useSelector(isWearingType(type))

    console.log('isWearing', wearing)
    const [heroFound, setHeroFound] = useState(false)
    const heroUrl = url.replace('notion-closet', 'wywt-output') + '-hero'
    // const heroUrl = 'https://wywt-output.s3.amazonaws.com/testimg7.webp-hero'

    const handleClick = () => {
        if (wearing) {
            dispatch(removeItem({ id: id, type: type }))
        } else if (typeBeingWorn) {
            dispatch(replaceItem({ id: id, type: type }))
        } else {
            dispatch(addItem({ id: id, type: type }))
        }
    }
    
    return (
        <div className={styles.cardContainer} key={id}>
            <div className={styles.icon}>
                <CustomIcon type={type} checked={typeBeingWorn} />
            </div>
            <ImageWithFallback src={heroUrl} fallbackSrc={url} alt={name} height={250} />
            <Row justify='center'>
                <motion.button
                    onClick={handleClick}
                    variants={variants}
                    animate={wearing ? 'wearing' : 'wear'}
                    initial={false}
                    className={(typeBeingWorn && !wearing) ? styles.cardButtonDisabled : styles.cardButton}
                    >
                    {wearing ? 'Wearing!': (typeBeingWorn && !wearing) ? 'Wear Instead' : 'Wear'}
                </motion.button>
            </Row>
        </div>
    )
}