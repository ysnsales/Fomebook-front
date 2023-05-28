import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components"
import axios from "axios";
import api from "../services/api";

export default function SignUpPage() {

  const [formData, setFormData] = useState({name:'', email:'', profile_picture:'', biography:'', password:'', confirmPassword:''});
  const navigate = useNavigate();


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert("As senhas precisam ser as mesmas!")

    const {confirmPassword, ...sendData} = formData;
    console.log(sendData)

    const promise = api.signUp({ ...formData });
    promise.then((response) => {
      console.log(response.data);
      navigate("/");
    });
    promise.catch((error) => {
    if (error.response.status === 422) {
        alert("O cadastro falhou. Verifique se os dados foram preenchidos corretamente!")
    }else if (error.response.status === 409) {
        alert("Email já utilizado")
    } 
    });
  }

  return (
    <SingUpContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Cadastro</h1>
    
        <Input 
        placeholder="Nome" 
        type="text" 
        name="name"
        onChange={handleChange}
        value={formData.name}
        required/>

        <Input 
        placeholder="E-mail" 
        type="email"
        name="email" 
        onChange={handleChange}
        value={formData.email}
        pattern="^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,})+$"
        title="Precisa ser um email valido. Exemplo (nome@dominio.com)"
        required/>

        <Input 
        placeholder="Foto de perfil" 
        type="text" 
        name="profile_picture"
        onChange={handleChange}
        value={formData.profile_picture}
        required/>

        <Input 
        placeholder="Biografia" 
        type="text" 
        name="biography"
        onChange={handleChange}
        value={formData.biography}
        required/>

        <Input 
        placeholder="Senha" 
        type="password" 
        name="password"
        autocomplete="new-password" 
        onChange={handleChange}
        value={formData.password}
        required />

        <Input 
        placeholder="Confirme a senha" 
        type="password"
        name="confirmPassword"
        onChange={handleChange}
        value={formData.confirmPassword}
        required
        />

        <Button type="submit">Cadastrar</Button>
      </Form>

      <Link to="/"> 
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  h1{
    font-size: 30px;
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
        margin-bottom:20px`


const Input = styled.input`
        font-size: 20px;
        width: calc(100% - 30px);
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
        width: 100%;
        padding: 12px;
    `