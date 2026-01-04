import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { UserForm } from "./components/UserForm"
import { UserList } from "./components/UserList";


function App() {

  const [updateFlag, setUpdateFlag] = useState(false);

  const handleUserCreated = () => setUpdateFlag(!updateFlag);

  return (
    <Router>
      <header className="p-3 bg-blue-900 flex gap-4 justify-end items-center">
        <Link to="/" className="link-button">Novo Usuário</Link>
        <Link to="/users" className="link-button">Usuários</Link>
      </header>

      <div>
        <Routes>
          <Route path="/" element={<UserForm onUserCreated={handleUserCreated} />} />
          <Route path="/users" element={<UserList updateList={updateFlag} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
