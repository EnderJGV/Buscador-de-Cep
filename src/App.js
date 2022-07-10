import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './style.css';
import api from './services/api';

function App() {

  const[input,setInput] = useState('')
  const[cep,setCep] = useState({})

  async function handleSearch(){
    //01001000/json/

    if(input === ""){
      alert("Precha algum CEP");
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }catch{
      alert("Ops erro ao buscar aqui!");
      setInput("");
    }
  }

  return (
    <div className="container">

      <h1 className="title">Buscador Cep</h1>
      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e)=>{
          setInput(e.target.value)
        }}
        />

        <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#fff"/>
      </button>
      </div>
      
        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>{cep.cep}</h2>
        
            <span>CEP: {cep.logradouro}</span>
            <span>complemento:{cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
            <span>{cep.ibge}</span>
            <span>{cep.gia}</span>
            <span>{cep.ddd}</span>
            <span>{cep.siafi}</span>
          </main>
        )}



    </div>
  );
}

export default App;
