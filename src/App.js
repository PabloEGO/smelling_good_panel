// import logo from './logo.svg';
import './App.css';
import ListadoPerfumes from './Components/ListadoPerfumes';
import PanelPerfumes from './Components/PanelPerfumes';
import ModalEliminarPerfume from './Components/ModalEliminarPerfume';
import ModalEditarPerfume from './Components/ModalEditarPerfume';
import { ModalRestaurar } from './Components/ModalRestaurar';
import { useState, useEffect } from 'react';
import { ListadoMarcas } from './Components/ListadoMarcas';
import AgregarMarca from './Components/AgregarMarca';


function App() {
  const [perfumes, setPerfumes] = useState([]);
  const [marcas, setMarcas] = useState([]);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modaLRestaurar, setModalRestaurar] = useState(false);

  const [perfumeSeleccionado, setPerfumeSeleccionado] = useState(false);


  const cargarPerfumes = () => {
    fetch("http://localhost:3000/perfumes") // 👈 endpoint GET
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPerfumes(data);
      })
  }

  const cargarMarcas = () => {
    fetch("http://localhost:3000/marcas") // 👈 endpoint GET
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMarcas(data.resultado);
      })
  }


  useEffect(() => {
    cargarPerfumes();
    cargarMarcas();
  }, []);

  return (

      // <div className="flex items-center justify-center h-screen bg-gray-900">
        <div>


      {/* <h1 className="text-4xl font-bold text-white">
        Tailwind funcionando 🚀
      </h1> */}
    {/* </div> */}
    {/* // <div className="App">
    //   <PanelPerfumes onSuccess={cargarPerfumes} /> */}

      <ListadoPerfumes perfumes = {perfumes} 
       setModalEditar = {setModalEditar}
       setModalEliminar = {setModalEliminar}
       setModalRestaurar={setModalRestaurar}
       setPerfumeSeleccionado = {setPerfumeSeleccionado}
      /> 

      {/* </div> */}

    {/* //   <AgregarMarca/>
      
    //   <ListadoMarcas marcas = {marcas}/> */}



      {modalEliminar && (
        <ModalEliminarPerfume
          perfume={perfumeSeleccionado}
          setModalEliminar={setModalEliminar}
          setPerfumes={setPerfumes}
          onSuccess={cargarPerfumes}
        />
      )}

      {modalEditar && (
        <ModalEditarPerfume
          perfume={perfumeSeleccionado}
          setModalEditar={setModalEditar}
          setPerfumes={setPerfumes}
          onSuccess={cargarPerfumes}
        />
      )}

      {modaLRestaurar && (
        <ModalRestaurar
          perfume={perfumeSeleccionado}
          setModalRestaurar={setModalRestaurar}
          setPerfumes={setPerfumes}
          onSuccess={cargarPerfumes}
        />
      )}


    </div>
  );
}

export default App;
