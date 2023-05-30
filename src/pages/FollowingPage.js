import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import {  useNavigate} from "react-router-dom";
import api from "../services/api";
import { UserContext } from "../contexts/UserContext";

export default function FollowersPage(){

    const { user } = useContext(UserContext);
    const [following, setFollowing] = useState([])
    const [posts, setPosts] = useState([]);
    const [userInfo, setUserInfo] = useState([])

    const imageUrl = "https://img.freepik.com/vetores-premium/padrao-sem-emenda-de-fast-food-ornamento-colorido-de-comida-deliciosa-ilustracao-do-vetor-dos-desenhos-animados-design-moderno-para-decoracao-papel-de-parede-plano-de-fundo-texteis_534604-530.jpg?w=2000"

    const navigate = useNavigate();

    useEffect(() => {
        loadFollowers();
      }, []);
    
      function loadFollowers() {
        const promise = api.getFollowing(user.token);
        promise
          .then((response) => {
            console.log(response.data);
            setFollowing(response.data);
            
          })
          .catch((error) => {
            console.error(error);
          });
      };

      function handleClick(id){
        navigate(`/posts/${id}`);
      }


    return (
        <PageContainer imageUrl={imageUrl}> 
            <p>Quem eu sigo</p>
            {following.map(following => 
                <UserInfo onClick={() => handleClick(following.id)} key={following.id}>
                    <img src={following.profile_picture}/>

                     <div>
                         <h1>{following.name}</h1>
                        <h2>{following.biography}</h2>
                    </div>

                </UserInfo>
            )}
    </PageContainer>
    )
}


const PageContainer = styled.section`
 background-image: url(${props => props.imageUrl});
  background-size: 800px;
  background-repeat: repeat;
  background-position: center;
display: flex;
flex-direction: column;
height: 130vw;
  align-items: center;
  font-family: 'Wix Madefor Display', sans-serif;
    p{
    font-family: 'Satisfy', cursive;
    font-size: 90px;
    margin-top: 150px;
    margin-bottom: 20px;
    }

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
`