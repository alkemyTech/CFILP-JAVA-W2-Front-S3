import { useNavigate } from "react-router";
import { CustomInputForm } from "../components";
import { useState } from "react";

import alkemyLogo from "../assets/alkemy-logo.png";
import { loginUser } from "../api/auth";
import { isValidMail } from "../utils/isValidMail";
import axios from "axios";
import { toast } from "sonner";
import {jwtDecode} from "jwt-decode";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    email: { isWrong: false, message: "El correo electrónico no es válido" },
    password: { isWrong: false, message: "Entre 8 y 20 caracteres" },
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Maneja el cambio de los inputs
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Maneja el envio
  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = form;

    // Validaciones
    setError({
      email: { ...error.email, isWrong: !email || !isValidMail(email) },
      password: {
        ...error.password,
        isWrong: !password || password.length < 8 || password.length > 20,
      },
    });

    // Envio la petición
    const controller = new AbortController();
    
    try {
      const data = await loginUser({email: form.email, contrasenia: form.password}, controller.signal);
      
      const myDecodedToken = jwtDecode(data.token);
      console.log(myDecodedToken)

      localStorage.setItem("token", data.token);
      localStorage.setItem("id", myDecodedToken.userId)

      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      if (axios.isCancel(err)) return;
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white py-8 px-4 md:px-10 rounded-lg shadow-md w-full max-w-xl flex flex-col items-center"
      >
        <img
          src={alkemyLogo}
          alt="Alkemy logo"
          className="mb-10 max-w-md w-full mx-auto"
        />

        <div className="w-full flex flex-col max-w-sm mb-4">
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
            label="Contraseña"
            name="password"
            type="password"
            placeholder="Entre 8 y 20 caracteres"
            value={form.password}
            err={error.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-1/2 min-w-40 cursor-pointer font-bold bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition"
        >
          Iniciar sesión
        </button>

        <p className="mt-4 text-sm text-center">
          ¿No tenés cuenta?{" "}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Crear una cuenta
          </span>
        </p>
      </form>
    </div>
  );
};
