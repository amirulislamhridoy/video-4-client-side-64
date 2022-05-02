import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])
  
  const handleFormSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value
    const email = event.target.email.value
    const user = {name, email}
    
    fetch('http://localhost:5000/user', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
    .then(res => res.json())
    .then(data => {
      // const newUsers = [...users, data]
        setUsers([...users, data])
        console.log(data)
    })
  }
  return (
    <div className="App">
      <h1>The Available users {users.length}</h1>
      <form onSubmit={handleFormSubmit}>
        <input type='text' name="name" placeholder="Name" />
        <input type='text' name="email" placeholder="Email" />
        <input type='submit' value="Add User" />
      </form>
      {users.map(user => <li key={user.id}>
        name: {user.name}. email: {user.email}
      </li>)}
    </div>
  );
}

export default App;
