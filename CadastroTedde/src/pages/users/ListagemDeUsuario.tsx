import { Alert, Icon, IconButton, LinearProgress, Pagination, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConfirmSenha from "../../shared/components/confirm-dialog/ConfirmSenha";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts"
import { IListagemUsers, UserService } from "../../shared/services/api/users/UserService";
import { FerramentasDaListagem } from "../../shared/components/ferramentas-da-listagem/FerramentasDaListagem";



export const ListagemDeUsuarios: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce()
  const navigate = useNavigate()

  const [rows, setRows] = useState<IListagemUsers[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmID, setconfirmID] = useState('')

  const [open, setOpen] = useState(false);
  const [isMensagem, setIsMensagem] = useState('');




  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);


  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true)

    debounce(() => {
      UserService.getAll(pagina, busca)
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(result.data)
            setTotalCount(result.totalCount)
          }

        });

    });
  }, [busca, pagina]);


  const handleDelete = (id: string) => {
    UserService.deleteById(id)
      .then(result => {
        setIsMensagem('Usuário Deletado com sucesso');
        handleClick()

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(oldRows => {
            return [
              ...oldRows.filter(oldRow => oldRow.id !== id)
            ]
          });
        }
      })

  }


  return (
    <LayoutBaseDePagina
      titulo="Listagem de Usuários"
      barraDeFerramentas={<FerramentasDaListagem
        mostrarInputBusca
        textoDaBusca={busca}
        textoBotaoNovo='Novo'
        aoClicarEmNovo={() => navigate('/usuarios/detalhe/novo')}
        aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
      />}
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

      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Usuário</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => { setConfirmOpen(true), setconfirmID(row.id) }}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/usuarios/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}


          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>

    </LayoutBaseDePagina>
  )
}