import React from 'react'
import { useEffect, useState } from 'react'
import AgregarMarca from './AgregarMarca';
export const ListadoMarcas = () => {
    const [marcas, setMarcas] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);

    const cargarMarcas = () => {
        fetch("http://localhost:3000/marcas") // 👈 endpoint GET
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMarcas(data.resultado);
            })
    }

    useEffect(() => {
        cargarMarcas();
    }, [])

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

               {modalAdd && (
                <AgregarMarca
                    setModalAdd={setModalAdd}
                    onSuccess={cargarMarcas}
                />)}

        </div>
    )
}


