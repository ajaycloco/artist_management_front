export const headers = {
    // Authorization: `Bearer ${localStorage.getItem("token")} `,
    Authorization: "",
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Client-Ip": localStorage.getItem("my_ip"),
  };

  const serverLocation = "http://localhost:8002"

  export const URL={
    loginUrl: `${serverLocation}/login`,
    signup:`${serverLocation}/users/create`
  }