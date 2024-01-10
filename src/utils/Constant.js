export const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")} `,
    // Authorization: "",
    "Content-Type": "application/json",
    Accept: "application/json",
    // "Client-Ip": localStorage.getItem("my_ip"),
  };

  const serverLocation = "http://localhost:8002"

  export const URL={
    loginUrl: `${serverLocation}/login`,
    signup:`${serverLocation}/users/create`,

    // users
    getAllUsers :`${serverLocation}/users`,


    // artists
    getAllArtist : `${serverLocation}/artists`,
    createArtist : `${serverLocation}/artists/create`,
    updateArtist : `${serverLocation}/artists/update`,
    deleteArtist: `${serverLocation}/artists`,



    // musics
    getAllMusic : `${serverLocation}/musics`,
    createMusic: `${serverLocation}/music/create`
  }