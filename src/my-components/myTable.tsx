import { Table } from "@chakra-ui/react";



export default function MyTable() {
  return (
    <Table.Root variant={"outline"}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Item</Table.Cell>
          <Table.Cell>Item</Table.Cell>
          <Table.Cell>Item</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
}
