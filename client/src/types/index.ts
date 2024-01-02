interface TodoData {
  id: number,
  text: string,
  done: boolean,
}

interface TodoListData {
  id: number,
  name: string,
  todo: TodoData[],
}

export {
  TodoData,
  TodoListData,
};
