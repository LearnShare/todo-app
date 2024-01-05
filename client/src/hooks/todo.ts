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

  // // todo id
  // const [
  //   todoIds,
  //   setTodoIds,
  // ] = useState([]);
  // // todo data
  // const [
  //   todoData,
  //   setTodoData,
  // ] = useState({});

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
          // tData,
        } = parseLists(res.data);

        setListIds(lIds);
        setListData(lData);
        // setTodoIds(tIds);
        // setTodoData(tData);
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

  // TODO update by action
  // 2. update list
  // 3. delete list
  // 4. add todo
  // 5. update todo
  // 6. delete todo
  const run = (action, target, data) => {
    console.log(action, target, data);

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
      default:
    }
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
