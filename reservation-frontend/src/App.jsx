import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListaReservas from './components/ListaReservas';
import FormularioReserva from './components/FormularioReservas';
import { Container, Typography } from '@mui/material';

const App = () => {
  const [reservas, setReservas] = useState([]);
  const [reservaInicial, setReservaInicial] = useState({
    cliente: '',
    vehiculo: '',
    fechaInicio: '',
    fechaFin: '',
  });

  const obtenerReservas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/reservas');
      setReservas(response.data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const guardarReserva = async (reserva) => {
    try {
      if (reserva.id) {
        await axios.put(`http://localhost:8080/reservas/${reserva.id}`, reserva);
      } else {
        await axios.post('http://localhost:8080/reservas', reserva);
      }
      obtenerReservas();
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
    }
  };

  const eliminarReserva = async (id) => {
    try {
      const reserva = reservas.find((r) => r.id === id);
      reserva.cancelada = true;
      await axios.delete(`http://localhost:8080/reservas/${id}`, reserva);
      obtenerReservas();
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Sistema de Reservas de Vehículos
      </Typography>
      
      {/* Formulario para crear una nueva reserva */}
      <FormularioReserva 
        reservaInicial={reservaInicial} 
        onGuardarReserva={guardarReserva} 
      />

      {/* Lista de reservas */}
      <ListaReservas
        reservas={reservas}
        onGuardarReserva={guardarReserva}
        onEliminarReserva={eliminarReserva}
      />
    </Container>
  );
};

export default App;