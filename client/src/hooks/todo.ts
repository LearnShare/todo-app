import {
  useState,
  useEffect,
} from 'react';

import ListAPI from '@/api/list';
import TodoAPI from '@/api/todo';

const emptyList = {
  id: null,
  name: '',
  todos: [],
};

function parseLists(lists) {
  const lIds = [];
  const lData = {};
  // const tIds = [];
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

      // tIds.push(tId);
      tData[tId] = todoItem;
      todoList.push(tId);
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
    // tIds,
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
  // const [
  //   todoIds,
  //   setTodoIds,
  // ] = useState([]);
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
          // tIds,
          tData,
        } = parseLists(res.data);

        setListIds(lIds);
        setListData(lData);
        // setTodoIds(tIds);
        setTodoData(tData);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getList();
  }, []);

  const addList = ({
    name,
  }) => {
    ListAPI.add({
      name,
    })
      .then((res) => {
        if (res
            && res.data
            && res.data.id) {
          const {
            id,
          } = res.data;

          setListIds([
            id,
            ...listIds,
          ]);
          setListData({
            ...listData,
            [id]: {
              id,
              name,
              todos: [],
            },
          });
        }
      });
  };

  const updateList = (id, data) => {
    ListAPI.update(id, data)
      .then((res) => {
        const {
          name,
        } = res.data;
        const {
          todos,
        } = listData[id];

        setListData({
          ...listData,
          [id]: {
            id,
            name,
            todos,
          },
        });
      });
  };

  const deleteList = (id) => {
    ListAPI.del(id)
      .then(() => {
        setListIds((oldIds) => {
          const newIds = [
            ...oldIds,
          ];
          const index = newIds.indexOf(id);
          newIds.splice(index, 1);

          return newIds;
        });

        setListData((oldData) => {
          const newData = {
            ...oldData,
          };
          delete newData[id];

          return newData;
        });
      });
  };

  const addTodo = (listId, data) => {
    TodoAPI.add({
      listId,
      text: data.text,
    })
      .then((res) => {
        const {
          id,
          text,
          done,
        } = res.data;

        setListData((oldData) => {
          const newData = {
            ...oldData,
          };
          newData[listId].todos
            .push(id);

          return newData;
        });

        // setTodoIds((oldIds) => [
        //   ...oldIds,
        //   id,
        // ]);

        setTodoData((oldData) => ({
          ...oldData,
          [id]: {
            id,
            text,
            done,
          },
        }));
      });
  };

  const updateTodo = (listId, data) => {
    const {
      id,
      text,
      done,
    } = data;

    TodoAPI.update(id, {
      text,
      done,
    })
      .then(() => {
        setTodoData((oldData) => ({
          ...oldData,
          [id]: {
            id,
            text,
            done,
          },
        }));
      });
  };

  const deleteTodo = (listId, data) => {
    const {
      id,
    } = data;

    TodoAPI.del(id)
      .then(() => {
        setListData((oldData) => {
          const newData = {
            ...oldData,
          };

          const index = newData[listId].todos
            .indexOf(id);
          newData[listId].todos
            .splice(index, 1);

          return newData;
        });

        setTodoData((oldData) => {
          const newData = {
            ...oldData,
          };
          delete newData[id];

          return newData;
        });
      });
  };

  const run = (action, target, data) => {
    switch (action) {
      case 'add-list':
        addList(data);
        break;
      case 'update-list':
        updateList(target, data);
        break;
      case 'delete-list':
        deleteList(target);
        break;
      case 'add-todo':
        addTodo(target, data);
        break;
      case 'update-todo':
        updateTodo(target, data);
        break;
      case 'delete-todo':
        deleteTodo(target, data);
        break;
      default:
    }
  };

  const lists = listIds.map((listId) => {
    const {
      id,
      name,
      todos,
    } = listData[listId];

    return {
      id,
      name,
      todos: todos.map((todoId) => todoData[todoId]),
    };
  });

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
