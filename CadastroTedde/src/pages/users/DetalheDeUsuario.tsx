import { Alert, Box, Grid, LinearProgress, Paper, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"



import * as yup from 'yup';
import { IVFormErrors, VForm, VTextField, useVForm } from "../../shared/components/form";
import { UserService } from "../../shared/services/api/users/UserService";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe";
import ConfirmSenha from "../../shared/components/confirm-dialog/ConfirmSenha";


interface IFormData {
  email: string,
  password: string,
  user: string, 
  role: string,
  cpf: string,
  telefone: string
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({

  email: yup.string().email().required(),
  password: yup.string().required().min(5),
  user: yup.string().required(),
  telefone: yup.string().required(),
  role: yup.string().required(),
  cpf: yup.string().min(11).max(11).required(),
 
})




export const DetalheDeUsuarios: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isMensagem, setIsMensagem] = useState('');


  const { id = 'novo' } = useParams<'id'>();
  const navigate = useNavigate()
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm()

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmID, setconfirmID] = useState('')

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (id !== 'novo') {
      setIsLoading(true)

      UserService.getById(id)
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message);
            navigate('/usuarios');
          } else {
            setNome(result.user)
            formRef.current?.setData(result)
          }
        })
    } else {
      formRef.current?.setData({
        email: '',
        password: '',
        user: '',
        role: '',
        cpf: '',
        telefone: '',


      })
    }
  }, [id])


  const handleSave = (dados: IFormData) => {

    formValidationSchema.validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true)
        if (id === 'novo') {
          UserService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                setIsMensagem('Usuário Cadastrado com sucesso');
                handleClick()
                if (isSaveAndClose()) {
                  navigate('/usuarios');
                }
              } else {
                setIsMensagem('Usuário Cadastrado com sucesso');
                handleClick()
                navigate(`/usuarios/detalhe/${result}`);
              }


            });

        } else {
          UserService
            .updateById({ id, ...dadosValidados })
            .then((result) => {
              setIsLoading(false)
              setIsMensagem('Usuário Atualizado com sucesso');
              handleClick()
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/usuarios');
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {}

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        })
        formRef.current?.setErrors(validationErrors)
      })



  }

  const handleDelete = (id: string) => {
    UserService.deleteById(id)
      .then(result => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('registro apagado com sucesso')
          navigate('/usuarios');
        }
      })
  }

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Novo Usuário' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Novo"
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'novo'}
          mostrarBotaoApagar={id !== 'novo'}
          mostrarBotaoPdf={false}

          aoClicarEmSalvar={save}
          aoClicarEmSalvarEVoltar={saveAndClose}
          aoClicarEmApagar={() => { setConfirmOpen(true), setconfirmID(id) }}
          aoClicarEmVoltar={() => navigate('/usuarios')}
          aoClicarEmNovo={() => navigate('/usuarios/detalhe/novo')}
        />
      }
    >

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {isMensagem}
        </Alert>
      </Snackbar>

      <ConfirmSenha
        title="Delete Usuario?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => handleDelete(confirmID)}
      >
        Deseja excluir este usuário permanentemente?
      </ConfirmSenha>


      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}


            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                <VTextField
                  fullWidth
                  label="Usuário"
                  name='user'
                  disabled={isLoading}
                  onChange={e => setNome(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                <VTextField
                  fullWidth
                  label="Email"
                  name='email'
                  type="email"
                  disabled={isLoading}

                />
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                <VTextField
                  fullWidth
                  label="Role"
                  name='role'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                <VTextField
                  fullWidth
                  label="Senha"
                  name='password'
                  type='password'
                  disabled={isLoading}
                />
              </Grid>              
            </Grid>

          </Grid>
        </Box>
      </VForm>


    </LayoutBaseDePagina>
  )
}