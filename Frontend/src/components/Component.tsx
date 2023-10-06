
import React, { useEffect, useState } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
  } from '@mui/material';
import { fetchData, createData, editData, deleteData } from '../services/api';

const Component: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', email: '' });
  const [editItem, setEditItem] = useState({ id: '', name: '', email: '' });
  const [isEditModalOpen, setEditModalOpen] = useState(false);


  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData();
        setData(result);
        console.log(result)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromApi();
  }, []);

  const handleCreate = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setNewItem({ name: '', email: '' })
  };

  const handleCreateSubmit = async () => {
    try {
        if (!newItem.name || !newItem.email) {
            
            alert('Por favor, preencha todos os campos.');
            return;
          }

        if (!isEmailValid(newItem.email)) {
            alert('Por favor, insira um endereço de e-mail válido.');
            return;
          }

      const response = await createData(newItem); 
      console.log('Novo cadastro criado:', response);

      const updatedData = await fetchData();
      setData(updatedData);
    } catch (error) {
      console.error('Error creating new item:', error);
    } finally {
      handleCloseCreateModal();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
    setEditItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const Edit = (id: number) => {
    const userToEdit = data.find((item) => item.id === id);
  
    setEditItem(userToEdit || { id: '', name: '', email: '' });
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditItem({ id: '', name: '', email: '' }); // Limpa os dados do usuário editado
  };
  

  const handleEditSubmit = async () => {
    try {

        if (!editItem.name || !editItem.email) {
            
            alert('Por favor, preencha todos os campos.');
            return;
          }

          if (!isEmailValid(editItem.email)) {
            alert('Por favor, insira um endereço de e-mail válido.');
            return;
          }
     
      const response = await editData(editItem); 
      console.log('Usuário editado:', response);
  
      // Atualiza os dados após a edição
      const updatedData = await fetchData();
      setData(updatedData);
    } catch (error) {
      console.error('Error editing user:', error);
    } finally {
      handleCloseEditModal();
    }
  };
  
  
  const Delete = async (id: number) => {
    const shouldDelete = window.confirm('Tem certeza que deseja excluir este usuário?');
  
    if (shouldDelete) {
      try {
        // Envia uma solicitação DELETE
        await deleteData(id); 
        console.log('Usuário excluído com sucesso.');
  
        // Atualiza os dados
        const updatedData = await fetchData();
        setData(updatedData);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const isEmailValid = (email: string): boolean => {
    // verifica se o e-mail está em um formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <Container maxWidth="md" style={{ marginTop: '20px' , textAlign: 'center' }}>
      <TableContainer component={Paper} style={{ margin: '0 auto', textAlign: 'center'  }}>
        <h3>Agenda de Contatos</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'><b>ID</b></TableCell>
              <TableCell align='center'><b>Nome</b></TableCell>
              <TableCell align='center'><b>Email</b></TableCell>
              <TableCell align='center'>
                <Button variant="contained" color="primary" onClick={handleCreate} >
               Adicionar</Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell align='center'>{item.id}</TableCell>
                <TableCell align='center'>{item.name}</TableCell>
                <TableCell align='center'>{item.email}</TableCell>
                <TableCell align='center'>
                  <Button variant="outlined" color="primary" onClick={() => Edit(item.id)} style={{ marginRight: '8px' }}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => Delete(item.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog open={isCreateModalOpen} onClose={handleCloseCreateModal}>
        <DialogTitle>Novo Contato</DialogTitle>
        <DialogContent>
          <form >
          <TextField
            autoFocus
            name="name"
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            fullWidth
            value={newItem.name}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            name="email"
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={newItem.email}
              onChange={handleInputChange}
          />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreateSubmit} disabled={!newItem.name || !newItem.email} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
        <DialogTitle>Editar Contato</DialogTitle>
        <DialogContent>
        <form>
         <TextField
           label="Nome"
           name="name"
           fullWidth
           value={editItem.name}
           onChange={handleInputChange}
           autoFocus
           margin="dense"
        />
        <TextField
         label="E-mail"
         name="email"
         fullWidth
         autoFocus
         margin="dense"
         value={editItem.email}
         onChange={handleInputChange}
          />
       </form>

        </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEditModal} color="primary">
         Cancelar
       </Button>
       <Button onClick={handleEditSubmit} disabled={!editItem.name || !editItem.email} color="primary">
         Salvar
         </Button>
     </DialogActions>
      </Dialog>
      </Container>
    </div>
  );
};

export default Component;
