import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import ModalEliminarPerfume from './ModalEliminarPerfume';
import ModalEditarPerfume from "./ModalEditarPerfume";
import { ModalRestaurar } from './ModalRestaurar';
function ListadoPerfumes() {
    // { perfumes, setModalEditar, setModalEliminar, setPerfumeSeleccionado, setModalRestaurar }) {

    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modaLRestaurar, setModalRestaurar] = useState(false);
    const [perfumes, setPerfumes] = useState([]);

    const [perfumeSeleccionado, setPerfumeSeleccionado] = useState(false);

    const cargarPerfumes = () => {
        fetch("http://localhost:3000/perfumes") // 👈 endpoint GET
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPerfumes(data);
            })
    }

    useEffect(() => {
        cargarPerfumes();
    }, [])

    return (
        <div className="bg-[#0b0f14] text-white min-h-screen p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-semibold">
                        Gestión de Perfumes
                    </h1>
                    <span className="text-[10px] bg-yellow-600 text-black px-2 py-1 rounded ml-2">
                        {/* CATÁLOGO 2024 */}
                    </span>
                </div>

                <div className="flex gap-3">
                    <NavLink to="add">
                        <button className="bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold hover:opacity-90">
                            + Añadir Perfume
                        </button>
                    </NavLink>
                </div>
            </div>

            {/* Buscador + acciones */}
            <div className="flex justify-between items-center mb-4 gap-4">
                <input
                    type="text"
                    placeholder="Buscar por nombre, marca..."
                    className="w-full max-w-md bg-[#121821] border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none"
                />

                <div className="flex gap-2">
                    <button className="bg-[#121821] px-4 py-2 rounded-lg border border-gray-700 text-sm">
                        Filtros
                    </button>
                    <button className="bg-[#121821] px-4 py-2 rounded-lg border border-gray-700 text-sm">
                        Ordenar
                    </button>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-[#121821] rounded-xl border border-gray-800 overflow-x-auto">

                <table className="w-full text-sm">

                    {/* Header */}
                    <thead className="text-gray-400 text-xs border-b border-gray-800">
                        <tr>
                            <th className="text-center px-4 py-3">IMAGEN</th>
                            <th className="text-center px-4 py-3">NOMBRE</th>
                            <th className="text-center px-4 py-3">MARCA</th>
                            <th className="text-center px-4 py-3">DECANT 3ML</th>
                            <th className="text-center px-4 py-3">DECANT 5ML</th>
                            <th className="text-center px-4 py-3">DECANT 10 ML</th>
                            <th className="text-center px-4 py-3">BOTELLA 100</th>
                            <th className="text-center px-4 py-3">ESTATUS</th>
                            <th className="text-center px-4 py-3">ACCIONES</th>

                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {perfumes.map((per) => (
                            <tr
                                key={per.id}
                                className="border-b border-gray-800 hover:bg-white/5 transition"
                            >

                                {/* Imagen */}
                                <td className="px-4 py-3">
                                    <img className="h-20 w-15 m-3" src={`http://localhost:3000/uploads/${per.imagen_url}`} alt={per.nombre_perfume} />
                                </td>

                                {/* Nombre */}
                                <td className="px-4 py-3">
                                    <p className="font-semibold">{per.nombre_perfume}</p>
                                    <p className="text-xs text-gray-400">
                                        Eau de Parfum
                                    </p>
                                </td>

                                {/* Marca */}
                                <td className="px-4 py-3 text-gray-300">
                                    {per.nombre_marca}
                                </td>

                                {/* Precios */}
                                <td className="px-4 py-3 text-yellow-500 font-semibold">
                                    ${per.precio_decant_3ml}.00
                                </td>
                                <td className="px-4 py-3 text-yellow-500 font-semibold">
                                    ${per.precio_decant_5ml}.00
                                </td><td className="px-4 py-3 text-yellow-500 font-semibold">
                                    ${per.precio_decant_10ml}.00
                                </td>

                                <td className="px-4 py-3 text-yellow-500 font-semibold">
                                    ${per.precio_botella}.00
                                </td>

                                {/* Estado */}
                                <td className="px-4 py-3">
                                    {per.id_estatus === 1 &&
                                        <p className="bg-green-600 rounded-full text-green-300 p-2">{per.estatus}</p>
                                    }
                                    {per.id_estatus === 2 &&
                                        <p className="bg-yellow-600 rounded-full text-yellow-300 p-2" >{per.estatus}</p>
                                    }

                                </td>

                                {/* Acciones */}
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        {per.id_estatus === 1 &&
                                            <>
                                                <button onClick={() => {
                                                    setPerfumeSeleccionado(per);
                                                    setModalEditar(true);
                                                }} className="p-1 text-white m-3">Editar</button>
                                                <button onClick={() => {
                                                    setPerfumeSeleccionado(per);
                                                    setModalEliminar(true);

                                                }} className="p-1 text-white m-3">Eliminar</button>
                                            </>
                                        }
                                        {per.id_estatus === 2 &&
                                            <>
                                                <button onClick={() => {
                                                    setPerfumeSeleccionado(per);
                                                    setModalRestaurar(true);
                                                }} className="p-1 text-white m-3" >Restaurar Perfume</button>
                                            </>
                                        }
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

                
                    {modalEditar && (
                        <ModalEditarPerfume
                            perfume={perfumeSeleccionado}
                            setModalEditar={setModalEditar}
                            setPerfumes={setPerfumes}
                            onSuccess={cargarPerfumes}
                        />)}
        
                    {modalEliminar && (
                        <ModalEliminarPerfume
                            perfume={perfumeSeleccionado}
                            setModalEliminar={setModalEliminar}
                            setPerfumes={setPerfumes}
                            onSuccess={cargarPerfumes}
                        />)}
        
                    {modaLRestaurar && (
                        <ModalRestaurar
                            perfume={perfumeSeleccionado}
                            setModalRestaurar={setModalRestaurar}
                            setPerfumes={setPerfumes}
                            onSuccess={cargarPerfumes}
                        />)}

            </div>

            {/* Footer abajo */}
            <div className="flex justify-between mt-6 text-xs text-gray-500">
                <p>© 2024 SMELLING GOOD LUXURY PERFUMERY</p>
                <div className="flex gap-4">
                    <span>Términos de uso</span>
                    <span>Soporte técnico</span>
                </div>
            </div>

        </div>
        /*   
                    {perfumes.length === 0 && <h1>No hay perfumes...</h1>}
                    <table border={2} className="px-15">
                        <thead className="border-b border-zinc-800 bg-gray-700 table-auto ">
                            <tr>
                                <th className="text-gray-300 font-bold">IMAGEN</th>
                                <th className="text-gray-300 font-bold">PERFUME</th>
                                <th className="text-gray-300 font-bold">MARCA</th>
                                <th className="text-gray-300 font-bold">DECANT 3ML</th>
                                <th className="text-gray-300 font-bold">DECANT 5ML</th>
                                <th className="text-gray-300 font-bold">DECANT 10ML</th>
                                <th className="text-gray-300 font-bold text-sm">BOTELLA 100ML</th>
                                <th className="text-gray-300 font-bold">ESTATUS</th>
                                <th className="text-gray-300 font-bold">ACCIONES</th>
                            </tr>
                        </thead>
        */
    )
}
export default ListadoPerfumes;