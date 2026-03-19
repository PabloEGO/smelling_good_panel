import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router";

function PanelPerfumes({ onSuccess }) {
    const navigate = useNavigate();
    const [marcas, setMarcas] = useState([]);
    const [genero, setGenero] = useState([]);
    const [dataForm, setDataForm] = useState({
        nombre_perfume: "",
        precio_decant_3ml: "",
        precio_decant_5ml: "",
        precio_decant_10ml: "",
        precio_botella: "",
        // imagen_url: "perfumes/Perfume1.jpg",
        id_marca: "",
        id_genero: "",
        id_estatus: 1
    });

    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const inputFileRef = useRef(null);

    const openFileInput = () => {
        inputFileRef.current.click()
    }

    useEffect(() => {
        fetch("http://localhost:3000/marcas")
            .then((res) => res.json())
            .then((dataMarca) => {
                console.log(dataMarca.resultado);
                setMarcas(dataMarca.resultado);

                if (dataMarca.resultado.length > 0) {
                    setDataForm(prev => ({
                        ...prev,
                        id_marca: dataMarca.resultado[0].id_marca
                    }));
                }
            });
    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/generos")
            .then((res) => res.json())
            .then((dataGen) => {
                console.log(dataGen);
                setGenero(dataGen.resultado);

                if (dataGen.resultado.length > 0) {
                    setDataForm(prev => ({
                        ...prev,
                        id_genero: dataGen.resultado[0].id_genero
                    }));
                }
            });
    }, [])

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setDataForm({
            ...dataForm,
            [name]: type === "number" ? Number(value) : value
            // [name]: value
        });
    };

    const handleFile = (e) => {

        let archivo = e.target.files[0];
        setFile(archivo);

        if (archivo) {
            const url = URL.createObjectURL(archivo);
            setFilePreview(url);
        }

    }

    const AñadirPerfume = (e) => {
        e.preventDefault();

        console.log(dataForm);

        const formData = new FormData();
        formData.append("nombre_perfume", dataForm.nombre_perfume);
        formData.append("precio_decant_3ml", dataForm.precio_decant_3ml);
        formData.append("precio_decant_5ml", dataForm.precio_decant_5ml);
        formData.append("precio_decant_10ml", dataForm.precio_decant_10ml);
        formData.append("precio_botella", dataForm.precio_botella);
        formData.append("imagen", file);
        formData.append("id_marca", dataForm.id_marca);
        formData.append("id_genero", dataForm.id_genero);
        formData.append("id_estatus", dataForm.id_estatus);

        fetch("http://localhost:3000/perfumes", {
            method: "POST",
            // headers: {
            //     "Content-Type": "application/json"
            // },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log("Guardado:", data);
                navigate("/perfumes");
            })
            .catch(err => console.error(err));
    };



    return (

        <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center p-8">
            <form onSubmit={AñadirPerfume}>


                <div className="w-full max-w-5xl bg-[#121212] border border-yellow-900/40 rounded-xl p-8 shadow-xl">

                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Añadir Nuevo Perfume</h1>
                            <p className="text-gray-400 text-sm">
                                Registra una nueva fragancia en el inventario de lujo.
                            </p>
                        </div>

                        <nav className="px-4 py-2 text-sm bg-[#1a1a1a] border border-yellow-800/40 text-gray-300 rounded-lg hover:bg-[#222]">
                            <NavLink to="/perfumes">Volver al Listado</NavLink>
                        </nav>
                    </div>

                    {/* Contenido */}
                    <div className="grid grid-cols-2 gap-8">

                        {/* Columna izquierda */}
                        <div className="space-y-6">

                            {/* Nombre */}
                            <div>
                                <label className="text-xs text-yellow-500 font-semibold">
                                    NOMBRE DEL PERFUME
                                </label>
                                <input type="text" name="nombre_perfume" autoComplete='off' value={dataForm.nombre_perfume}
                                    onChange={handleChange} placeholder="Ej. Aventus" required
                                    className="w-full mt-2 p-3 rounded-lg bg-[#1a1a1a] border border-yellow-900/40 text-white focus:outline-none focus:ring-1 focus:ring-yellow-600" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-yellow-500 font-semibold">
                                        MARCA
                                    </label>
                                    <select name="id_marca" value={dataForm.id_marca} onChange={handleChange} className="w-full mt-2 p-3 rounded-lg bg-[#1a1a1a] border border-yellow-900/40 text-gray-300">
                                        {marcas.map(m => (
                                            <option key={m.id_marca} value={m.id_marca} >
                                                {m.nombre_marca}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs text-yellow-500 font-semibold">
                                        GÉNERO
                                    </label>
                                    <select name="id_genero" value={dataForm.id_genero} onChange={handleChange} className="w-full mt-2 p-3 rounded-lg bg-[#1a1a1a] border border-yellow-900/40 text-gray-300">
                                        {genero.map(g => (
                                            <option key={g.id_genero} value={g.id_genero}>
                                                {g.descripcion_genero}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Gestión de precios */}
                            <div className="bg-[#161616] border border-yellow-900/30 rounded-lg p-4">
                                <h3 className="text-sm text-yellow-400 mb-4">
                                    💰 Gestión de Precios
                                </h3>

                                <div className="grid grid-cols-2 gap-4">

                                    <div>
                                        <label className="text-xs text-gray-400">
                                            DECANT 3ML
                                        </label>
                                        <input type="text" inputMode="numeric" autoComplete='off' name="precio_decant_3ml" pattern="\d*" value={dataForm.precio_decant_3ml} onChange={handleChange}
                                            placeholder="$ 0.00" required
                                            className="w-full mt-1 p-2 rounded bg-[#1a1a1a] border border-yellow-900/30 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-400">
                                            DECANT 5ML
                                        </label>
                                        <input type="text" name="precio_decant_5ml" autoComplete='off' value={dataForm.precio_decant_5ml} onChange={handleChange}
                                            placeholder="$ 0.00" required
                                            className="w-full mt-1 p-2 rounded bg-[#1a1a1a] border border-yellow-900/30 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-400">
                                            DECANT 10ML
                                        </label>
                                        <input type="text" name="precio_decant_10ml" autoComplete='off' value={dataForm.precio_decant_10ml} onChange={handleChange}
                                            placeholder="$ 0.00" required
                                            className="w-full mt-1 p-2 rounded bg-[#1a1a1a] border border-yellow-900/30 text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-400">
                                            BOTELLA 100ML
                                        </label>
                                        <input type="text" name="precio_botella" autoComplete='off' value={dataForm.precio_botella} onChange={handleChange}
                                            placeholder="$ 0.00" required
                                            className="w-full mt-1 p-2 rounded bg-[#1a1a1a] border border-yellow-900/30 text-white"
                                        />
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* Columna derecha */}
                        <div className="space-y-4">

                            <label className="text-xs text-yellow-500 font-semibold">
                                IMAGEN DEL PERFUME
                            </label>

                            <div onClick={openFileInput} className="border-2 border-dashed border-yellow-900/40 rounded-xl h-64 flex flex-col items-center justify-center text-center text-gray-400 hover:border-yellow-600 cursor-pointer">
                                {filePreview ? (
                                    <img src={filePreview} alt={file} className="h-40 w-55" />
                                ) : (
                                    <>
                                        <div className="text-4xl mb-3">🖼️</div>

                                        <p className="text-sm">
                                            Haz clic para subir o arrastra la imagen
                                        </p>

                                        <span className="text-xs text-gray-500">
                                            Formatos recomendados: PNG, JPG
                                        </span>
                                    </>
                                )
                                }
                                <input ref={inputFileRef} type="file" accept="image/*" name="imagen" required onChange={handleFile} className="hidden" />
                            </div>

                            <div className="bg-[#161616] border border-yellow-900/30 rounded-lg p-3 text-xs text-gray-400">
                                ⚠ La imagen principal se utilizará en el catálogo público.
                                Asegúrate de que el fondo sea neutro para mantener la estética
                                de lujo.
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-4 mt-8">
                        <button className="text-gray-400 hover:text-white" onClick={() =>{
                                            navigate("/perfumes");
                        }}>
                            Cancelar
                        </button>

                        <input type="submit"
                            id="save"
                            value="Guardar"
                            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PanelPerfumes;