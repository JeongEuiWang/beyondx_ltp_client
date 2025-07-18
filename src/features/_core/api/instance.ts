import ky, { KyInstance } from 'ky';
import { useUserStore } from '@/features/user';

const baseURL = import.meta.env.VITE_API_URL;

const baseApi = ky.create();

const authApi =  ky.create({
  timeout: 30000,
  hooks: {
    beforeRequest: [
      (request) => {  
        const { getAccessToken } = useUserStore.getState().actions;
        const token = getAccessToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

const server = (api: KyInstance) => (route: string) => {
  return api.extend({
    prefixUrl: `${baseURL}/${route}/`
  });
};

const baseServer = server(baseApi);
const authServer = server(authApi);

const AuthServer = baseServer('auth');
const UserServer = authServer('user');
const RateServer = baseServer('rate');
const CargoServer = baseServer('cargo');
const QuoteServer = authServer('quote');
const AdminServer = authServer('admin');

export {
  AuthServer,
  UserServer,
  RateServer,
  CargoServer,
  QuoteServer,
  AdminServer,
}

