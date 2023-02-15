import axios from "axios";

import { TOKEN } from "./auth/authSlice";

export async function getWithToken(url, emptyReturnValue, params) {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const { data } = await axios.get(url, {
        headers: {
          authorization: token,
        },
        params,
      });
      return data;
    } else {
      return emptyReturnValue;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function postWithToken(url, emptyReturnValue, payload, params) {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const { data } = await axios.post(url, payload, {
        headers: {
          authorization: token,
        },
        params,
      });
      return data;
    } else {
      return emptyReturnValue;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteWithToken(url, emptyReturnValue) {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const { data } = await axios.delete(url, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } else {
      return emptyReturnValue;
    }
  } catch (error) {
    console.error(error);
  }
}
