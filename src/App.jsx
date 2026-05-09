import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch(
      `${import.meta.env.VITE_API_URL}/users`
    )
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }

  function addUser() {
    fetch(
      `${import.meta.env.VITE_API_URL}/users`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name: name
        })
      }
    )
      .then((res) => res.json())
      .then(() => {
        getUsers();

        setName("");
      });
  }

  return (
    <div>
      <h1>User App</h1>

      <input
        value={name}
        placeholder="Enter Name"
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <button onClick={addUser}>
        Add User
      </button>

      {users.map((user) => (
        <h2 key={user._id}>
          {user.name}
        </h2>
      ))}
    </div>
  );
}

export default App;
