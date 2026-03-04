import './ModalStyles.css';

import React from 'react'

export const ModalRestaurar = ({ perfume, setModalRestaurar, onSuccess }) => {

    const restaurar = () => {
        fetch(`http://localhost:3000/perfumes/restaurar/${perfume.id_perfume}`, {
            method: "PUT"
        })
            .then(() => {
                setModalRestaurar(false)
                onSuccess();
            }).catch(e => alert(e));
    }

    return (
        // <div className="modal-overlay">
        //     <div className="modal-content">
        //         <h3>¿Restaurar perfume?</h3>
        //         <p>{perfume.nombre_perfume}</p>

        //         <button onClick={restaurar}>Aceptar</button>
        //         <button onClick={() => setModalRestaurar(false)}>Cancelar</button>
        //     </div>
        // </div>

        <div className="fixed md:absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-90">
            <div className="bg-zinc-900 border border-yellow-500/30 w-[420px] rounded-2xl shadow-2xl p-6">
                <div className="flex flex-col items-center">

                    <div className="bg-yellow-500/20 p-3 rounded-full mb-4">
                        <span className="text-yellow-400 text-xl cursor-pointer" onClick={() => setModalRestaurar(false)}>✖</span>
                    </div>

                    <h2 className="text-white text-lg font-semibold">
                        ¿Restaurar Perfume?
                    </h2>

                    <div className="bg-zinc-800 w-full rounded-lg p-3 mt-4">
                        <p className="text-xs text-yellow-400 uppercase tracking-widest">
                            Fragancia seleccionada
                        </p>
                        <p className="text-white font-medium">
                            {perfume.nombre_perfume}
                        </p>
                    </div>

                    <p className="text-gray-400 text-sm text-center mt-4">
                        ¿Estás seguro que deseas restaurar el perfume
                        <span className="italic text-white"> “{perfume.nombre_perfume}”</span>?
                    </p>

                    {/* <div className="bg-red-500/20 text-red-400 text-xs p-2 rounded-md mt-3 w-full text-center">
            ⚠ Esta acción no se puede deshacer.
          </div> */}

                    <div className="flex gap-3 w-full mt-6">
                        <button className="flex-1 py-2 rounded-lg border border-zinc-700 text-gray-300 hover:bg-zinc-800" onClick={() => setModalRestaurar(false)}>
                            Cancelar
                        </button>

                        <button className="flex-1 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400" onClick={restaurar}>
                            Aceptar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
