import React, { useState } from 'react';
import './ModalStyles.css';

function ModalEditarPerfume({ perfume, setModalEditar, setPerfumes, onSuccess }) {

    const [dataForm, setDataForm] = useState({
        nombre_perfume: perfume.nombre_perfume,
        precio_decant_3ml: perfume.precio_decant_3ml,
        precio_decant_5ml: perfume.precio_decant_5ml,
        precio_decant_10ml: perfume.precio_decant_10ml,
        precio_botella: perfume.precio_botella,
        // // imagen_url: "perfumes/Perfume1.jpg",
        // id_marca: "",
        // id_genero: "",
        // id_estatus: 1
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setDataForm({
            ...dataForm,
            [name]: type === "number" ? Number(value) : value
            // [name]: value
        });
    };

    const EditarPerfume = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/perfumes/editar/${perfume.id_perfume}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                precio_decant_3ml: dataForm.precio_decant_3ml,
                precio_decant_5ml: dataForm.precio_decant_5ml,
                precio_decant_10ml: dataForm.precio_decant_10ml,
                precio_botella: dataForm.precio_botella
            })
        })
            .then(() => {
                setModalEditar(false)
                onSuccess();
            }).catch(e => alert(e));
    }

    return (
        // <div className="modal-overlay">
        //     <div className="modal-content">
        //         <h3>Editar perfume</h3>
        //         <p>{perfume.nombre_perfume}</p>
        //         <br />
        //         <img style={{ height: 100, width: 80 }} src={`http://localhost:3000/uploads/${perfume.imagen_url}`} alt={perfume.nombre_perfume} />

        //         <form onSubmit={EditarPerfume}>

        //             <h3>Precio decant de 3ml</h3>
        //             <input type="number" inputMode="numeric" name="precio_decant_3ml" pattern="\d*" value={dataForm.precio_decant_3ml} onChange={handleChange}></input>
        //             <br />

        //             <h3>Precio decant de 5ml</h3>
        //             <input type="number" name="precio_decant_5ml" value={dataForm.precio_decant_5ml} onChange={handleChange}></input>
        //             <br />

        //             <h3>Precio decant de 10ml</h3>
        //             <input type="number" name="precio_decant_10ml" value={dataForm.precio_decant_10ml} onChange={handleChange}></input>
        //             <br />
        //             <h3>Precio botella de 100ml</h3>
        //             <input type="number" name="precio_botella" value={dataForm.precio_botella} onChange={handleChange}></input>
        //             <br />
        //             <br />
        //             <input type="submit"
        //                 id="save"
        //                 value="Guardar Cambios" />
        //             {/* <button onClick={eliminar}>Sí, Editar Perfume</button> */}
        //         </form>
        //         <button onClick={() => setModalEditar(false)}>Cancelar</button>
        //     </div>
        // </div>


        <div className="fixed md:absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-90">
            <div className="bg-zinc-900 border border-yellow-500/30 w-[420px] rounded-2xl shadow-2xl p-6">
                <div className="flex flex-col items-center">

                    {/* <div className="bg-yellow-500/20 p-3 rounded-full mb-4">
                        <span className="text-yellow-400 text-xl cursor-pointer">✖</span>
                    </div> */}

                    <div className='flex '>
                        <h2 className="text-white text-lg font-semibold">
                            Editar precios de perfume
                        </h2>
                        <span className="text-red-300 text-md cursor-pointer" onClick={() => setModalEditar(false)}>✖</span>
                    </div>


                    <div className="bg-zinc-800 w-full rounded-lg p-3 mt-4">

                        <img className="h-20 w-15 m-3" src={`http://localhost:3000/uploads/${perfume.imagen_url}`} alt={perfume.nombre_perfume} />

                        <p>Producto seleccionado</p>
                        <p>{perfume.nombre_perfume}</p>
                        <p>{perfume.nombre_marca}</p>
                        <p>{perfume.descripcion_genero}</p>
                        {/* <p className="text-xs text-yellow-400 uppercase tracking-widest">
                            Fragancia seleccionada
                        </p>
                        <p className="text-white font-medium">
                            {perfume.nombre_perfume}
                        </p> */}
                    </div>
                    <form onSubmit={EditarPerfume}>

                        <div className='flex gap-3 w-full'>
                            <span className='flex-1 justify-center items-center p-6'>Decant 3ml</span>
                            <span className='flex-1 justify-center items-center p-6'>Decant 5ml</span>

                            {/* // className="text-gray-400 text-sm o-center mt-4"> */}
                            {/* ¿Estás seguro que deseas restaurar el perfume
                        <span className="italic text-white"> “{perfume.nombre_perfume}”</span>? */}
                        </div>


                        <div className='flex gap-3 w-full'>
                            <input type='number' inputMode="numeric" name="precio_decant_3ml" pattern="\d*" value={dataForm.precio_decant_3ml} onChange={handleChange}
                            className='flex-1 justify-center items-center ' />
                            <input type='number' name="precio_decant_5ml" value={dataForm.precio_decant_5ml} onChange={handleChange} 
                            className='flex-1 justify-center items-center ' />
                        </div>

                        <div className='flex gap-3 w-full'>
                            <span className='flex-1 justify-center items-center p-6'>Decant 10ml</span>
                            <span className='flex-1 justify-center items-center p-6'>Botella 100ml</span>
                        </div>


                        <div className='flex gap-3 w-full'>
                            <input type='number' name="precio_decant_10ml" value={dataForm.precio_decant_10ml} onChange={handleChange}
                             className='flex-1 justify-center items-center ' />
                            <input type='number' name="precio_botella" value={dataForm.precio_botella} onChange={handleChange}
                            className='flex-1 justify-center items-center ' />
                        </div>


                        <div className="flex gap-3 w-full mt-6">
                            <button className="flex-1 py-2 rounded-lg border border-zinc-700 text-gray-300 hover:bg-zinc-800" onClick={() => setModalEditar(false)}>
                                Cancelar
                            </button>

                            <input type='submit' id='save' value="Guardar Cambios" className="flex-1 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarPerfume;