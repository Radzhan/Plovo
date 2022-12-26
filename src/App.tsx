import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import UserForm from './components/UserForm/UserForm';
import Users from './components/Users/Users';
import 'bootstrap/dist/css/bootstrap.min.css'
import type {User} from "./types"

function App() {
  const [users, setUsers] = useState<User[]>([])

  const addUser = (newUser: User) => {
    setUsers(prev => [...prev, newUser])
  }

  return (
    <>
       <header>
        <NavBar/>
      </header>
      <main className="contsiner-fluid">
        <div className="row mt-2">
            <div className="col">
              <UserForm onSubmit={addUser}/>
            </div>
            <div className="col">
              <Users users={users}/>
            </div>
        </div>
      </main>

    </>
  );
  }

export default App;
