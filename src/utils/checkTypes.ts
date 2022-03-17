import { ToDoItem } from "../types/ToDoItem";
import { User } from "../types/User";

export function isUserList(data: (User | ToDoItem)[]): data is User[] {
  return (<User>data[0])?.username !== undefined;
}

export function isToDoItemList(data: (User | ToDoItem)[]): data is ToDoItem[] {
  return (<ToDoItem>data[0])?.completed !== undefined;
}
