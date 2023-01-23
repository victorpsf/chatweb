import process from 'process'

export const HOST = process.env.SERVER_HOST || '0.0.0.0';
export const PORT = parseInt(process.env.SERVER_PORT) || 3000;
