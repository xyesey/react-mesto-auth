import { useState } from "react";
import InfoTooltip from "./InfoTooltip";

function Login({ handleSignIn, errorModal, onClose }) {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleSignIn(formValue);
    setFormValue({ email: "", password: "" });
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Войти</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          required
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
        />
        <input
          required
          className="auth__input"
          type="password"
          name="password"
          placeholder="Password"
          value={formValue.password}
          onChange={handleChange}
        />
        <button type="submit" className="auth__button">
          Войти
        </button>
      </form>
      <InfoTooltip errorModal={errorModal} onClose={onClose} />
    </div>
  );
}

export default Login;
