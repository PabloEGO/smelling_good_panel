import React from 'react'
import { useEffect, useState } from 'react'
export const ListadoMarcas = () => {
    const [marcas, setMarcas] = useState([]);

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
        <div>
            {marcas.length === 0 && <h1>No hay Marcas...</h1>}

            {marcas.map(mar => (
                <div key={mar.id_marca}>

                    <p>Marcas</p><br />
                    <p>{mar.nombre_marca} Id Marca {mar.id_marca}</p> <br></br>
                    <img style={{ height: 150, width: 120 }} src={`http://localhost:3000/uploads/${mar.img_marca}`} alt={mar.nombre_marca} />

                    {/* {per.id_estatus === 1 &&
                        <>
                            <button onClick={() => {
                                setPerfumeSeleccionado(per);
                                setModalEditar(true);
                            }} >Editar</button>
                            <button onClick={() => {
                                setPerfumeSeleccionado(per);
                                setModalEliminar(true);
                            }}>Eliminar</button> */}
                    {/* </> */}
                    {/* // } */}

                    {/* {per.id_estatus === 2 &&
                        <>
                            <button onClick={() => {
                                setPerfumeSeleccionado(per);
                                setModalRestaurar(true);
                            }} >Restaurar Perfume</button> */}
                    {/* <button onClick={() => {
                                setPerfumeSeleccionado(per);
                                setModalEliminar(true);
                            }}>Eliminar</button> */}
                    {/* </>
                    } */}



                    {/* <img src={per.imagen_url} alt={per.nombre_perfume} /> */}

                    <hr />
                </div>

            ))}

        </div>
    )
}


