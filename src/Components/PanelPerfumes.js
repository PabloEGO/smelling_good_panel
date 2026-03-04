import React, { useEffect, useState } from "react";

function PanelPerfumes({onSuccess}) {

    const [marcas, setMarcas] = useState([]);
    const [genero, setGenero] = useState([]);
    const [dataForm, setDataForm] = useState({
        nombre_perfume: "",
        precio_decant_3ml: "",
        precio_decant_5ml: "",
        precio_decant_10ml: 500,
        precio_botella: "",
        // imagen_url: "perfumes/Perfume1.jpg",
        id_marca: "",
        id_genero: "",
        id_estatus: 1
    });

    const [file,setFile] = useState(null);

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
        setFile(e.target.files[0]);

    }

    const AñadirPerfume = (e) => {
        e.preventDefault();

        console.log(dataForm);

        const formData = new FormData();
        formData.append("nombre_perfume", dataForm.nombre_perfume);
        formData.append("precio_decant_3ml",dataForm.precio_decant_3ml);
        formData.append("precio_decant_5ml",dataForm.precio_decant_5ml);
        formData.append("precio_decant_10ml",dataForm.precio_decant_10ml);
        formData.append("precio_botella",dataForm.precio_botella);
        formData.append("imagen", file);
        formData.append("id_marca",dataForm.id_marca);
        formData.append("id_genero",dataForm.id_genero);
        formData.append("id_estatus",dataForm.id_estatus);
   
        fetch("http://localhost:3000/perfumes", {
            method: "POST",
            // headers: {
            //     "Content-Type": "application/json"
            // },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log("Guardado:", data)
                // alert("Perfume guardado correctamente");
                onSuccess();
              
            })
            .catch(err => console.error(err));
    };



    return (

        <div>
            <form onSubmit={AñadirPerfume}>
                <h3>Nombre del perfume</h3>
                <input type="text" name="nombre_perfume" value={dataForm.nombre_perfume} onChange={handleChange}></input>
                <br />

                <h3>Precio decant de 3ml</h3>
                <input type="text" inputMode="numeric" name="precio_decant_3ml" pattern="\d*" value={dataForm.precio_decant_3ml} onChange={handleChange}></input>
                <br />

                <h3>Precio decant de 5ml</h3>
                <input type="number" name="precio_decant_5ml" value={dataForm.precio_decant_5ml} onChange={handleChange}></input>
                <br />

                <h3>Precio decant de 10ml</h3>
                <input type="number" name="precio_decant_10ml" value={dataForm.precio_decant_10ml} onChange={handleChange}></input>
                <br />

                <h3>Precio botella de 100ml</h3>
                <input type="number" name="precio_botella" value={dataForm.precio_botella} onChange={handleChange}></input>
                <br />

                <h3>Cargar imagen </h3>
                <input type="file" accept="image/*" name="imagen" onChange={handleFile}/>
                <br />

                <h3>Marca: </h3>
                <select name="id_marca" value={dataForm.id_marca} onChange={handleChange}>
                    {marcas.map(m => (
                        <option key={m.id_marca} value={m.id_marca} >
                            {m.nombre_marca}
                        </option>
                    ))}
                </select>
                <br />
                <h3>Genero: </h3>

                <select name="id_genero" value={dataForm.id_genero} onChange={handleChange} >
                    {genero.map(g => (
                        <option key={g.id_genero} value={g.id_genero}>
                            {g.descripcion_genero}
                        </option>
                    ))}
                </select>

                <br /><br />

                <input type="submit"
                    id="save"
                    value="Guardar" />

            </form>
        </div>
    )
}

export default PanelPerfumes;