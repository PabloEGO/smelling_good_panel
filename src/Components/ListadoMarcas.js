import React from 'react'
import { useEffect, useState } from 'react'
import AgregarMarca from './AgregarMarca';
 import { useSearchParams } from "react-router";

export const ListadoMarcas = () => {
    const [marcas, setMarcas] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    // const [page, setPage] = useState(2);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("p")) || 1;
    const [detailsData, setDetailsData] = useState([]);
    const marcasCount = Math.min(page * 6, detailsData.totalItems);

    const cargarMarcas = () => {
        fetch(`http://localhost:3000/marcas?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMarcas(data.items);
                setTotalPages(data.totalPages);
                setDetailsData(data);
            })
    }

    useEffect(() => {
        cargarMarcas();
    }, [page])


const cambiarPagina = (nuevaPagina) => {
  setSearchParams({ p: nuevaPagina });
};

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#1a1206] to-[#0f0a03] text-white p-8">
            {/*   Background original* bg-[#0b0f14]/ } 
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Gestión de Marcas</h1>
                <p className="text-yellow-500 text-sm">
                    Administre su cartera exclusiva de marcas de lujo
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

                {marcas.map((marca, index) => (
                    <div
                        key={index}
                        className="bg-[#1b1408] border border-yellow-700/30 rounded-xl p-6 flex flex-col items-center text-center hover:border-yellow-500 transition"
                    >

                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                            <img className="h-20 w-15 m-3" src={`http://localhost:3000/uploads/${marca.img_marca}`} alt={marca.nombre_marca} />

                        </div>

                        <h3 className="font-semibold">{marca.nombre_marca}</h3>
                        {/* <p className="text-xs text-yellow-600">
                            {marca.descripcion}
                        </p> */}

                    </div>
                ))}

                {/* Nueva Marca */}
                <div onClick={() => setModalAdd(true)} className="border-2 border-dashed border-yellow-600 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-yellow-600/10 transition cursor-pointer">

                    <div className="w-12 h-12 rounded-full bg-yellow-700 flex items-center justify-center mb-3">
                        <span className="text-xl font-bold">+</span>
                    </div>

                    <p className="text-yellow-500 text-sm font-medium">
                        Nueva Marca
                    </p>

                </div>
            </div>


              <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">
                        Mostrando {marcasCount} de {detailsData.totalItems} perfumes
                    </p>

                    <div className="flex items-center gap-2 p-3">

                        {Array.from({ length: totalPages }, (_, i) => {
                            const pageNumber = i + 1;

                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => cambiarPagina(pageNumber)}
                                    className={pageNumber === page ? "bg-yellow-600 font-semibold hover:opacity-90 text-black px-3 py-1 rounded" : "px-3 py-1"}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}

                    </div>
                </div>


              {/* {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => cambiarPagina(i + 1)}>
                        {i + 1}
                    </button>
                ))} */}

            {modalAdd && (
                <AgregarMarca
                    setModalAdd={setModalAdd}
                    onSuccess={cargarMarcas}
                />)}

        </div>
    )
}


