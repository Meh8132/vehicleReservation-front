import Grid from '@mui/material/Grid2'
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Modal } from '@mui/material';

const FormularioReserva = ({ reservaInicial, open, onClose, onGuardarReserva }) => {
  const [reserva, setReserva] = useState({
    cliente: '',
    vehiculo: '',
    fechaInicio: '',
    fechaFin: '',
  });

  useEffect(() => {
    if (reservaInicial) {
      setReserva(reservaInicial);
    }
  }, [reservaInicial]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setReserva((prev) => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (!reserva.cliente || !reserva.vehiculo || !reserva.fechaInicio || !reserva.fechaFin) {
      alert('Por favor, rellena todos los campos.');
      return;
    }
    await onGuardarReserva(reserva);
    if (onClose) {
      onClose(); // Cierra el modal si existe
    }
  };

  return (
    <>
      {open ? (
        <Modal open={open} onClose={onClose}>
          <Box
            component="form"
            onSubmit={manejarSubmit}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: {
                xs: '95%', // 90% del ancho en pantallas pequeñas
                sm: '80%', // 80% del ancho en pantallas medianas
                md: '80%', // 70% del ancho en pantallas grandes (PC)
              },
              bgcolor: 'background.paper',
              borderRadius: 1,
              boxShadow: 24,
              p: 4,
            }}
          >
            <FormularioInterno
              reserva={reserva}
              manejarCambio={manejarCambio}
              manejarSubmit={manejarSubmit}
            />
          </Box>
        </Modal>
      ) : (
        <Box
          component="form"
          onSubmit={manejarSubmit}
          sx={{
            mt: 4,
            width: {
              xs: '95%', // 90% en móviles
              sm: '80%', // 80% en tablets
              md: '90%', // 70% en pantallas más grandes
            },
            mx: 'auto', // Centrar el formulario horizontalmente
          }}
        >
          <FormularioInterno
            reserva={reserva}
            manejarCambio={manejarCambio}
            manejarSubmit={manejarSubmit}
          />
        </Box>
      )}
    </>
  );
};

const FormularioInterno = ({ reserva, manejarCambio, manejarSubmit }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Cliente"
        name="cliente"
        value={reserva.cliente}
        onChange={manejarCambio}
        required
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Vehículo"
        name="vehiculo"
        value={reserva.vehiculo}
        onChange={manejarCambio}
        required
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Fecha de Inicio"
        name="fechaInicio"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        value={reserva.fechaInicio}
        onChange={manejarCambio}
        required
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Fecha de Fin"
        name="fechaFin"
        type="datetime-local"
        InputLabelProps={{ shrink: true }}
        value={reserva.fechaFin}
        onChange={manejarCambio}
        required
      />
    </Grid>
    <Grid item xs={12}>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Guardar
      </Button>
    </Grid>
  </Grid>
);

export default FormularioReserva;
