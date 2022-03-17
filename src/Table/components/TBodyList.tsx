import { Box, Tbody, Td, Tr, Image, Checkbox, IconButton } from "@chakra-ui/react";
import { ToDoItem } from "../../types/ToDoItem";
import { User } from "../../types/User";
import { isToDoItemList, isUserList } from "../../utils/checkTypes";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {
  data: (User | ToDoItem)[];
  handleToggleItem?: (id: number, i: number) => void;
  handleDeleteItem?: (id: number, i: number) => void;
}

export default function TBodyList({ data, handleToggleItem, handleDeleteItem }: Props) {
  if (isUserList(data))
    return (
      <Tbody>
        {data.map((row, i) => (
          <Tr key={i}>
            <Td>
              <Image src={row.avatarUrl} />
            </Td>
            <Td>{row.email}</Td>
            <Td>{row.username}</Td>
            <Td>{row.followers.length}</Td>
          </Tr>
        ))}
      </Tbody>
    );

  if (isToDoItemList(data))
    return (
      <Tbody>
        {data.map((row, i) => (
          <Tr key={i}>
            <Td>
              <Checkbox
                isChecked={row.completed}
                onChange={() => handleToggleItem && handleToggleItem(row.id, i)}
                width={100}
                px={6}
                py={4}
              />
            </Td>
            <Td>{row.completed}</Td>
            <Td>{row.description}</Td>
            <Td>
              <Box px={6} py={4}>
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Delete this item"
                  onClick={() => handleDeleteItem && handleDeleteItem(row.id, i)}
                  size="xs"
                  background="gray.600"
                  _hover={{ bg: "red.600" }}
                  color="white"
                />
              </Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
    );

  return <></>;
}
