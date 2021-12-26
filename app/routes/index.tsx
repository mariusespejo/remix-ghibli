import { LoaderFunction, redirect } from 'remix';

export const loader: LoaderFunction = async () => {
  return redirect('/films');
};
