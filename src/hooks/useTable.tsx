import { useEffect, useState } from "react";
import { ToDoItem } from "../types/ToDoItem";
import { User } from "../types/User";
import { isToDoItemList, isUserList } from "../utils/checkTypes";

const calculateRange = (data: (User | ToDoItem)[], rowsPerPage: number) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data: (User | ToDoItem)[], page: number, rowsPerPage: number) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

export const useTable = (data: (User | ToDoItem)[], page: number, rowsPerPage: number) => {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [slice, setSlice] = useState<(User | ToDoItem)[]>([]);

  const filterByText = (value: string) => {
    const searchText = value.toLowerCase();

    const newState = data.filter((el: User | ToDoItem) => {
      if (isUserList(data)) {
        if (
          (el as User).username.toLowerCase().includes(searchText) ||
          (el as User).email.toLowerCase().includes(searchText)
        ) {
          return el;
        }
      }
      if (isToDoItemList(data)) {
        if ((el as ToDoItem).description.toLowerCase().includes(searchText)) {
          return el;
        }
      }
    });

    const range = calculateRange(newState, rowsPerPage);
    setTableRange([...range]);

    const newSlice = sliceData(newState, page, rowsPerPage);
    setSlice(newSlice);
  };

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  return { slice, range: tableRange, filterByText };
};

export default useTable;
