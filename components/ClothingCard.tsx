import { Text, Card, Button } from "@nextui-org/react";

export default function ClothingCard() {
  return (
    <Card css={{ mw: 400 }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: "20px" }}>
        <Text h4 color='black'>
          Shirt
        </Text>
      </Card.Header>
      <Card.Image
        src='/test_assets/shirt1.webp'
        objectFit='cover'
        width='100%'
        height={400}
      />
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#0f111466",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Button>Wearing</Button>
      </Card.Footer>
    </Card>
  );
}
