const api = "http://localhost:4000/api/v1";

export const endPoint = {
  // USER RELATED ROUTES

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
  allUser: {
    url: api + "/user/all-users",
    method: "GET",
  },
  updateUser: {
    url: api + "/user/update-user",
    method: "PUT",
  },

  // PRODUCT RELATED ROUTES

  uploadProduct: {
    url: api + "/product/upload-product",
    method: "POST",
  },
  allProduct: {
    url: api + "/product/all-product",
    method: "GET",
  },
  editProduct: {
    url: api + "/product/update-product",
    method: "POST",
  },
};
