import React, {
  useState,
  useEffect,
} from 'react';

import TodoList from './list';

import ListAPI from '@/api/list';

function TodoApp() {
  // request status
  const [
    loading,
    setLoading,
  ] = useState(false);

  // lists
  const [
    lists,
    setLists,
  ] = useState([]);

  // get lists
  const getList = () => {
    if (loading) {
      return;
    }

    setLoading(true);

    ListAPI.list()
      .then((res) => {
        setLists(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="todo-list">
      {
        lists.map((list) => (
          <TodoList
              key={ list.id }
              data={ list } />
        ))
      }
    </div>
  );
}

export default TodoApp;
