// import logo from './logo.svg';
import './App.css';
import ListadoPerfumes from './Components/ListadoPerfumes';
import PanelPerfumes from './Components/PanelPerfumes';
import { useState, useEffect } from 'react';
import { ListadoMarcas } from './Components/ListadoMarcas';
import AgregarMarca from './Components/AgregarMarca';
import { RutasApp } from './Routes/Routes';

function App() {
 
  return (

      // <div className="flex items-center justify-center h-screen bg-gray-900">
        <div>
          <RutasApp/>

    {/* {/* // <div className="App"> /* */}
       {/* <PanelPerfumes onSuccess={cargarPerfumes} /> 

      {/* </div> */}

    {/* //   <AgregarMarca/>
      
    //   <ListadoMarcas marcas = {marcas}/> */}

    </div>
  );
}

export default App;
