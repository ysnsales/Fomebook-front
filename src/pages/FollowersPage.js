import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import {  useNavigate} from "react-router-dom";
import api from "../services/api";
import { UserContext } from "../contexts/UserContext";

export default function FollowersPage(){

    const { user } = useContext(UserContext);
    const [followers, setFollowers] = useState([])

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


    return (
        <PageContainer> 
            <p>Meus seguidores</p>
            {followers.map(follower => 
                <UserInfo key={follower.id}>
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
display: flex;
flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Wix Madefor Display', sans-serif;
  p{
        font-size: 50px;
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