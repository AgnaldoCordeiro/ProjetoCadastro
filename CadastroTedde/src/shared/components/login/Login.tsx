import { Avatar, Box, Button, CircularProgress, Grid, Link, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useAuthContext } from "../../contexts";
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object().shape({
  user: yup.string().required(),
  password: yup.string().required().min(5)
})

const loginClienteSchema = yup.object().shape({
  cgc_pessoa: yup.string().min(11).max(14).required(),
})

interface ILoginProps {
  children: React.ReactNode;
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
   const { isAuthenticated, login, isAuthenticatedCliente, loginCliente } = useAuthContext() 
  const [isLoading, setIsLoading] = useState(false)
  const [optionAcess, setOptionAcess] = useState(0)


  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [cgc_pessoa, setCgc_pessoa] = useState('')
  const [userError, setUserError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [cgc_pessoaError, setCgc_pessoaError] = useState('') 

  const handleSubmit = () => {
    setIsLoading(true)
    loginSchema.validate({ user, password }, { abortEarly: false })
      .then(dadosValidados => {
        setIsLoading(true)
        login(dadosValidados.user, dadosValidados.password)
          .then(() => {
            setIsLoading(false)
          })

      }).catch((errors: yup.ValidationError) => {
        setIsLoading(false)
        errors.inner.forEach(error => {
          if (error.path === 'user') {
            setUserError(error.message)

          } else if (error.path === 'password') {
            setPasswordError(error.message)
          }
        })

      })

  }

  const handleSubmitCliente = () => {
    setIsLoading(true)
    loginClienteSchema.validate({ cgc_pessoa }, { abortEarly: false })
      .then(dadosValidados => {
        setIsLoading(true)
        loginCliente(dadosValidados.cgc_pessoa)
          .then(() => {
            setIsLoading(false)
          })

      }).catch((errors: yup.ValidationError) => {
        setIsLoading(false)
        errors.inner.forEach(error => {
          if (error.path === 'cgc_pessoa') {
            setCgc_pessoaError(error.message)

          } 
        })

      })

  }

  function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Feito com ❤️ pelo '}
        <Link color="inherit" href="https://www.linkedin.com/in/agnaldocordeiro/">
          AgnaldoCordeiro
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  if (isAuthenticated || isAuthenticatedCliente) return (
    <>{children}</>
  )


  return (
    <Grid container component="main" sx={{ height: '100vh', background: 'linear-gradient(to right bottom, #430089, #82ffa1)'}}>
      <Grid
        item
        xs={false}
        sm={4}
        md={5}   
        sx={{
          backgroundImage: `url(./Design.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          
        }}    
      />
      <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >       
          <Avatar src={"./Logo.png"} variant="square" sx={{ width: 'auto', height: '5rem' }} />

          <Typography component="h1" variant="h5">
            Acesso a nossa plataforma
          </Typography>
          {
          optionAcess === 0 ? 
          <Box sx={{ mt: 1, maxWidth: '300px' }}>                  
          <Button
            fullWidth
            variant="contained"
            onClick={() => setOptionAcess(1)}
            endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
            sx={{ mt: 3, mb: 2 }}
          >
            Cliente
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setOptionAcess(2)}
            endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
            sx={{ mt: 3, mb: 2 }}
          >
            Colaborador
          </Button>

          <Copyright sx={{ mt: 5 }} />
        </Box>
         : optionAcess === 1 ? <Box sx={{ mt: 1, maxWidth: '300px' }}>
           <TextField
             margin="normal"
             fullWidth
             autoFocus
             label="Cpf/Cnpj"
             type="cgc_pessoa"
             value={cgc_pessoa}
             disabled={isLoading}
             error={!!cgc_pessoaError}
             helperText={cgc_pessoaError}
             onChange={e => setCgc_pessoa(e.target.value)}
             onKeyDown={e => setCgc_pessoaError('')}
           />           
         
           <Button
             fullWidth
             variant="contained"
             onClick={handleSubmitCliente}
             endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
             sx={{ mt: 3, mb: 2 }}
           >
             Acessar
           </Button>

           <Copyright sx={{ mt: 5 }} />
         </Box>
          : 
          <Box sx={{ mt: 1, maxWidth: '300px' }}>
            <TextField
              margin="normal"
              fullWidth
              autoFocus
              label="Usuário"
              type="user"
              value={user}
              disabled={isLoading}
              error={!!userError}
              helperText={userError}
              onChange={e => setUser(e.target.value)}
              onKeyDown={e => setUserError('')}
            />

            <TextField
              margin="normal"
              fullWidth
              autoFocus
              label="Senha"
              type="password"
              value={password}
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => setPasswordError('')}
            />

            {/*  <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar minhas credenciais"
            /> */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
              sx={{ mt: 3, mb: 2 }}
            >
              Acessar
            </Button>

            <Copyright sx={{ mt: 5 }} />
          </Box>          
          }
        </Box>

      </Grid>
    </Grid>
  )
}