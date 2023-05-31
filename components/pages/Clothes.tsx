// @ts-nocheck

import { Container, Grid } from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic'

import ClothingCard from "@/components/ClothingCard";
import Card from "@/components/card/Card"

import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShirt } from '@fortawesome/free-solid-svg-icons'

import Filter from '@/components/filter'

import { useSelector, useDispatch } from "react-redux"
import { selectLoading, selectClothes, getClothes, setFormState, selectFilteredClothes } from '../../store/clothesSlice'

import styles from './Clothes.module.css'

type ClothesEndpointReturn = {
  data: [ClothesItem];
};
type ClothesItem = {
  timesWorn: number;
  cost: number;
  name: string;
  imageUrl: string;
  id: string;
};

type ClothesProps = {
  clothesData?: [ClothesItem];
  err?: string;
};

const variants = {
  hidden: { opacity: 0, y: 25 },
  show: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1 + 0.2,
    },
  }),
};

const LoadingContainer = () => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.loadingContainer}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
      >
        <FontAwesomeIcon icon={faShirt} size="7x" color="black" className="fa-bounce" />
      </motion.div>
    </AnimatePresence>
  )
}

export default function ClothesPageDeferred() {
  const [clothes, setClothes] = useState<[ClothesItem] | []>([]);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();


  const loading = useSelector(selectLoading);
  const clothesData = useSelector(selectFilteredClothes);
  // const loading = true
  const reduxClothes = useSelector(selectClothes)

  console.log('redux state', loading, reduxClothes)

  useEffect(() => {
      dispatch(getClothes())
  }, [dispatch]);



  return (
    <>
    <Container fluid>
      <Grid.Container gap={2}>
        <AnimatePresence>
        {
          loading && (
            <motion.div
            className={styles.loadingContainer}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            >
                <FontAwesomeIcon icon={faShirt} size="7x" color="black" className="fa-bounce" />
              </motion.div>
          )
        }
        </AnimatePresence>
        {err && <p>{err}</p>}
        <div className={styles.cardGrid}>

        {
          !loading && (
            <AnimatePresence>
            {clothesData.map((el: ClothesItem, i) => (
              <Grid xs={12} sm={6} md={4} justify='center' key={el.id} style={{ padding: 0, marginTop: '20px' }}>
                <motion.div
                  key={el.id}
                  variants={variants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  custom={i}
                >
                  <Card url={el.imageUrl} name={el.name} id={el.id} type={el.type} />
                </motion.div>
              </Grid>
            ))}
            </AnimatePresence>
          )
        }
        </div>
      </Grid.Container>
    </Container>
    </>
  );
}
