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

  const [user2, setUser2] = useState({
    id: "",
    name: "",
    age: "",
  });

  console.log(user2);

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

  function handleChange2(e) {
    setUser2((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function createUser() {
    await supabase.from("users").insert({
      name: user.name,
      age: user.age,
    });

    fetchUsers();
  }

  async function deleteUser(userId) {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    fetchUsers();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }
  }

  function displayUser(userId) {
    users.map((user) => {
      if (user.id == userId) {
        setUser2({ id: user.id, name: user.name, age: user.age });
      }
    });
  }

  async function updateUser(userId) {
    const { data, error } = await supabase
      .from("users")
      .update({ id: user2.id, name: user2.name, age: user2.age })
      .eq("id", userId);

    fetchUsers();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }
  }

  return (
    <div>
      {/* form 1 */}
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

      {/* form 2 */}
      <form onSubmit={() => updateUser(user2.id)}>
        <input
          type="text"
          name="name"
          onChange={handleChange2}
          defaultValue={user2.name}
        />
        <input
          type="text"
          placeholder="Age"
          name="age"
          onChange={handleChange2}
          defaultValue={user2.age}
        />

        <button type="submit">Save Changes</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <th>{user.name}</th>
              <th>{user.age}</th>
              <th>
                <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    displayUser(user.id);
                  }}
                >
                  Edit
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
