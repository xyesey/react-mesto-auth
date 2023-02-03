import { useState } from "react";
import { Link } from "react-router-dom";
import FormAuth from "./FormAuth";
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
      <FormAuth
        onSubmit={handleSubmit}
        onChange={handleChange}
        formValue={formValue}
      />
      <Link to="/sign-in" className="auth__caption">
        Уже зарегистрировались? Войти
      </Link>
      <InfoTooltip
        successModal={successModal}
        errorModal={errorModal}
        onClose={onClose}
      />
    </div>
  );
}

export default Register;
