import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
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
        <div className="bg-gray-800">
            <NavLink to="add">
                <button className="bg-yellow-200 p-10">
                    Presiona aquí
                </button>
            </NavLink>
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
                {perfumes.map(per => (
                    <tr key={per.id_perfume}>

                        <td className="border border-gray-300 dark:border-gray-600 bg-gray-700 flex justify-center items-center " >
                            <img className="h-20 w-15 m-3" src={`http://localhost:3000/uploads/${per.imagen_url}`} alt={per.nombre_perfume} />
                        </td>

                        <td className="border border-gray-300 dark:border-gray-600 bg-gray-700 ">
                            <p className="text-center text-gray-300">{per.nombre_perfume}</p>
                        </td>

                        <td className="border border-gray-300 dark:border-gray-600 bg-gray-700 ">
                            <p className="text-center text-gray-300">{per.nombre_marca}</p>
                        </td>

                        <td className="border border-gray-300 dark:border-gray-600 bg-gray-700">
                            <p className="text-yellow-400 text-center">${per.precio_decant_3ml}</p>
                        </td>

                        <td className="border border-gray-300 dark:border-gray-600 bg-gray-700">
                            <p className="text-yellow-400 text-center">${per.precio_decant_5ml}</p>
                        </td>

                        <td className="border border-gray-300 dark:border-gray-600 bg-gray-700">
                            <p className="text-yellow-400 text-center">${per.precio_decant_10ml}</p>
                        </td>

                        <td className="border border-gray-300 dark:border-gray-600 bg-gray-700">
                            <p className="text-yellow-400 text-center">${per.precio_botella}</p>
                        </td>


                        <td className="border border-gray-300 dark:border-gray-600 bg-gray-700 ">
                            {per.id_estatus === 1 &&
                                <p className="bg-green-600 rounded-full text-green-300">{per.estatus}</p>
                            }
                            {per.id_estatus === 2 &&
                                <p className="bg-yellow-600 rounded-full text-yellow-300">{per.estatus}</p>
                            }

                        </td>

                        <td className="border border-gray-300 dark:border-gray-600 bg-gray-700 " colSpan={2}>
                            {per.id_estatus === 1 &&
                                <>
                                    <button onClick={() => {
                                        setPerfumeSeleccionado(per);
                                        setModalEditar(true);
                                    }} >Editar</button>
                                    <button onClick={() => {
                                        setPerfumeSeleccionado(per);
                                        setModalEliminar(true);

                                    }}>Eliminar</button>
                                </>
                            }
                            {per.id_estatus === 2 &&
                                <>
                                    <button onClick={() => {
                                        setPerfumeSeleccionado(per);
                                        setModalRestaurar(true);
                                    }} >Restaurar Perfume</button>
                                </>
                            }
                        </td>
                    </tr>

                ))}

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
    )
}

export default ListadoPerfumes;