// const BASE_URL = "http://localhost:8080/api/v1"

// export const registerUrl = BASE_URL.concat("/auth/register")
// export const loginUrl = BASE_URL.concat("/auth/login")
// export const customerUrl = BASE_URL.concat("/customer/")
// export const itemUrl = BASE_URL.concat("/item/")

// export const orderUrl = BASE_URL.concat("/order/")
// export const cartUrl = BASE_URL.concat("/cart/")
// export const profileUrl = BASE_URL.concat("customer/profile");
// export const addAddressUrl = BASE_URL.concat("customer/address/add");
// export const editAddressUrl = BASE_URL.concat("customer/address/edit");
// export const deleteAddressUrl = BASE_URL.concat("customer/address/delete");

const BASE_URL = "http://localhost:8080/api/v1";

export const authUrl = {
  register: BASE_URL.concat("/auth/register"),
  login: BASE_URL.concat("/auth/login"),
};

export const customerUrl = BASE_URL.concat("/customer");
export const itemUrl = BASE_URL.concat("/item");
export const cartUrl = BASE_URL.concat("/cart");
export const orderUrl = BASE_URL.concat("/order");