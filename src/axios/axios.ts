import axios from "axios";

export async function Axios(
  method: string,
  url: string,
  token?: string,
  cEmail?: string,
  otp?: string,
  confirmationToken?: string,
  data?: any
) {
  const baseUrl = import.meta.env.VITE_APP_KUBIX_BASE_URL;

  const headers: { [key: string]: string } = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (cEmail) headers["cEmail"] = cEmail;
  if (otp) headers["opt"] = otp;
  if (confirmationToken) headers["token"] = confirmationToken;

  try {
    const res = await axios({
      url: `https://${baseUrl}${url}`,
      method: method,
      headers: headers,
      data: data,
    });
    return res.data;
  } catch (err) {
    err && console.error("Error fetching data:", err);
    throw err;
  }
}
