import { useState } from 'react';

export const AgregarMarca = () => {

    const [dataForm, setDataForm] = useState({
        nombre_marca: ""
    });

    const [file,setFile] = useState(null);

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
                // onSuccess();
              
            })
            .catch(err => console.error(err));
    };



    return (

        <div>
            <form onSubmit={añadirMarca}>
                <h3>Nombre de la marca</h3>
                <input type="text" name="nombre_marca" value={dataForm.nombre_marca} onChange={handleChange}></input>
                <br />

                <h3>Cargar imagen </h3>
                <input type="file" accept="image/*" name="img_marca" onChange={handleFile}/>
                <br />

                <br /><br />

                <input type="submit"
                    id="save"
                    value="Guardar" />

            </form>
        </div>
    )
}

export default AgregarMarca;

