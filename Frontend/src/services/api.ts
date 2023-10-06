
const API_URL = 'http://localhost:3000';

export const fetchData = async () => {
  const response = await fetch(`${API_URL}/usersList`);
  if (!response.ok) {
    throw new Error('Erro ao buscar dados da API');
  }
  const data = await response.json();
  return data;
};

export const createData = async (newItem: any) => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
  
    if (!response.ok) {
      throw new Error('Erro ao criar novo item');
    }
  
    const createdItem = await response.json();
    return createdItem;
  };

  export const editData = async (editedItem: any) => {
    const response = await fetch(`${API_URL}/users/${editedItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedItem),
    });
  
    if (!response.ok) {
      throw new Error('Erro ao editar usuário na API');
    }
  
    const editedUser = await response.json();
    return editedUser;
  };

  export const deleteData = async (id: number) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Erro ao excluir usuário na API');
    }
  
    console.log('Usuário excluído com sucesso.');
  
    return null;
  };
  
  
