import Error from 'next/error';

export interface IError extends Error {
  response: { data: { msg: string } };
}
