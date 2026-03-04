import React from "react";
// import { useState, useEffect } from "react";
function ListadoPerfumes({ perfumes, setModalEditar, setModalEliminar, setPerfumeSeleccionado, setModalRestaurar }) {

    return (
        <div>

            {perfumes.length === 0 && <h1>No hay perfumes...</h1>}

            <table border={2}>
                <thead className="border-b border-zinc-800 bg-gray-700 table-auto">
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

        </div>
    )
}

export default ListadoPerfumes;