import { useState } from 'react';
import { useNavigate } from 'react-router';
export const Login = () => {
  const [dataForm, setDataForm] = useState({
    username: "",
    password: ""
  });
  const [errores, setErrores] = useState({
    username: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setDataForm({
      ...dataForm,
      [name]: type === "number" ? Number(value) : value
    });
  };

  const login = (e) => {
    e.preventDefault();

    console.log(dataForm);
    setErrores({
      username: "",
      password: ""
    })

    fetch("https://smellinggoodbackend-production.up.railway.app/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: dataForm.username,
        password: dataForm.password
      })
    })

      .then(res => res.json())


      .then(data => {
        console.log("Respuesta:", data)

        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("nombre", data.nombre);
          navigate("/main")
        } else {


          setErrores({
            username: "",
            password: "",
            [data.field]: data.message
          });
          return;

        }

      })
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] relative overflow-hidden">

      {/* Glow de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-transparent to-yellow-500/20 blur-3xl" />

      <div className="relative w-full max-w-md text-center">
        {/* Icono superior */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-yellow-500/40 text-yellow-400">
            {/* <Trophy size={18} /> */}
          </div>
        </div>

        {/* Título */}
        <h1 className="text-yellow-400 tracking-[0.35em] text-lg font-semibold">
          SMELLING GOOD
        </h1>
        <p className="text-xs text-gray-400 tracking-widest mt-1">
          LUXURY CONCIERGE
        </p>

        {/* Card */}
        <div className="mt-6 bg-[#111111]/80 backdrop-blur rounded-2xl p-8 shadow-2xl border border-yellow-500/10">
          <h2 className="text-white font-semibold text-lg">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-1">
            Authenticated access to the perfume vault.
          </p>

          {/* Form */}
          <form onSubmit={login} className="mt-6 space-y-4">
            {/* Email */}
            <div className="text-left">
              <label className="text-xs text-gray-400"> NOMBRE DE USUARIO</label>
              <div className="flex items-center mt-1 bg-[#0c0c0c] border border-yellow-500/10 rounded-lg px-3">
                {/* <Mail className="text-yellow-400 mr-2" size={16} /> */}
                <input
                  type="text"
                  placeholder="Ingrese su usuario"
                  name="username"
                  autoComplete='off' value={dataForm.username} onChange={handleChange}
                  className="w-full bg-transparent py-2 outline-none text-sm text-white"
                />
               
              </div>
               {errores.username && (
                  <p className="text-red-500">{errores.username}</p>
                )}
            </div>

            {/* Password */}
            <div className="text-left">
              <label className="text-xs text-gray-400">PASSWORD</label>
              <div className="flex items-center mt-1 bg-[#0c0c0c] border border-yellow-500/10 rounded-lg px-3">
                {/* <Lock className="text-yellow-400 mr-2" size={16} /> */}

                <input
                  type="password"
                  name='password'
                  placeholder="••••••••" autoComplete='off' value={dataForm.password} onChange={handleChange}
                  className="w-full bg-transparent py-2 outline-none text-sm text-white"
                />
               
              </div>
               {errores.password && (
                  <p className="text-red-500">{errores.password}</p>
                )}
            </div>

            {/* Opciones */}
            {/* <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" className="accent-yellow-400" />
                Remember Me
              </label>
              <button
                type="button"
                className="text-yellow-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div> */}

            {/* Botón */}
            <input
              type="submit"
              className="w-full mt-2 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:brightness-110 transition"
            />
            ENTRAR AL PANEL →
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-yellow-400 tracking-widest">
            LUXURY MANAGEMENT SYSTEM
          </p>
          <p className="text-[10px] text-gray-500 mt-1">
            EST. 2024 • A SMELLING GOOD LUXURY COLLECTION
          </p>
        </div>
      </div>
    </div>
  );
}
