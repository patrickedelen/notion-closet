import {
  Navbar,
  Button,
  Link,
  Text,
  Card,
  Radio,
  Row,
} from "@nextui-org/react";

export default function Header() {
  return (
    <Navbar variant='sticky' isBordered={true}>
      <Text b>Pat&apos;s Closet</Text>
      <Navbar.Content>
        <Navbar.Link>
          <Link href='/clothes'>Clothes</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link href='/'>Upload</Link>
        </Navbar.Link>
      </Navbar.Content>
    </Navbar>
  );
}
