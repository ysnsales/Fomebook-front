import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import {  useNavigate} from "react-router-dom";
import api from "../services/api";
import { UserContext } from "../contexts/UserContext";

export default function FollowersPage(){

    const { user } = useContext(UserContext);
    const [followers, setFollowers] = useState([])

    const imageUrl = "https://img.freepik.com/vetores-premium/padrao-sem-emenda-de-fast-food-ornamento-colorido-de-comida-deliciosa-ilustracao-do-vetor-dos-desenhos-animados-design-moderno-para-decoracao-papel-de-parede-plano-de-fundo-texteis_534604-530.jpg?w=2000"


    useEffect(() => {
        loadFollowers();
      }, []);
    
      function loadFollowers() {
        const promise = api.getFollowers(user.token);
        promise
          .then((response) => {
            console.log(response.data);
            setFollowers(response.data);
            
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
            <p>Meus seguidores</p>
            {followers.map(follower => 
                <UserInfo onClick={() => handleClick(following.id)} key={follower.id}>
                    <img src={follower.profile_picture}/>

                     <div>
                         <h1>{follower.name}</h1>
                        <h2>{follower.biography}</h2>
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
height: 130vw;;
 
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
margin-top: 15px;
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