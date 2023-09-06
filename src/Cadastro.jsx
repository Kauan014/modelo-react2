import { Alert, Box, Button, Container, FormControlLabel, TextField, Typography } from '@mui/material';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate, json } from 'react-router-dom';

function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [cadastro, setCadastro] = useState(false)
  const [erro, setErro] = useState(false)

  function Cadastrar(evento) {

    evento.preventDefault();
    fetch("http://10.139.75.32:8080/users", {
      method: "POST",
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          nome: nome,
          email: email,
          senha: senha,
          cpf: cpf,
          telefone: telefone

        }
      )

    })

      .then((resposta) => resposta.json())
      .then((json) => {
        if (json.cpf) {
          setCadastro(true);
        } else {
          setErro(true);
        }
      })
      .catch((erro) => { setErro(true) });

  }

  useEffect(() => {

    setNome("");
    setEmail("");
    setCpf("");
    setSenha("");
    setTelefone("");
    //setCadastro( false );

  }, [cadastro]);


  return (
    <Container component="section" maxWidth="xs">
      <Box sx={{
        mt: 10, backgroundColor: "#C4C4C4",
        padding: "50px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Typography component="h1" variant='h5'>Cadastrar</Typography>

        {erro && (<Alert severity="warning" sx={{ mt: 2, mb: 2 }}>Desculpe tente novamente</Alert>)}
        {cadastro && (<Alert severity="success" sx={{ mt: 2, mb: 2 }}>Obrigado por se cadastrar</Alert>)}

        <Box component="form" onSubmit={Cadastrar}>
          <TextField type='text' label="Nome"
            variant='filled'
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            fullWidth />

          <TextField type='number'
            label="CPF"
            variant='filled'
            margin="normal"

            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            fullWidth />

          <TextField type='email'
            label="Email"
            variant='filled'
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth />

          <TextField type='tel'
            label="Telefone"
            variant='filled'
            margin="normal"

            placeholder="(xx) xxxxx-xxxx"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            fullWidth />

          <TextField type='password'
            label="senha"
            variant='filled'
            margin="normal"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            fullWidth />

          <Button type="submit" variant="outlined" fullWidth sx={{ mt: 2, mb: 2 }}>Cadastrar</Button>

        </Box>
      </Box>
    </Container>

  )
}

export default Cadastro;