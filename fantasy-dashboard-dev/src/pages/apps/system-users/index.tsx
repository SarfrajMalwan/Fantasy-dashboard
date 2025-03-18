import { Box, Card, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
// import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";
import { Icon } from '@iconify/react';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar';
import { Copy } from '../users/list';
import useSystemUserStore, { SystemUser } from "src/features/system-user-detail/system.user";

interface CellType {
  row: SystemUser
}

let page_title = "Sub Admin Create";



type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof SystemUser }
// ** Styled component for the link in the dataTable



const defaultColumns: PlanListColumn[] = [
  {
    flex: 0.05,
    field: 'id',
    minWidth: 70,
    headerName: 'Id',
    renderCell: ({ row }: CellType) => (
      <Icon icon='mdi:content-copy' fontSize={20} cursor={'pointer'} onClick={() => {
        Copy(row.id + '')
      }} />
    )
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'username',
    headerName: 'Username',
    editable: false,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.username}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'email',
    headerName: 'Email',
    editable: false,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.email}</Typography>
  },

]



const Index = () => {


  // ** State
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const router = useRouter();
  const store = useSystemUserStore()
  const [cipboard, setClipBoard] = useState<Array<string>>([])
  useEffect(() => {
    if (!router.isReady) return
    const init = async () => {
      store.get.paginate({ per_page: 0, page: 1 })
    }
    init()
  }, [])

  const [searchValue, setSearchValue] = useState<string>('')




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

              <Grid container item xs={12}>
                <Grid item xs={9.5} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon icon='mdi:trophy' fontSize={22} />
                  <Typography variant="h5" component="h4">
                    {page_title}
                  </Typography>
                </Grid>
                {/* <Grid item xs={2.5} alignContent={'flex-end'}>
                  <Button variant='outlined' onClick={() => handleEditClickOpen(true)}>Add Sub Admin</Button>
                </Grid> */}
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

