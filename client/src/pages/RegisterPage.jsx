import { useState } from "react";
import { useAuth } from "../contexts/authentication";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xvmmxtesjvurqkkjslux.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bW14dGVzanZ1cnFra2pzbHV4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjI0NTQ0OCwiZXhwIjoyMDIxODIxNDQ4fQ.VhHxjnJr-KSoFJbnKHgxU5o-asgZIaYVRqWV0Kk2nEQ";
const supabase = createClient(supabaseUrl, supabaseKey);

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState([]);
  const { register } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    avatar.forEach((file) => {
      formData.append("avatar", file);
    });

    register(formData);
  };

  console.log(avatar);
  const handleAvatar = (e) => {
    e.preventDefault();
    // if (Object.keys(avatar).length === 2) {
    //   return;
    // }
    // const id = Date.now();
    setAvatar([...avatar, e.target.files[0]]);
  };
  const handleDeleteAvatar = (e, key) => {
    e.preventDefault();
    const newAvatar = { ...avatar };
    delete newAvatar[key];
    setAvatar({ ...newAvatar });
  };
  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register Form</h1>
        <div className="input-container">
          <label>
            Username
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username here"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Password
            <input
              id="password"
              name="password"
              type="text"
              placeholder="Enter password here"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            First Name
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Enter first name here"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              value={firstName}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Last Name
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Enter last name here"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              value={lastName}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Avatar
            <input
              id="avatar"
              name="avatar"
              type="file"
              placeholder="Enter last name here"
              multiple
              onChange={handleAvatar}
            />
          </label>
          {Object.keys(avatar).length !== 0 &&
            Object.keys(avatar).map((key) => {
              const file = avatar[key];
              return (
                <div key={key}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={100}
                  />
                  <button
                    width={30}
                    style={{ width: "20px", textAlign: "center" }}
                    onClick={(e) => {
                      handleDeleteAvatar(e, key);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
