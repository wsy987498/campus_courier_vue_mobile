import axios from 'axios';

const apiUrl = 'http://localhost:3000'//本地
// const apiUrl = 'http://39.108.117.83'//线上
export default {
  fetchGet(url, param) {
    let tokention = JSON.parse(sessionStorage.getItem('tokention'))
    return new Promise((resolve, reject) => {
      axios.get(apiUrl + url, {
        param,
        headers: {
          'Authorization': tokention.token,
        },
        // timeout: 5000
      })
        .then(response => {
          resolve(response)
        }, err => {
          if (JSON.parse(err.request.response).detail == "Invalid signature.") {
            alert("身份已过期")
            sessionStorage.removeItem("tokention");
            window.location.href = "/";

          }
          if (JSON.parse(err.request.response).detail == "Signature has expired.") {
            alert("签名已过期")
            sessionStorage.removeItem("tokention");
            window.location.href = "/";
          }
          reject(err)

        })
        .catch((error) => {
          console.log(error + "222")
          reject(error)
        })
    })
  },
  fetchDelete(url, param) {
    let tokention = JSON.parse(sessionStorage.getItem('tokention'))
    return new Promise((resolve, reject) => {
      axios.delete(apiUrl + url, {
        data: param,
        headers: {
          'Authorization': tokention.token,
          'content-type': 'application/json'
        },
        // timeout: 5000
      })
        .then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchPost(url, params) {
    // .replace("\"","").replace("\"","")
    let tokention = JSON.parse(sessionStorage.getItem('tokention'))
    return new Promise((resolve, reject) => {
      axios.post(apiUrl + url, params, {
        headers: {
          'Authorization': tokention.token,
        },
        // timeout: 5000
      })
        .then(response => {
          resolve(response);
        }, err => {
          if (JSON.parse(err.request.response).detail == "Invalid signature.") {
            alert("身份已过期")
            sessionStorage.removeItem("tokention");
            window.location.href = "/";

          }
          if (JSON.parse(err.request.response).detail == "Signature has expired.") {
            alert("签名已过期")
            sessionStorage.removeItem("tokention");
            window.location.href = "/";
          }

          reject(err);
        })
        .catch((error) => {
          reject(error);

        })
    })
  },
  Post(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(apiUrl + url, params,)
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  Get(url, param) {
    return new Promise((resolve, reject) => {
      axios.get(apiUrl + url, {
        param,
        // timeout: 5000
      })
        .then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  Delete(url, params) {
    return new Promise((resolve, reject) => {
      axios.delete(apiUrl + url, params)
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  Put(url, params) {
    return new Promise((resolve, reject) => {
      axios.put(apiUrl + url, params)
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchPut(url, params) {
    let tokention = JSON.parse(sessionStorage.getItem('tokention'))
    return new Promise((resolve, reject) => {
      axios.put(apiUrl + url, params, {
        headers: {
          'Authorization': tokention.token,
          'content-type': 'application/json'
        },
        // timeout: 5000
      })
        .then(response => {
          resolve(response);
        }, err => {
          if (JSON.parse(err.request.response).detail == "Invalid signature.") {
            alert("身份已过期")
            sessionStorage.removeItem("tokention");
            window.location.href = "/";

          }
          if (JSON.parse(err.request.response).detail == "Signature has expired.") {
            alert("签名已过期")
            sessionStorage.removeItem("tokention");
            window.location.href = "/";
          }
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}
