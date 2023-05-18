import { Text, Card, Button, Row } from "@nextui-org/react";

export default function ClothingCard({ url, name }: { url: string, name: string }) {
  return (
    <Card css={{ mw: 400 }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: "20px" }}>
        <Text h4 color='black'>
          {name}
        </Text>
      </Card.Header>
      <Card.Image src={url} objectFit='cover' width='100%' height={400} />
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#00000080",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row justify='center'>
          <Button color='gradient'>Wearing</Button>
        </Row>
      </Card.Footer>
    </Card>
  );
}
