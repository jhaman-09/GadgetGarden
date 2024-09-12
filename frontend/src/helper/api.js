const api = "http://localhost:4000/api/v1";

export const endPoint = {
  register: {
    url: api + "/user/register",
    method: "POST",
  },
  login: {
    url: api + "/user/login",
    method: "POST",
  },
  userDetails: {
    url: api + "/user/user-details",
    method: "GET",
  },
  logout: {
    url: api + "/user/logout",
    method: "GET",
  },
};
