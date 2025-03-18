import { styled } from '@mui/material/styles';
import { Box, Card, Grid, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import userStore, { User } from "src/features/users/user.services";
// import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";
import { Icon } from '@iconify/react';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar';
import { Copy, LinkStyled } from '../users/list';


interface CellType {
  row: User
}

let page_title = "Verifications";



type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof User }
// ** Styled component for the link in the dataTable


const IconSpan = styled('span')(({ theme }) => ({
  color: theme?.palette?.primary.main,
  position: 'relative',
  top: '3px',
  left: '2px',
  cursor: 'pointer'
}))





const defaultColumns: PlanListColumn[] = [
  {
    flex: 0.02,
    field: 'id',
    minWidth: 70,
    headerName: 'Id',
    renderCell: ({ row }: CellType) => (

      <>
        {row.is_sys_user && <LinkStyled />}
        <Icon icon='mdi:content-copy' fontSize={20} cursor={'pointer'} onClick={() => {
          Copy(row.id + '')
        }} />
      </>

    )
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'email',
    headerName: 'User',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' >
      {row?.email}
      <IconSpan >{row.email_verified && <Tooltip title="Verified" placement="bottom"><Icon icon='mdi:check-decagram' /></Tooltip>}</IconSpan>
      <br />
      {row.phone}

      <IconSpan >{row.phone_verified && <Tooltip title="Verified" placement="bottom"><Icon icon='mdi:check-decagram' /></Tooltip>}</ IconSpan>
    </Typography>
  },

  {
    flex: 1,
    minWidth: 90,
    field: 'username',
    headerName: 'userName',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.username}</Typography>
  },

  {
    flex: 1,
    minWidth: 90,
    field: 'bank',
    headerName: 'Bank Verified ?',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' sx={{ textAlign: 'center', }}>
      <IconSpan>
        {row.bank ?
          'Document is Not Verified'
          :
          'Document is Verified'
        }
      </IconSpan>
    </Typography >
  },
  {
    flex: 1,
    minWidth: 90,
    field: 'pan',
    headerName: 'Pan Verified ?',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' sx={{ textAlign: 'center', }}>
      <IconSpan>
        {row.pan ?
          'Document is Not Verified'
          :
          'Document is Verified'
        }
      </IconSpan>
    </Typography >
  },


]



const Index = ({ read, write, update, del }: GlobalProps) => {




  const router = useRouter();
  const store = userStore()
  const [cipboard, setClipBoard] = useState<Array<string>>([])
  useEffect(() => {
    if (!router.isReady) return
    const init = async () => {
      store.get.paginate({ per_page: 0, page: 1 })
    }
    init()
  }, [])

  const [searchValue, setSearchValue] = useState<string>('')


  // function handleExportWithSearch(value: string) {
  //   console.log(value)
  //   return (
  //     <ServerSideToolbar value={search} clearSearch={undefined} onChange={() => handleFilter(search)} />
  //   )
  // }
  const handleSearch = (value: string) => {
    setSearchValue(value)
    store.get.paginate({ search: value })
  }



  const columns: GridColDef[] = [
    ...defaultColumns,

  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <Box
              sx={{
                p: 5,
                pb: 3,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >

              <Grid item xs={12}>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon icon='mdi:account-group-outline' fontSize={22} />
                  <Typography variant="h5" component="h4">
                    {page_title}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <DataGrid
              style={{ overflow: 'auto', height: '750px' }}
              rowHeight={70}
              // autoHeight
              pagination
              rows={store.user.list}
              columns={columns}
              rowCount={store.user?.total}
              paginationMode='server'
              pageSizeOptions={[15, 25, 50, 100]}
              paginationModel={{
                page: store.user.page - 1,
                pageSize: store.user?.per_page
              }}
              onPaginationModelChange={({ page, pageSize }) => {
                if (page == store.user.page - 1 && pageSize == store.user.per_page) return
                store.get.paginate({ page: page + 1, per_page: pageSize })

                router.push(
                  {
                    pathname: router.pathname,
                    query: { page: page + 1, size: pageSize }
                  },
                  undefined,
                  { shallow: true }
                )
              }}

              slots={{ toolbar: ServerSideToolbar }}
              slotProps={{
                baseButton: {
                  variant: 'outlined'
                },
                toolbar: {
                  value: searchValue,
                  clearSearch: () => handleSearch(''),
                  onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
                }
              }}

              disableRowSelectionOnClick
            // editMode='row'

            />
          </Card>
        </Grid>
      </Grid >
    </DatePickerWrapper>
  )
}

export default Index
