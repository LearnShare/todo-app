import {
  useState,
  useEffect,
} from 'react';

import ListAPI from '@/api/list';

const emptyList = {
  id: null,
  name: '',
  todos: [],
};

function parseLists(lists) {
  const lIds = [];
  const lData = {};
  const tIds = [];
  const tData = {};

  for (const list of lists) {
    const {
      id,
      name,
      todos,
    } = list;

    lIds.push(id);
    const todoList = [];

    for (const todo of todos) {
      const {
        id: tId,
        text,
        done,
      } = todo;

      const todoItem = {
        id: tId,
        text,
        done,
      };

      tIds.push(tId);
      tData[tId] = todoItem;
      todoList.push(todoItem);
    }

    lData[id] = {
      id,
      name,
      todos: todoList,
    };
  }

  return {
    lIds,
    lData,
    tIds,
    tData,
  };
}

function useTodo() {
  const [
    loading,
    setLoading,
  ] = useState(false);

  // list id
  const [
    listIds,
    setListIds,
  ] = useState([]);
  // list data
  const [
    listData,
    setListData,
  ] = useState({});

  // todo id
  const [
    todoIds,
    setTodoIds,
  ] = useState([]);
  // todo data
  const [
    todoData,
    setTodoData,
  ] = useState({});

  // get lists
  const getList = () => {
    if (loading) {
      return;
    }

    setLoading(true);

    ListAPI.list()
      .then((res) => {
        const {
          lIds,
          lData,
          tIds,
          tData,
        } = parseLists(res.data);

        setListIds(lIds);
        setListData(lData);
        setTodoIds(tIds);
        setTodoData(tData);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getList();
  }, []);

  const lists = listIds.map((listId) => {
    const {
      id,
      name,
      todos,
    } = listData[listId];

    return {
      id,
      name,
      todos,
    };
  });

  // TODO update by action
  // 1. add list
  // 2. update list
  // 3. delete list
  // 4. add todo
  // 5. update todo
  // 6. delete todo
  const run = (action, target, data) => {
    console.log(action, target, data, todoIds, todoData);
  };

  return {
    loading,
    lists: [
      emptyList,
      ...lists,
    ],
    run,
  };
}

export default useTodo;
