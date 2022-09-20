import Formulario from "../components/Formulario"
import { useEffect, useState} from "react"
import { useParams } from "react-router-dom"

const EditarCliente = () => {

  
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  const {id} = useParams()

  useEffect(()=>{
      
      const obtenerClienteApi = async () => {
          try {
              const url = `http://localhost:4000/clientes/${id}`
              const respuesta = await fetch(url)
              const resultado = await respuesta.json()
              setCliente(resultado)
          } catch (error) {
              console.log(error)
          }
          setCargando(!cargando)
      }

      obtenerClienteApi()

  }, [])

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>Este formulario modifica los datos del cliente</p>

      {cliente?.nombre ? (
        <Formulario 
          cliente={cliente}
          cargando = {cargando}
        />
      ): <p>No existe Cliente registrado con este ID.</p> }

    </>
  )
}

export default EditarCliente