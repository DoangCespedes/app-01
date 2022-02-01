import React from 'react';

export const Form = ({onChange, onSubmit, title, body}) => {
    const handleSubmit = async(e) =>{
        e.preventDefault();
        onSubmit()       
    }

  return (
        <>
        
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="header__subTitulo">Insertar nuevos datos:</h3>
                <input 
                    type="text"
                    label="title"
                    onChange={onChange}
                    className="input__text"
                    name="title"
                    value={title}                    
                />
                <input 
                    type="text"
                    label="body"
                    onChange={onChange}
                    className="input__text"
                    name="body"
                    value={body}                    

                    
                />
                <br/>
                <button className="btn" type="submit">
                        insertar
                </button>

            </form>
            
            
        </>
        );
};
