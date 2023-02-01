import { useState } from "react";
import { Link } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";

function Register({ handleSignUp, successModal, errorModal, onClose }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
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

    const { password, email } = formValue;
    console.log(formValue);
    handleSignUp(password, email);
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          required
          className="auth__input"
          type="email"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          required
          className="auth__input"
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="auth__caption">
          Уже зарегистрировались? Войти
        </Link>
      </form>
      <InfoTooltip
        successModal={successModal}
        errorModal={errorModal}
        onClose={onClose}
      />
    </div>
  );
}

export default Register;
