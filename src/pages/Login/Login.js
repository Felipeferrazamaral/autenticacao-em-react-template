import React from 'react'
import { useNavigate } from 'react-router-dom'
import useForms from '../../hooks/useForms'

import { ContainerForm, ContainerLogin, Input } from './styled'
import { irParaCadastro, irParaFeed } from '../../routes/coordinator'
import { BASE_URL } from '../../constants/BASE_URL'
import axios from 'axios'

export default function Login() {
  const navigate = useNavigate()

  const { form, onChange } = useForms({ email: "", password: "" })

  const enviaLogin = (e) => {
    e.preventDefault()
    console.log(form)

    if (form.senha === form.confirmaSenha) {

      const dadosUsuario = {

        username: form.nomeUsuario,
        email: form.email,
        password: form.senha




      }


      const body = {
        email: form.email,
        password: form.password
      }
  
  
  
      axios.post(`${BASE_URL}/users/login`, body)
      .then((resp)=> {
  
        localStorage.setItem('token', resp.data.token)
        irParaFeed(navigate)
  
  
      })
      .catch((error)=> {
  
  
      })
  
  






    } else {
      alert("Digite a mesma senha nos campos 'senha' e 'confirmacao de senha'")
    }

    

  }

  return (
    <ContainerLogin>
      <ContainerForm onSubmit={enviaLogin}>
        <label htmlFor='email'>Email:</label>
        <Input id='email'
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="nome@email.com"
          required
        />
        <label htmlFor='senha'>Senha:</label>
        <Input id='senha'
          name="password"
          minLength={8}
          value={form.password}
          onChange={onChange}
          placeholder="Digite sua senha"
          required
        />
        <button>Fazer Login</button>
      </ContainerForm>
      <button onClick={() => irParaCadastro(navigate)}>Ainda não tenho uma conta</button>
    </ContainerLogin>
  )
}
