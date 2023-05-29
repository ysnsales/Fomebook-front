import axios from "axios";

function signIn(body) {
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, body);
    return promise;
};

function signUp(body) {
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body);
    return promise;
};

function getPosts(token){
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/posts/me`, createConfig(token));
    return promise;
};

function createNewPost(token, body){
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/posts`, body, createConfig(token));
    return promise;
};

function getUserById(token, id){
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`, createConfig(token));
    return promise;
};

function followUser(token, following) {
    const body = { following }
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/following`, body, createConfig(token));
    return promise;
  }


function createConfig(token){
    return{
        headers: {
            Authorization: `Bearer ${token}`
        }
}
};



const api = {
    signIn,
    signUp,
    getPosts,
    createNewPost,
    getUserById,
    followUser
};

export default api;