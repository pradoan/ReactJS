import React, { useState, useEffect } from 'react';
import './style.css';
import {Card} from '../../components/Card';

export function Home() {
  const [userName, setUserName] = useState();
  const [user, setUsers] = useState([]);
  const [gitUser, setGitUser] = useState({name:'', avatar: ''});

  function handleAddUser(){
    const newUser = {
      name: userName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) 
    };

    setUsers(prevState => [...prevState, newUser])
    
  }

  useEffect(() => {
    fetch('https://api.github.com/users/pradoan')
    .then(response => response.json())
    .then(data => {
      setGitUser({
        name: data.name,
        avatar: data.avatar_url, 
      })
    })
  }, []);


  return ( 
    <div className="container">
      <header>
      <h1>Lista de Presença:</h1>
      <div>
        <strong>{gitUser.name}</strong>
        <img src={gitUser.avatar} alt="Photo" />

      </div>
      </header>
      

      <input type="text" placeholder="Digite o nome..." onChange={e => setUserName(e.target.value)}/>

      <button type="button" onClick={handleAddUser}>Adicionar</button>
    
      {user.map(user => <Card key={user.time} name={user.name} time= {user.time} />)}
      
    </div>
   )
}

