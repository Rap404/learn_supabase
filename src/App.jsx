import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "./createClient";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({
    name: "",
    age: "",
  });

  console.log(user);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("users").select("*");
    setUsers(data);
  }

  function handleChange(e) {
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function createUser() {
    await supabase.from("users").insert({ name: user.name, age: user.age });
  }

  return (
    <div>
      <form onSubmit={createUser}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Age"
          name="age"
          onChange={handleChange}
        />

        <button type="submit">Create</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <th>{user.name}</th>
              <th>{user.age}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
