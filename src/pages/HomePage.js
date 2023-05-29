import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import {  useNavigate} from "react-router-dom";
import { format } from "date-fns";
import api from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";

export default function HomePage(){

  const {user} = useContext(UserContext)
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [date, setDate] = useState("") 

  const [email, setEmail] = useState(localStorage.email);
  const [name, setName] = useState(localStorage.name);
  const [biography, setBiography] = useState(localStorage.biography);
  const [profilePicture, setProfilePicture] = useState(localStorage.profile_picture);


  const navigate = useNavigate();

  useEffect(loadPosts, []);

  function loadPosts(){
    const promise = api.getPosts(user.token);
    promise.then((response) => {
      setEmail(user.email);
      setName(user.name);
      setBiography(user.biography);
      setProfilePicture(user.profile_picture);
      setPosts(response.data)
      console.log(response.data);
    })
  };

  function handleLike(postId, postLikes) {
    const promise = api.addLike(user.token, postId);
    setLikes(postLikes)
    promise
      .then(() => {
        // Increment the number of likes locally
        setLikes(postLikes + 1);
        loadPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  }


    return(
        <HomePageContainer>
            <UserInfo>
                <img src={profilePicture}/>

                <div>
                    <h1>{name}</h1>
                    <h2>{biography}</h2>
                    <div>
                        <button onClick={() => navigate("/followers")}>Ver seguidores</button>
                        <button onClick={() => navigate("/following")}>Ver quem eu sigo</button>
                    </div>
                </div>

            </UserInfo>

        {posts.map(p => 
            <>
            <Post key={p.id}>
            <Top>
              <div >
                <img src={profilePicture}/>
                {name}
              </div>
            </Top>

            <Mid>
                <img src={p.picture} />
            </Mid>

            <Botton>
              <div>
                <IoFastFoodOutline onClick={() => handleLike(p.id, p.likes)}/>
                <p>{p.likes} pessoas curtiram sua foto </p>
                <p>{p.createdAt}</p>
              </div>
              <div> 
               {p.description}
              </div>

            </Botton>

            </Post>
            </>)}
            
            <AddPost>
            <IoAddCircle onClick={() => navigate("/new-post")}/>
            </AddPost>
        </HomePageContainer>
    )
};

const HomePageContainer = styled.section`
display: flex;
flex-direction: column;
  justify-content: center;
  align-items: center;
  `

const UserInfo = styled.div`
padding: 15px;
background-color: pink;
width: 60%;
display: flex;
align-items: center;
justify-content: space-around;
    h1, h2{
        font-size: 16px;
    }
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    div {
        display: flex;
        flex-direction: column;
        width: 80%;

        div {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
        }
    }
    button {
        outline: none;
        border: none;
        border-radius: 30px;
        background-color: #b61c1c;
        font-size: 15px;
        font-weight: 400;
        color: #FFFFFF;
        cursor: pointer;
        width: 200px;
        padding: 5px;
        margin-right: 15px;
    }
`

const Post = styled.div`
    border-radius: 3px;
    border: 1px solid #DBDBDB;
    display: flex;
    flex-direction: column;
    margin-top: 18px;
    width: 60%;
    padding: 15px;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 13px 16px;
    font-size: 14px;
    font-weight: 500;
    div {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
    }
`

const Mid = styled.div`
img {
    width: 100%;
}`

const Botton = styled.div`
    div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 13px 16px;
        font-size: 20px;
    }
    p {
        margin-left: 8px;
    }
`
const AddPost = styled.div`
position: fixed;
bottom: 90px;
right: 100px;
font-size: 100px;
`