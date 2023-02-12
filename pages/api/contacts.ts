import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export type Contact = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  birthday: string;
  createdAt: string;
};

const API_URL = 'https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;
  const { id } = query;

  try {
    switch (method) {
      case 'GET':
        const response: AxiosResponse<Contact[]> = await axios.get(API_URL);
        res.status(200).json(response.data);
        break;
      case 'POST':
        const postResponse: AxiosResponse<Contact> = await axios.post(API_URL, body);
        res.status(201).json(postResponse.data);
        break;
      case 'PUT':
        const putResponse: AxiosResponse<Contact> = await axios.put(`${API_URL}/${id}`, body);
        res.status(200).json(putResponse.data);
        break;
      case 'DELETE':
        await axios.delete(`${API_URL}/${id}`);
        res.status(204).send('');
        break;
      default:
        res.status(405).send('Method Not Allowed');
        break;
    }
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
};

export default handler;
