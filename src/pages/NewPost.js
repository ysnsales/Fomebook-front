import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext";
import api from "../services/api";


export default function NewPost(){
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [formData, setFormData] = useState({picture:'', description:''})

    const imageUrl = "https://img.freepik.com/vetores-premium/padrao-sem-emenda-de-fast-food-ornamento-colorido-de-comida-deliciosa-ilustracao-do-vetor-dos-desenhos-animados-design-moderno-para-decoracao-papel-de-parede-plano-de-fundo-texteis_534604-531.jpg?w=2000";
      
      
        function handleChange(e) {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };
      
        function handleSubmit(e){
          e.preventDefault();          
      
          const body = {...formData};
          const promise = api.createNewPost(user.token, body);
          console.log(body)
      
          promise.then((response) => {
            console.log(response.data);
            navigate("/home");
          });
      
          promise.catch((err) => {
            console.log(err.response.data.message);
            if (err.response.status === 422) {
              alert('Verifique se os dados foram preenchidos corretamente!')
            }else {
              alert('Ocorreu um erro inesperado! Tente novamente')
            }
          });
        }


    return (
            <PostContainer imageUrl={imageUrl}>
            <div>
              <h1>Novo Post</h1>
              <Form onSubmit={handleSubmit}>
                <Input 
                placeholder="Foto" 
                type="text"
                name="picture"
                onChange={handleChange}
                value={formData.picture}
                required/>
        
                <Input 
                placeholder="Descrição" 
                type="text"
                name="description"
                onChange={handleChange}
                value={formData.description}
                required />
                <Button type="submit">Novo Post</Button>
              </Form>
              </div>
            </PostContainer>
          )
    }
        
const PostContainer = styled.main`
 background-image: url(${props => props.imageUrl});
  background-size: 800px;
  background-repeat: repeat;
  background-position: center;
  height: 130vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    div{    
        width: 60%;
        border-radius: 3px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;}
    h1{
    font-family: 'Satisfy', cursive;
    font-size: 90px;
    margin-top: 150px;
    margin-bottom: 20px;
    color: white;
  }        
        `
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 100%;
    border-radius: 5px;
    margin-bottom:20px;`

const Input = styled.input`
    font-size: 20px;
    width: 80%;
    border-radius: 30px;
    outline: none;
    border: 1px solid #ccc;
    padding: 15px;
    margin: 1px;
        :focus {
            border: 2px solid #ffb6b6;
            margin: 0px;
    }` 
const Button = styled.button`
    outline: none;
    border: none;
    border-radius: 30px;
    background-color: #b61c1c;
    font-size: 20px;
    font-weight: 600;
    color: #FFFFFF;
    cursor: pointer;
    width: 80%;
    padding: 15px;
    `
