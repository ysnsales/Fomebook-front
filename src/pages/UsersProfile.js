import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { UserContext } from "../contexts/UserContext";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoFastFoodSharp } from "react-icons/io5";

export default function UsersProfile() {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [userId, setUserId] = useState(localStorage.id)
    const [likes, setLikes] = useState({});
    const [liked, setLiked] = useState(false);

    const { id } = useParams(); // Obter o ID da URL

    const imageUrl = "https://img.freepik.com/vetores-premium/padrao-sem-emenda-de-fast-food-ornamento-colorido-de-comida-deliciosa-ilustracao-do-vetor-dos-desenhos-animados-design-moderno-para-decoracao-papel-de-parede-plano-de-fundo-texteis_534604-530.jpg?w=2000"

    const navigate = useNavigate();
  
    useEffect(() => {
      loadPosts();
    }, [id]);
  
    function loadPosts() {
      const promise = api.getUserById(user.token, id);
      promise
        .then((response) => {
          if (user.email === response.data[1].email){
            navigate("/home")
          }         
          setUserInfo(response.data[1])
          setPosts(response.data[0])
        })
        .catch((error) => {
          console.error(error);
        });
    };


    function handleFollow() {
        const promise = api.followUser(user.token, userInfo.email);
        promise.then((response) => {
          console.log("Usuário seguido com sucesso");
          
        })
      };

      function handleLike(postId, postLikes) {

        const promise = !liked ? 
        api.addLike(user.token, postId)
        :
        api.removeLike(user.token, postId)
    
        console.log(promise)
        promise
          .then(() => {
            (!liked ? 
                setLiked(true) :
                setLiked(false) )
            loadPosts();
          })
          .catch((error) => {
            console.error(error);
          });
      }

    return(
        <HomePageContainer imageUrl={imageUrl}>
            <UserInfo>
                <img src={userInfo.profile_picture}/>
                <div>
                    <h1>{userInfo.name}</h1>
                    <h2>{userInfo.biography}</h2>
                    <div>
                        <button onClick={handleFollow}>Seguir</button>
                    </div>
                </div>
            </UserInfo>

            <Posts>
            {posts.map(p => 
            <Post key={p.id}>
            <Top>
              <div >
                <img src={userInfo.profile_picture}/>
                {userInfo.name}
              </div>
            </Top>

            <Mid>
                <img src={p.picture} />
            </Mid>

            <Botton>
              <div>
              {liked ? (
              <IoFastFoodSharp
                size="35px"
                onClick={() => handleLike(p.id, p.likes)}
                color="#b61c1c"
              />
            ) : (
              <IoFastFoodOutline
                size="35px"
                onClick={() => handleLike(p.id, p.likes)}
                color="black"
              />
            )}
                <div>
                <p>{p.likes} pessoas curtiram sua foto! </p>
                <p>{p.createdAt}</p>
                </div>

              </div>
              <div> 
               <p>{p.description}</p>
              </div>

            </Botton>

            </Post>
            )}


            </Posts>
        
        </HomePageContainer>
    )
};

const HomePageContainer = styled.section`
 background-image: url(${props => props.imageUrl});
background-size: 800px;
background-repeat: repeat;
background-position: center;
height: 130vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
font-family: 'Wix Madefor Display', sans-serif;
  `

const UserInfo = styled.div`
padding: 15px;
margin-top: 50px;
border-radius: 3px;
border: 1px solid #DBDBDB;
display: flex;
width: 60%;
display: flex;
align-items: center;
justify-content: flex-start;
background-color: white;
    h1{
        font-size: 30px;
        margin-bottom: 5px;
        margin-top: 0px;
    }
    h2{
        font-size: 20px;
        margin-top: 0px;
        color: gray;

    }
        img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 15px;
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
        font-family: 'Wix Madefor Display', sans-serif;;
        font-size: 15px;
        font-weight: 400;
        color: #FFFFFF;
        cursor: pointer;
        width: 190px;
        height: 35px;
        padding: 5px;
        margin-right: 15px;
    }
`
const Posts = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
padding: 15px;
border-radius: 3px;
width: 60%;
margin-bottom: 200px;`

const Post = styled.div`
    border-radius: 3px;
    border: 1px solid #DBDBDB;
    display: flex;
    flex-direction: column;
    margin-top: 18px;
    width: 100%;
    padding: 15px;
    background-color: white;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 13px 16px;
    font-size: 20px;
    font-weight: 500;
    div {
        display: flex;
        align-items: center;
        margin-bottom: 10px;}
    img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        border-radius: 50%;
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