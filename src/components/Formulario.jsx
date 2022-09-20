import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import Alerta from './Alerta'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'



const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3,'El nombre es muy corto').max(25,'Nombre muy largo').required('El nombre del Cliente es obligatorio'),
        empresa: Yup.string().required('El nombre de la Empresa es obligatorio'),
        email: Yup.string().email('Email no valido').required('El Email es obligatorio'),
        telefono: Yup.number().integer('Número no válido').positive('Número no válido').typeError('No es un numero válido')
    })

    const handleSubmit = async (valores) =>{
        try {
            let respuesta;
            if(cliente.id){
                //Editar registro
                const url = `http://localhost:4000/clientes/${cliente.id}`

                    respuesta = await fetch(url,{
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }else{
                //Nuevo registro
                const url = 'http://localhost:4000/clientes'

                    respuesta = await fetch(url,{
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
                
            await respuesta.json()
            navigate('/clientes')
        } catch (error) {
            console.log('Hubo un error')
        }
    }

    return (
        cargando ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='font-bold uppercase text-center text-gray-600 text-xl'
                >{cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}</h1>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values, {resetForm}) => {
                        await handleSubmit(values)
                        resetForm()
                    }}

                    validationSchema={nuevoClienteSchema}
                >
                    {({errors, touched}) => {
                        
                        return (

                    <Form className='mt-10'>
                        <div className='mb-4'>
                            <label
                                className='text-gray-800'
                                htmlFor='nombre'
                            >Nombre: </label>
                            <Field 
                                id='nombre'
                                type='text'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Nombre de Cliente'
                                name='nombre'
                            />
                            {errors.nombre && touched.nombre ? (
                                <Alerta>{errors.nombre}</Alerta>
                            ) : null }

                        </div>
                        <div className='mb-4'>
                            <label
                                className='text-gray-800'
                                htmlFor='empresa'
                            >Empresa: </label>
                            <Field 
                                id='empresa'
                                type='text'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Nombre de Empresa'
                                name='empresa'
                            />
                            {errors.empresa && touched.empresa ? (
                                <Alerta>{errors.empresa}</Alerta>
                            ) : null }
                        </div>
                        <div className='mb-4'>
                            <label
                                className='text-gray-800'
                                htmlFor='email'
                            >Email: </label>
                            <Field 
                                id='email'
                                type='email'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Email del cliente'
                                name='email'
                            />
                            {errors.email && touched.email ? (
                                <Alerta>{errors.email}</Alerta>
                            ) : null }
                        </div>
                        <div className='mb-4'>
                            <label
                                className='text-gray-800'
                                htmlFor='telefono'
                            >Telefono: </label>
                            <Field 
                                id='telefono'
                                type='tel'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Telefono de cliente'
                                name='telefono'
                            />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>{errors.telefono}</Alerta>
                            ) : null }
                        </div>
                        <div className='mb-4'>
                            <label
                                className='text-gray-800'
                                htmlFor='notas'
                            >Notas: </label>
                            <Field
                                as='textarea' 
                                id='notas'
                                type='text'
                                className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                placeholder='Notas de cliente'
                                name='notas'

                            />
                        </div>

                        <input 
                            type="submit" 
                            value={cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}
                            className='mt-5 w-full bg-blue-800 p-3 text-yellow-300 uppercase font-bold text-lg'
                        />
                    </Form>

                    )}}
                </Formik>

            </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario