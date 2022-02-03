import React, { useState } from 'react';
import {Edit, Delete} from "@mui/icons-material";
import {makeStyles} from '@material-ui/core/styles';
import {Modal, Button, TextField} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

export const Table = ({users, setUsers}) => {
    const styles= useStyles();
    const [modalEditar, setModalEditar]=useState(false);
    const [user, setUser] = useState({});

    const selectUser = (user) => {
        setUser(user);
        abrirCerrarModalEditar(user);
    }

   
    const handleChange = (e) =>{
        const {name, value}=e.target;
        setUser( prevState => ({
          ...prevState,
          [name]: value
          }));
    }
    const peticionDelete=async(id)=>{
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
          });
          console.log('delete',user);
    };    
  
    const peticionPut = async(id) =>  {
        try{
            await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({user}),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
                .then((response) => response.json())
                .then((json) =>{console.log(json);
                    console.log('moises' ,user);
                abrirCerrarModalEditar();

            })
          
                 
        }catch(error){
        console.log(error);
        }
      }

    const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }

      const bodyEditar=(
        <div className={styles.modal}>
          <h3>Editar User</h3>
          <TextField name="title" className={styles.inputMaterial} onChange={handleChange} value={user.title}/>
          <br />
          <TextField name="body" className={styles.inputMaterial} onChange={handleChange} value={user.body}/>
          <br /><br />
          <div align="right">
            <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
          </div>
        </div>
      )

    if(users && users.length<1) return null;
 
  return (
            <div>
                <table>
                    <thead className = "table__head">
                        <tr>
                            <th>UserID</th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    
                    <tbody className="table__body">
                        {users.map(user => ( 
                            <tr key={user.id} 
                                user={user}>
                                <td className = "table__cell">{user.userId}</td>
                                <td className = "table__cell">{user.id} </td>
                                <td className = "table__cell">{user.title} </td>
                                <td className = "table__cell">{user.body} </td>
                                <td className = "table__cell">  
                                    <Delete onClick={()=>peticionDelete(user)}/>
                                  
                                    <Edit onClick={()=>selectUser (user, 'Editar')}/>
                                </td>
                            </tr>     
                        ))}
                    </tbody>
                </table>
                <Modal
                    open={modalEditar}
                    onClose={abrirCerrarModalEditar}>
                        {bodyEditar}
                </Modal>
            </div>
        );
};

