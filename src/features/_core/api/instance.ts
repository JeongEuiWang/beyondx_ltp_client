import ky, { KyInstance } from 'ky';
const baseURL = 'http://localhost:8000/api/';

const baseApi = ky.create();

const authApi =  ky.create({
  timeout: 30000,
  hooks: {
    beforeRequest: [
      (request) => {
        // // insert access token to header
        // const {getToken} = useStudentStore.getState().actions;
        // const token = getToken()[0].token;
        // if (token) {
        //   request.headers.set("Authorization", `Bearer ${token}`);
        // }
      },
    ],
  },
});

const server = (api: KyInstance) => (route: string) => {
  return api.extend({
    prefixUrl: `${baseURL}${route}/`
  });
};

const baseServer = server(baseApi);
const authServer = server(authApi);

const AuthServer = baseServer('auth');
const UserServer = authServer('user');

export {
  AuthServer,
  UserServer,
}

