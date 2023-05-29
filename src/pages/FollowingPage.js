import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import {  useNavigate} from "react-router-dom";
import api from "../services/api";
import { UserContext } from "../contexts/UserContext";

export default function FollowersPage(){

    const { user } = useContext(UserContext);
    const [following, setFollowing] = useState([])

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


    return (
        <PageContainer> 
            <h1>Meus seguidores</h1>
            {following.map(following => 
                <UserInfo key={following.id}>
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