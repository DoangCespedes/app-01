import React from 'react';
import {Edit, Delete} from "@mui/icons-material";

export const Table = ({users, setUser}) => {
 
    const selectUser = (user) => {
        setUser(user);
    }

    console.log('users', users)
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
                                    <Delete/>
                                  
                                    <Edit onClick={()=>selectUser (user, 'Editar')}/>
                                </td>
                            </tr>     
                        ))}
                    </tbody>
                </table>
            </div>
        );
};
