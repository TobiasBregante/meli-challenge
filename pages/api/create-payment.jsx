import axios from 'axios';

export default async function handler(req, res) {
  try {
    const accessToken = process.env.ACCESS_TOKEN_MP;

    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      req.body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al crear la preferencia de pago:', error);
    res.status(500).json({ error: 'Hubo un error al procesar el pago.' });
  }
}
