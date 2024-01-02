import HTTP from '@/lib/http';

function list() {
  return HTTP.get('/list');
}

function add(name: string) {
  return HTTP.post('/list', {
    name,
  });
}

function update(id: number, data: {
  name: string,
}) {
  return HTTP.put(`/list/${ id }`, data);
}

function del(id: number) {
  return HTTP.delete(`/list/${ id }`);
}

export default {
  list,
  add,
  update,
  del,
};
