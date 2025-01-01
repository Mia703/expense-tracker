import MyTable from "@/my-components/myTable";
import { Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className="col-span-4 md:col-span-6 lg:col-span-12">
      <Button variant={"solid"} bg={"gray.500"}>
        Hello World
      </Button>
      <MyTable />
    </div>
  );
}
