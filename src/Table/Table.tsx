import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Table as CTable,
  Tfoot,
  Tr,
  Td,
  NumberInput,
  NumberInputField,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import React, { ChangeEvent, useEffect, useState } from "react";
import useTable from "../hooks/useTable";
import { ToDoItem } from "../types/ToDoItem";
import { User } from "../types/User";
import { isUserList } from "../utils/checkTypes";
import TBodyList from "./components/TBodyList";
import TheadList from "./components/TheadList";

interface Props {
  dataToRender: (User | ToDoItem)[];
  handleToggleItem?: (id: number, i: number) => void;
  handleDeleteItem?: (id: number, i: number) => void;
  rowsPerPage?: number;
}

export function Table({
  dataToRender,
  handleToggleItem,
  handleDeleteItem,
  rowsPerPage = 3,
}: Props): React.ReactElement {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const { slice, range, filterByText } = useTable(dataToRender, page, rowsPerPage);

  useEffect(() => {
    filterByText(searchInput);
  }, [dataToRender, searchInput, page]);

  const handleFilterByText = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === searchInput) return;
    setPage(1);
    setSearchInput(e.target.value);
  };

  return (
    <CTable variant="striped">
      <TheadList isUser={isUserList(dataToRender)} />
      <TBodyList data={slice} handleToggleItem={handleToggleItem} handleDeleteItem={handleDeleteItem} />

      <Tfoot>
        <Tr>
          <Td colSpan={2}>
            <Flex justifyContent="center">
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon />
                </InputLeftElement>
                <Input placeholder="Search" value={searchInput} onChange={handleFilterByText} />
              </InputGroup>
            </Flex>
          </Td>
          <Td colSpan={1}>
            <Flex justifyContent="center" alignItems="center" style={{ gap: "0.25rem" }}>
              <IconButton
                aria-label="previous-page"
                size="sm"
                icon={<ArrowLeftIcon />}
                onClick={() => setPage(page => --page)}
              />
              <NumberInput step={1} defaultValue={range[0]} value={page} min={range[0]} max={range.length}>
                <NumberInputField />
              </NumberInput>
              <IconButton
                aria-label="next-page"
                size="sm"
                icon={<ArrowRightIcon />}
                onClick={() => setPage(page => ++page)}
              />
            </Flex>
          </Td>
        </Tr>
      </Tfoot>
    </CTable>
  );
}
