import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form } from '../components/Form';
import {usersApi} from '../api/userApi';
import { Table } from '../components/Table';

export const UserPages = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  
  //--- --- --- --- GET -- -- --- -- --- ---- --  
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () =>{
    const resp = await usersApi.get('https://jsonplaceholder.typicode.com/posts')
    setUsers(resp.data);
}

// --- --- --- --- --- POST -- --- ---- --- ---- ---
  
const onSubmit = async() =>  {
  try{
      await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
          'Content-type': 'application/json; charset=UTF-8',
          },
      })
          .then((response) => response.json())
          .then((json) =>{
            console.log('json', json);
            setUsers(prevState => [...prevState, {...json, userId: uuidv4(),
              id: users.at(-1).id +1 }])
              setUser({
                body:'',
                title:''
              })
          })
          
      
    }catch(error){
      console.log(error);
    }
}

const handleChange = (e) =>{
    const {name, value}=e.target;
    console.log('name',name);
    setUser( prevState => ({
      ...prevState,
      [name]: value
      }));
}

  return (
          <>
            <div>
                <header className="header">
                    <h1 className="header__titulo">Tabla de contenido</h1>
                    <Form 
                      onChange={handleChange}
                      onSubmit={onSubmit}
                      title={user.title}
                      body={user.body}
                      />    
                </header>
                <hr/><br/>
                <Table 
                  users={users}
                  setUser={setUser}
                  title={user.title}
                  body={user.body}
                  setUsers={setUsers}
                  onChange={handleChange}
                  
                />
                
            </div>
          </>
        );
};

