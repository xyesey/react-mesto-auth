function FormAuth({ onSubmit, onChange, formValue }) {
  return (
    <>
      <form className="auth__form" onSubmit={onSubmit}>
        <input
          required
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formValue.email}
          onChange={onChange}
        />
        <input
          required
          className="auth__input"
          type="password"
          name="password"
          placeholder="Password"
          value={formValue.password}
          onChange={onChange}
        />
        <button type="submit" className="auth__button">
          Войти
        </button>
      </form>
    </>
  );
}

export default FormAuth;
