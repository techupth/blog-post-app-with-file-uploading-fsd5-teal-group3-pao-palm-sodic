import { useState } from "react";
import { useAuth } from "../contexts/authentication";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState({});
  const { register } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    //ลูปเพื่อส่งค่า
    for (let pic in picture) {
      formData.append("picture", picture[pic]);
    }

    register(formData);
  };
  const handleRemoveImage = (event, picture_id) => {
    event.preventDefault();
    const newPic = { ...picture };
    console.log(picture_id);
    delete newPic[picture_id];
    setPicture({ ...newPic });
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
          <label htmlFor="avatar">
            Avatar
            <input
              id="avatar"
              name="avatar"
              type="file"
              placeholder="Enter last name here"
              multiple
              hidden
              accept="image/*"
              onChange={(event) => {
                event.preventDefault();
                //เช็คจำนวน key
                const file = event.target.files[0];
                const count = Object.keys(picture).length;
                console.log(count);
                if (count < 2 && file && file.size <= 10 * 1024 * 1024) {
                  const id = Date.now();
                  const value = event.target.files[0];
                  setPicture({ ...picture, [id]: value });
                } else {
                  alert("ไปเล่น Palworld");
                }
              }}
            />
          </label>
        </div>
        <div className="image-list-preview-container">
          {Object.keys(picture).map((id) => {
            const file = picture[id];
            return (
              <div key={id} className="image-preview-container">
                <img
                  className="image-preview"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={100}
                />
                <button
                  className="image-remove-button"
                  onClick={(event) => handleRemoveImage(event, id)}
                >
                  x
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
