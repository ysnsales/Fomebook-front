import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext";
import api from "../services/api";

export default function SignInPage() {
  const {user, setUser} = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const imageUrl = "https://img.freepik.com/vetores-gratis/fundo-de-fast-food-desenhado-a-mao_23-2149013389.jpg?w=2000"


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const promise = api.signIn({ ...formData });
    promise.then((response) => {
      console.log(response.data);
      const {email, token, name, biography, profile_picture} = response.data;
      setUser({email, token, name, biography});
      localStorage.setItem("user", JSON.stringify({email, token, name, biography, profile_picture}))
      navigate("/home");
    });

    promise.catch((error) => {
      if ( error.response.status === 404 || error.response.status === 401 || error.response.status === 422) {
        alert('Verifique se os dados foram preenchidos corretamente')
      };
    });
  }

  return (
    <SignInContainer imageUrl={imageUrl}>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Input 
        placeholder="E-mail" 
        type="email" 
        name="email"
        onChange={handleChange}
        value={formData.email}
        required/>

        <Input 
        placeholder="Senha" 
        type="password" 
        name="password"
        autocomplete="new-password" 
        onChange={handleChange}
        value={formData.password}
        required/>

        <Button type="submit">Entrar</Button>
      </Form>

      <CustomLink to="/sign-up">
        Primeira vez? Cadastre-se!
      </CustomLink>
    </SignInContainer>
  )
}

const SignInContainer = styled.section`
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1{
    font-family: 'Satisfy', cursive;
    font-size: 90px;
    margin-top: 150px;
    margin-bottom: 20px;
  }
  
`

const Form = styled.form`
display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        width: 60%;
        border-radius: 5px;
        margin-bottom:20px
        `;

const Input = styled.input`
        font-size: 25px;
        width: calc(100% - 30px);
        height: 40px;
        border-radius: 30px;
        outline: none;
        border: 1px solid #ccc;
        padding: 15px;
        margin: 1px;
        :focus {
            border: 2px solid #ffb6b6;
            margin: 0px;
    }` ;

const Button = styled.button`
        outline: none;
        border: none;
        border-radius: 30px;
        background-color: #b61c1c;
        font-size: 25px;
        font-weight: 600;
        color: #FFFFFF;
        cursor: pointer;
        width: 100%;
        height: 70px;
        padding: 12px;
    `
const CustomLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  font-family: 'Wix Madefor Display', sans-serif;
    font-size: 20px;

`;