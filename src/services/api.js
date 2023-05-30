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
};

function getFollowers(token) {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/followers`, createConfig(token));
    return promise;
};

function getFollowing(token) {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/following`, createConfig(token));
    return promise;
};


function createConfig(token){
    return{
        headers: {
            Authorization: `Bearer ${token}`
        }
}
};

function addLike(token, postId) {
    const promise = axios.put(`${process.env.REACT_APP_API_URL}/posts/${postId}/addLike`, null, createConfig(token));
    return promise;
};

function removeLike(token, postId) {
    const promise = axios.put(`${process.env.REACT_APP_API_URL}/posts/${postId}/removeLike`, null, createConfig(token));
    return promise;
}



const api = {
    signIn,
    signUp,
    getPosts,
    createNewPost,
    getUserById,
    followUser,
    getFollowers,
    getFollowing,
    addLike,
    removeLike
};

export default api;