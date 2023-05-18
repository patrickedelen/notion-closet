import { Container, Grid } from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic'

import ClothingCard from "@/components/ClothingCard";

import Clothes from '@/components/pages/Clothes';

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

// function ClothesPage() {
//   const [clothes, setClothes] = useState<[ClothesItem] | []>([]);
//   const [err, setErr] = useState("");

//   useEffect(() => {
//       try {
//         const clothes: ClothesEndpointReturn = await axios.get(
//           `/api/getClothes`
//         );
//         setClothes(clothes.data);
//       } catch (err: string) {
//         console.error("could not execute get clothes endpoint", err);
//         setErr(err);
//       }
//   }, [])

//   return (
//     <Container fluid>
//       <Grid.Container gap={2}>
//         {err && <p>{err}</p>}
//         {clothes.map((el: ClothesItem) => (
//           <Grid xs={12} sm={6} md={4} justify='center' key={el.id}>
//             <ClothingCard url={el.imageUrl} name={el.name} />
//           </Grid>
//         ))}
//       </Grid.Container>
//     </Container>
//   );
// }

// add loading component while fetching clothes
const DynamicClothes = dynamic(() => import('@/components/pages/Clothes'), { ssr: false })

export default function ClothesPage() {
  return <DynamicClothes />;
}



// export async function getStaticProps() {
//   try {
//     const clothes: ClothesEndpointReturn = await axios.get(
//       `/api/getClothes`
//     );
//     // console.log("clothes", clothes);
//     return {
//       props: {
//         clothesData: clothes.data,
//       },
//     };
//   } catch (err) {
//     console.error("could not execute get clothes endpoint", err);
//     return {
//       props: {
//         err: "could not get clothes",
//       },
//     };
//   }
