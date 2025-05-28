import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import axios from "axios";

import alkemyLogo from "../assets/alkemy-logo.png";
import { CustomInputForm } from "../components";
import { isValidMail } from "../utils/isValidMail";
import { isValidPhoneNumber } from "../utils/isValidPhone";
import { registerUser } from "../api/auth";

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    name: { isWrong: false, message: "Entre 3 y 20 caracteres" },
    lastname: { isWrong: false, message: "Entre 3 y 20 caracteres" },
    email: { isWrong: false, message: "El correo electrónico no es válido" },
    tel: { isWrong: false, message: "El teléfono no es válido" },
    password: { isWrong: false, message: "Entre 8 y 20 caracteres" },
    confirmPassword: {
      isWrong: false,
      message: "Las contraseñas no coinciden",
    },
  });
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    tel: "",
    password: "",
    confirmPassword: "",
  });

  // Maneja el cambio de los inputs
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Maneja el envio
  async function handleSubmit(e) {
    e.preventDefault();
    const { name, lastname, email, tel, password, confirmPassword } = form;

    // Validaciones
    setError({
      name: {
        ...error.name,
        isWrong: !name || name.length < 3 || name.length > 20,
      },
      lastname: {
        ...error.lastname,
        isWrong: !lastname || lastname.length < 3 || lastname.length > 20,
      },
      email: { ...error.email, isWrong: !email || !isValidMail(email) },
      tel: { ...error.tel, isWrong: !tel || !isValidPhoneNumber(tel) },
      password: {
        ...error.password,
        isWrong: !password || password.length < 8 || password.length > 20,
      },
      confirmPassword: {
        ...error.confirmPassword,
        isWrong: password !== confirmPassword,
      },
    });

    // Envio la petición
    const controller = new AbortController();
    try {
      await registerUser({
        nombre: form.name,
        apellido: form.lastname,
        email: form.email,
        telefono: form.tel,
        contrasenia: form.password
      }, controller.signal);

      toast.success("Usuario registrado con éxito");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      if (axios.isCancel(err)) return;
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100 m-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white py-8 px-4 md:px-10 rounded-lg shadow-md w-full max-w-xl flex flex-col items-center"
      >
        <img
          src={alkemyLogo}
          alt="Alkemy logo"
          className="mb-10 max-w-xs w-full mx-auto"
        />

        <div className="flex items-start justify-between gap-x-3 w-full">
          <CustomInputForm
            label="Nombre"
            name="name"
            placeholder="Juan Pablo"
            value={form.name}
            err={error.name}
            onChange={handleChange}
          />
          <CustomInputForm
            label="Apellido"
            name="lastname"
            placeholder="Pérez"
            value={form.lastname}
            err={error.lastname}
            onChange={handleChange}
          />
        </div>

        <CustomInputForm
          label="Correo electrónico"
          name="email"
          type="text"
          placeholder="email@example.com"
          value={form.email}
          err={error.email}
          onChange={handleChange}
        />
        <CustomInputForm
          label="Teléfono"
          name="tel"
          type="text"
          err={error.tel}
          placeholder="Ej. 2302202020"
          value={form.tel}
          onChange={handleChange}
        />

        <div className="flex items-start justify-between gap-x-3 mb-4 w-full">
          <CustomInputForm
            label="Contraseña"
            name="password"
            type="password"
            placeholder="Entre 8 y 20 caracteres"
            value={form.password}
            err={error.password}
            onChange={handleChange}
          />

          <CustomInputForm
            label="Conf. contraseña"
            name="confirmPassword"
            type="password"
            placeholder="Entre 8 y 20 caracteres"
            value={form.confirmPassword}
            err={error.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-1/2 min-w-40  cursor-pointer font-bold bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition"
        >
          Registrarse
        </button>

        <p className="mt-4 text-sm text-center">
          ¿Ya tenés cuenta?{" "}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </span>
        </p>
      </form>
    </div>
  );
};
