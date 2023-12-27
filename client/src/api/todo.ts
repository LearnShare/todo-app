import HTTP from '@/lib/http';

function list() {
  return HTTP.get('/todo');
}

function add(text: string) {
  return HTTP.post('/todo', {
    text,
  });
}

function update(id: number, data: {
  text: string,
  done: boolean,
}) {
  return HTTP.put(`/todo/${ id }`, data);
}

function del(id: number) {
  return HTTP.delete(`/todo/${ id }`);
}

export default {
  list,
  add,
  update,
  del,
};
