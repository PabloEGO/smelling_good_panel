import { useState, useRef } from 'react';

export const AgregarMarca = ({ setModalAdd,onSuccess }) => {

    const [dataForm, setDataForm] = useState({
        nombre_marca: ""
    });
    const [filePreview, setFilePreview] = useState(null);

    const inputFileRef = useRef(null);

    const openFileInput = () => {
        inputFileRef.current.click()
    }




    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setDataForm({
            ...dataForm,
            [name]: type === "number" ? Number(value) : value
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

    const añadirMarca = (e) => {
        e.preventDefault();

        console.log(dataForm);

        const formData = new FormData();
        formData.append("nombre_marca", dataForm.nombre_marca);
        formData.append("img_marca", file);

        fetch("http://localhost:3000/marcas", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log("Guardado:", data)
                // alert("Perfume guardado correctamente");
                setModalAdd(false);
                onSuccess();
            })
            .catch(err => console.error(err));
    };



    return (
        <div className="fixed md:absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-90">
            <div className="bg-zinc-900 border border-yellow-500/30 w-[420px] rounded-2xl shadow-2xl p-6">
                <div className="flex flex-col items-center">
                    <form onSubmit={añadirMarca}>

                        <div className="flex justify-center mb-1">
                            <span className=" bg-yellow-500/20 p-2 rounded-full text-yellow-400 text-xl cursor-pointer" onClick={() => setModalAdd(false)}>✖</span>
                        </div>

                        <h2 className=" flex items-center justify-center text-white text-lg font-semibold">
                            Agregando marca al catalogo
                        </h2>

                        <div className="bg-zinc-800 w-full rounded-lg p-3 mt-4">
                            <label className="text-xs text-yellow-400 uppercase tracking-widest">
                                Nombre de la marca
                            </label>
                            <input type="text" name="nombre_marca" autoComplete='off' value={dataForm.nombre_marca} onChange={handleChange}
                                className="w-full mt-2 p-3 rounded-lg bg-[#1a1a1a] border border-yellow-900/40 text-white focus:outline-none focus:ring-1 focus:ring-yellow-600" />
                        </div>

                        <div onClick={openFileInput}
                         className="border-2 border-dashed border-yellow-900/40 rounded-xl  mt-5 h-32 flex flex-col items-center justify-center text-center text-gray-400 hover:border-yellow-600 cursor-pointer">
                            {filePreview ? (
                                <img src={filePreview} alt={file} className="h-20 w-35" />
                            ) : (
                                <>
                                    <div className="text-4xl">🖼️</div>

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


                        <div className="flex gap-3 w-full mt-6">
                            <button className="flex-1 py-2 rounded-lg border border-zinc-700 text-gray-300 hover:bg-zinc-800" onClick={() => setModalAdd(false)}>
                                Cancelar
                            </button>

                            <input type='submit' id='save' value="Guardar" className="flex-1 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-400" />
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default AgregarMarca;

