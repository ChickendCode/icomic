import * as API from "../../services/authen.services"

export const authAsync = () => {
  return (dispatch) => {
    API.auth().then((res) => {
      if (res.data && res.data.status) {
        let payload = {
          login: res.data.login,
          user: res.data.user,
        }
        dispatch(auth(payload))
      } else {
        console.log("Lỗi xác thực!")
      }
    })
  }
}

export const auth = (payload) => {
  return {
    type: "AUTHENTICATION",
    payload,
  }
}



