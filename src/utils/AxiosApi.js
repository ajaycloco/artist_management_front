import axios from  'axios'
import swal from "sweetalert2";
import { headers, URL } from "./Constant";
// import history from "./History";

export const axiosGet = (url, successCallback, failureCallback) => {
  axios
    .get(url, { headers })
    .then(
      successCallback ||
        function (response) {
          swal("Success", response.message, "success");
        }
    )
    .catch(
      failureCallback ||
        function (error) {
          if (error.response?.status === 401) {
            localStorage.clear();
            // history.push("/");
          }
          swal("Erro", error.message, "error");
        }
    );
};

export const axiosPost = (url, params, successCallback, failureCallback) => {
  let doPost = "";
  if (url !== URL.loginUrl && url !== URL.signup) {
    doPost = axios.post(url, params, { headers });
  } else {
    doPost = axios.post(url, params);
  }
  doPost
    .then(
      successCallback ||
        function (response) {
          swal("Success", response.data.message, "success");
        }
    )
    .catch(
      failureCallback ||
        function (error) {
          if (error.response?.status === 401) {
            localStorage.clear();
            // history.push("/");
          }
          let errorResponse = error.response ? error.response.data : error;
          let errMessage = "";
          if (errorResponse.errors && errorResponse.errors.length > 0) {
            errMessage = errorResponse.errors[0].defaultMessage;
          }
          swal(
            errorResponse.error || "Network Error",
            errMessage !== "" ? errMessage : errorResponse.message,
            "error"
          );
        }
    );
};

export const axiosDelete = (url, successCallback, failureCallback) => {
  axios
    .delete(url, { headers })
    .then(
      successCallback ||
        function (response) {
          swal("Success", response.message, "success");
        }
    )
    .catch(
      failureCallback ||
        function (error) {
          let errorResponse = error.response ? error.response.data : error;
          swal(
            errorResponse.error || "Network Error",
            errorResponse.message,
            "error"
          );
        }
    );
};

export const axiosPut = (url, params, successCallback, failureCallback) => {
  axios
    .put(url, params, { headers })
    .then(
      successCallback ||
        function (response) {
          swal("Success", response.message, "success");
        }
    )
    .catch(
      failureCallback ||
        function (error) {
          let errorResponse = error.response ? error.response.data : error;
          swal(
            errorResponse.error || "Network Error",
            errorResponse.message,
            "error"
          );
        }
    );
};