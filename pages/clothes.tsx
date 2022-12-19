import { Container, Grid } from "@nextui-org/react";
import axios from "axios";

import ClothingCard from "@/components/ClothingCard";

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
  clothesData: [ClothesItem];
};

export default function Clothes({ clothesData }: ClothesProps) {
  return (
    <Container fluid>
      <Grid.Container gap={2}>
        {clothesData.map((el: ClothesItem) => (
          <Grid xs={12} sm={6} md={4} justify='center' key={el.id}>
            <ClothingCard url={el.imageUrl} name={el.name} />
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
}

export async function getStaticProps() {
  try {
    const clothes: ClothesEndpointReturn = await axios.get(
      `${process.env.BASE_URL}/api/getClothes`
    );
    console.log("clothes", clothes);
    return {
      props: {
        clothesData: clothes.data,
      },
    };
  } catch (err) {
    console.error("could not execute get clothes endpoint", err);
    return {
      props: {
        err: "could not get clothes",
      },
    };
  }
}
