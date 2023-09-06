import { Box, Container, TextField, Button, Checkbox, FormControlLabel, Grid, Typography, Alert,Link } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, json } from 'react-router-dom';


function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [lembrar, setLembrar] = useState(false);
    const [login, setLogin] = useState(false);
    const [erro, setErro] = useState(false);
    const navigate = useNavigate();
    /* Efeito colateral do login for verdadeiro ele vai limpar os campos e redirecionar para outra tela */
    useEffect(() => {

        if (login !== false) {
            localStorage.setItem("usuario", JSON.stringify({ email: email }))
            setEmail("");
            setSenha("");
            navigate("/");
        }

    }, [login])

    function Autenticar(evento) {

        evento.preventDefault();
        /* vai mandar os valores obitidos para a api para que ela seja autenticada*/
        fetch("http://10.139.75.32:8080/login", {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    senha: senha
                }
            )

        })
            /* a resposta e transformada em json e então a condicional if se setErro for true acontece uma coisa se for verdadeiro afeta o useEffect la em cima*/
            .then((resposta) => resposta.json())
            .then((json) => {
                if (json.user) {
                    setLogin(true);
                } else {
                    setErro(true);
                }
            })
            .catch((erro) => { setErro(true) });
    }

    /* erro for true aparece um alert */
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

                    <Typography component="h1" variant='h4'>Entrar</Typography>



                    {erro && (<Alert severity="warning">Revise seus dados e tente novamente!</Alert>)}
                    <Box component="form" onSubmit={Autenticar}>
                        <TextField type='email'
                            label="email"
                            variant='filled'
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth />
                           

                        <TextField type='password'
                            label="senha"
                            variant='filled'
                            margin="normal"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            fullWidth />

                        <FormControlLabel
                            control={<Checkbox value={lembrar} name="lembrar" onChange={(e) => setLembrar(!lembrar)} />}
                            label="lembrar-me"
                        />
                        <Button type="submit" variant="outlined" fullWidth sx={{ mt: 2, mb: 2 }} >Entrar</Button>
                        <Grid container>
                            <Grid item xs>
                                Esqueci a senha
                            </Grid>
                            <Grid item>
                                <Link href="http://localhost:3000/cadastro">Cadastrar</Link>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Container>
        
    )
}

export default Login;