import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Configura las credenciales de Mercado Pago
    const accessToken = 'APP_USR-4128705031394975-102715-7eb2250f00d197dce296703c08a194de-348846213'; // Reemplaza con tu access token de Mercado Pago

    // Crea una preferencia de pago en Mercado Pago
    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      req.body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json({ init_point: response.data.init_point });
  } catch (error) {
    console.error('Error al crear la preferencia de pago:', error);
    res.status(500).json({ error: 'Hubo un error al procesar el pago.' });
  }
}
