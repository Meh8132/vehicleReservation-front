import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2'; 
import FormularioReserva from './FormularioReservas';

const ListaReservas = ({ reservas, onGuardarReserva, onEliminarReserva }) => {
  const [reservaParaEditar, setReservaParaEditar] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const manejarEditarReserva = (reserva) => {
    setReservaParaEditar(reserva);
    setOpenModal(true);
  };

  const cerrarModal = () => {
    setReservaParaEditar(null);
    setOpenModal(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        {reservas.map((reserva) => (
          <Grid item xs={12} sm={6} md={4} key={reserva.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Cliente: {reserva.cliente}</Typography>
                <Typography variant="body1">Vehículo: {reserva.vehiculo}</Typography>
                <Typography variant="body2">
                  Inicio: {new Date(reserva.fechaInicio).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Fin: {new Date(reserva.fechaFin).toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => manejarEditarReserva(reserva)}
                  disabled={reserva.cancelada} // Desactivar si la reserva está cancelada
                  sx={{ mt: 2 }}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onEliminarReserva(reserva.id)}
                  disabled={reserva.cancelada} // Desactivar si la reserva está cancelada
                  sx={{ mt: 2, ml: 2 }}
                >
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Formulario para editar la reserva en un pop-up */}
      {reservaParaEditar && (
        <FormularioReserva
          reservaInicial={reservaParaEditar}
          open={openModal}
          onClose={cerrarModal}
          onGuardarReserva={onGuardarReserva}
        />
      )}
    </>
  );
};

export default ListaReservas;