import { Box, Container, Grid, TextField, Typography, Button, Select, FormControl, InputLabel, MenuItem, Alert } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';


function Filmes() {
  const [titulo, setTitulo] = useState("");
  const [duracao, setDuracao] = useState("");
  const [ano, setAno] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");
  const [enviar,setEnviar] = useState(false);
  const [erro, setErro] = useState(false);


  function Enviar(evento){
    evento.preventDefault();
    fetch("http://10.139.75.32:8080/filmes", {
      method: "POST",
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
        
          titulo: titulo,
          duracao: duracao,
          ano:ano,
          descricao: descricao,
          categoria: categoria,
          imagem: imagem,

        }
      )

    })
      .then((resposta) => resposta.json())
      .then((json) => {
        if (json.cpf) {
          setEnviar(true);
          setErro(false);
        } else {
          setEnviar(true);
          setErro(false);
        }
      })
      .catch((erro) => { setErro(true) });

  }

  useEffect(() => {

    setTitulo("");
    setDescricao("");
    setCategoria("");
    setAno("");
    setDuracao("");
    setImagem("");
    //setCadastro( false );

  }, [enviar]);
  
  return (
    <Container>
      <Box sx={{
        mt: 10, backgroundColor: "#C4C4C4",
        padding: "50px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Typography component="h1" variant='h4'> Filmes</Typography>
        {erro && (<Alert severity="warning" sx={{ mt: 2, mb: 2 }}>Desculpe,tente novamente</Alert>)}
        {enviar &&(<Alert severity="success" sx={{ mt: 2, mb: 2 }}>Enviado</Alert>)}
        <Box component="form" onSubmit={Enviar}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField type='text'
                label="Titulo"
                variant='filled'
                margin="normal"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                fullWidth />

              <TextField type='number'
                label="Duração"
                variant='filled'
                margin="normal"
                value={duracao}
                placeholder='00:00'
                onChange={(e) => setDuracao(e.target.value)}
                fullWidth />

              <TextField type='date'
                label=""
                variant='filled'
                margin="normal"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                fullWidth />



            </Grid>
            <Grid item xs={6}>

              <TextField id="filled-multiline-static"
                label="Descrição"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="filled"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                fullWidth sx={{ mt: 1, mb: 1 }} />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gênero</InputLabel>
                <Select labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  label="Age"

                >
                  <MenuItem value={10}>Terror</MenuItem>
                  <MenuItem value={20}>Comédia</MenuItem>
                  <MenuItem value={30}>Aventura</MenuItem>
                  <MenuItem value={40}>Ação</MenuItem>
                  <MenuItem value={40}>Drama</MenuItem>
                  <MenuItem value={40}>Fantasia</MenuItem>
                  <MenuItem value={40}>Ficção</MenuItem>
                  <MenuItem value={40}>Romance</MenuItem>
                  <MenuItem value={40}>Guerra</MenuItem>
                  <MenuItem value={40}>Misterio</MenuItem>
                  <MenuItem value={40}>Faroeste</MenuItem>
                  <MenuItem value={40}>Dança</MenuItem>
                  <MenuItem value={40}>Documentario</MenuItem>


                </Select>
              </FormControl>

              <TextField type='url'
                label="Imagem"
                variant='filled'
                margin="normal"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
                fullWidth />



            </Grid>
          </Grid>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 2 }} >Enviar</Button>
        </Box>
      </Box>
    </Container>

  )
}

export default Filmes;