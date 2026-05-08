import { useEffect, useState } from "react";

function App() {
 const [users, setUsers] = useState([]);
 const [name, setName] = useState("");
 const [editId, setEditId] = useState(null);

 useEffect(() => { getUsers(); }, []);

 function getUsers() {
 fetch( `${import.meta.env.VITE_API_URL}/users`)
 .then((res) => res.json())
 .then((data) => setUsers(data));
 }

 function addUser() {
 fetch( `${import.meta.env.VITE_API_URL}/users`, {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ name: name })
 }).then(() => { getUsers(); setName(""); });
 }

 function updateUser() {
 fetch(`${import.meta.env.VITE_API_URL}/users/${editId}`, {
 method: "PUT",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ name: name })
 }).then(() => { getUsers(); setName(""); setEditId(null); });
 }

 function deleteUser(id) {
 fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, { method: "DELETE" })
 .then(() => getUsers());
 }

 function handleEdit(user) { setName(user.name); setEditId(user._id); }

 return (
 <div>
 <h1>User Management</h1>
 <input value={name} placeholder="Enter Name"
 onChange={(e) => setName(e.target.value)} />
 {editId
 ? <button onClick={updateUser}>Update User</button>
 : <button onClick={addUser}>Add User</button>}
 {users.map((user) => (
 <div key={user._id}>
 <h2>{user.name}</h2>
 <button onClick={() => handleEdit(user)}>Edit</button>
 <button onClick={() => deleteUser(user._id)}>Delete</button>
 </div>
 ))}
 </div>
 );
}
export default App;