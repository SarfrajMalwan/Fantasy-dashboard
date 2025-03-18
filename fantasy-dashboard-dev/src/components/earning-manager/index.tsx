

import { Box, Card, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { useEffect } from "react";
// import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";
import { Icon } from '@iconify/react';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

import useEarningManagerStore, { EarningManager } from "src/features/earning-manager/earning-manger.service";
import { toIndianNumberSystem } from "src/helpers/IndianNoConvertor";
import { Copy } from "src/pages/apps/users/list";

interface CellType {
  row: EarningManager
}

let page_title = "Earning Manager";



type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof EarningManager }

interface EarnUrl {
  path: string;
  title: string;
}




const defaultColumns: PlanListColumn[] = [
  {
    flex: 0.02,
    field: 'id',
    minWidth: 70,
    headerName: 'Id',
    renderCell: ({ row }: CellType) => (

      <>
        <Icon icon='mdi:content-copy' fontSize={20} cursor={'pointer'} onClick={() => {
          Copy(row.id + '')
        }} />
      </>

    )
  },
  {
    flex: 0.7,
    minWidth: 90,
    field: 'name',
    headerName: 'Match name / Series Name',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.name}</Typography>
  },
  {
    flex: 0.5,
    minWidth: 90,
    field: 'last_squad_update',
    headerName: 'Date',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.last_squad_update}</Typography>
  },


  {
    flex: 0.5,
    minWidth: 90,
    field: 'payment_data',
    headerName: 'Amount Collected (AC - 2%)',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' >

      AC - {row?.payment_data?.total_amount ? toIndianNumberSystem(row?.payment_data?.total_amount) : 0}
    </Typography>
  },
  {
    flex: 0.6,
    minWidth: 90,
    field: 'used_cash_bonus',
    headerName: 'Amount Used',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' >
      Bonus : {row?.payment_data?.used_cash_bonus ? toIndianNumberSystem(row?.payment_data?.used_cash_bonus) : 0}
      <br />
      Winning  : {row?.payment_data?.used_winning_amount ? toIndianNumberSystem(row?.payment_data?.used_winning_amount) : 0}
      <br />
      Deposit  : {row?.payment_data?.used_deposited_balance ? toIndianNumberSystem(row?.payment_data?.used_deposited_balance) : 0}
      <br />

    </Typography>
  },
  {
    flex: 0.7,
    minWidth: 90,
    field: 'total_winning_distributed',
    headerName: 'Winning Distributed (WD)',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' >

      {row?.payment_data?.total_winning_distributed ? toIndianNumberSystem(row?.payment_data?.total_winning_distributed) : 0}
    </Typography>
  },
  {
    flex: 0.7,
    minWidth: 90,
    field: 'total_earning',
    headerName: 'Total Earning [AC - (WD + Bonus)]',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' >

      {row?.payment_data?.total_amount ? toIndianNumberSystem(row?.payment_data?.total_amount - (row?.payment_data?.total_winning_distributed + row?.payment_data?.used_cash_bonus)) : 0}
    </Typography>
  },
]



const EarningManager = ({ path, title }: EarnUrl) => {



  const router = useRouter();
  const store = useEarningManagerStore()

  useEffect(() => {
    if (!router.isReady) return
    const init = async () => {
      store.get.paginate({ path: path, search: '' })
    }

    init()
  }, [])





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

                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >

              <Grid container item xs={12}>
                <Grid item xs={9.5} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon icon='mdi:message-badge-outline' fontSize={22} />
                  <Typography variant="h5" component="h4">
                    {title}{" "} {page_title}
                  </Typography>
                </Grid>

              </Grid>
            </Box>
            <DataGrid
              style={{ overflow: 'auto', height: '750px' }}
              rowHeight={90}

              rows={store?.earning?.list}
              columns={columns}
              disableRowSelectionOnClick
              rowCount={store.earning?.total}
              paginationMode='server'
              pageSizeOptions={[15, 25, 50, 100]}
              paginationModel={{
                page: store.earning.page - 1,
                pageSize: store.earning?.per_page
              }}
              onPaginationModelChange={({ page, pageSize }) => {
                if (page == store.earning.page - 1 && pageSize == store.earning.per_page) return
                store.get.paginate({ path: path, page: page + 1, per_page: pageSize })

                router.push(
                  {
                    pathname: router.pathname,
                    query: { page: page + 1, size: pageSize }
                  },
                  undefined,
                  { shallow: true }
                )
              }}

            />

          </Card>
        </Grid>
      </Grid >

    </DatePickerWrapper>
  )
}

export default EarningManager
