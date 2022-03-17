import { Th, Thead, Tr } from "@chakra-ui/react";
import { THForToDoItem, THForUsers } from "../constants";

export default function TheadList({ isUser }: { isUser: boolean }) {
  const THList = isUser ? THForUsers : THForToDoItem;

  return (
    <Thead>
      <Tr>
        {THList.map((thValue, i) => (
          <Th key={i}>{thValue}</Th>
        ))}
      </Tr>
    </Thead>
  );
}
