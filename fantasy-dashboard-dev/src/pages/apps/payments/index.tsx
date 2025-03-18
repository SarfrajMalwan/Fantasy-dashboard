import { Box, Card, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
// import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";
import { Icon } from '@iconify/react';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar';
import { Copy } from '../users/list';

import useDipoPayStore, { DipositPayment } from "src/features/payment/deposit.service";

interface CellType {
  row: DipositPayment
}

let page_title = "Payments";



type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof DipositPayment }





const defaultColumns: PlanListColumn[] = [
  {
    flex: 0.02,
    minWidth: 70,
    field: 'id',
    headerName: 'User ID',
    renderCell: ({ row }: CellType) => (
      <Icon icon='mdi:content-copy' fontSize={20} cursor={'pointer'} onClick={() => Copy(row.id + '')} />
    ),
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'phone',
    headerName: 'Phone',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.phone}</Typography>,
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: 'description',
    headerName: 'Description',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.description}</Typography>,
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'type',
    headerName: 'Type',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.type}</Typography>,
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'matchInfo',
    headerName: 'Match Info',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.matchInfo}</Typography>,
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.status}</Typography>,
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'amount',
    headerName: 'Amount',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.amount}</Typography>,
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'wallet',
    headerName: 'Wallet',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.wallet}</Typography>,
  },
  {
    flex: 0.1,
    minWidth: 200,
    field: 'created_at',
    headerName: 'Created At',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.created_at}</Typography>,
  },
]



const Index = () => {


  // ** State

  const router = useRouter();
  const store = useDipoPayStore()

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
              rowHeight={80}
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

