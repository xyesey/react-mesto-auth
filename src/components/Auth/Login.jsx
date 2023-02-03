import { useState } from "react";
import FormAuth from "./FormAuth";
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
      <FormAuth
        onSubmit={handleSubmit}
        onChange={handleChange}
        formValue={formValue}
      />
      <InfoTooltip errorModal={errorModal} onClose={onClose} />
    </div>
  );
}

export default Login;
