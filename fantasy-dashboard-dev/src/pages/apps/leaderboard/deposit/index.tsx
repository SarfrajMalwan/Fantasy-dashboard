import { Box, Card, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { useEffect } from "react";
// import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";
import { Icon } from '@iconify/react';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import useDepositLeaderboardStore, { Leaderboard } from "src/features/deposit/leaderboard.service";
import { Copy, LinkStyled } from "../../users/list";

interface CellType {
  row: Leaderboard
}

let page_title = "Deposit Leaderboard";



type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof Leaderboard }




const defaultColumns: PlanListColumn[] = [
  {
    flex: 0.02,
    field: 'id',
    minWidth: 70,
    headerName: 'Id',
    renderCell: ({ row }: CellType) => (

      <>
        {!(row.rank == 1 || row.rank === 2 || row.rank === 3) || <LinkStyled />}
        <Icon icon='mdi:content-copy' fontSize={20} cursor={'pointer'} onClick={() => {
          Copy(row.id + '')
        }} />
      </>

    )
  },
  {
    flex: 0.4,
    minWidth: 90,
    field: 'rank',
    headerName: 'Rank',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.rank}</Typography>
  },
  {
    flex: 0.4,
    minWidth: 90,
    field: 'username',
    headerName: 'Username',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.username}</Typography>
  },


  {
    flex: 0.7,
    minWidth: 90,
    field: 'email',
    headerName: 'Email & Phone',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' >
      {row?.email}
      <br />
      {row?.phone}

    </Typography>
  },
  {
    flex: 0.4,
    minWidth: 90,
    field: 'total_amount',
    headerName: 'Total Amount',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.total_amount}</Typography>
  },



]



const Index = ({ read, write, update, del }: GlobalProps) => {



  const router = useRouter();
  const store = useDepositLeaderboardStore()

  useEffect(() => {
    if (!router.isReady) return
    const init = async () => {
      store.get.paginate({ search: '' })
    }

    init()
  }, [])

  // const [searchValue, setSearchValue] = useState<string>('')

  // const handleSearch = (value: string) => {
  //   setSearchValue(value)
  //   store.get.paginate()
  // }




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
                    {page_title}
                  </Typography>
                </Grid>

              </Grid>
            </Box>
            <DataGrid
              style={{ overflow: 'auto', height: '750px' }}
              rowHeight={60}

              rows={store?.leaderboard?.list}
              columns={columns}
              disableRowSelectionOnClick
              rowCount={store.leaderboard?.total}
              paginationMode='server'
              pageSizeOptions={[15, 25, 50, 100]}
              paginationModel={{
                page: store.leaderboard.page - 1,
                pageSize: store.leaderboard?.per_page
              }}
              onPaginationModelChange={({ page, pageSize }) => {
                if (page == store.leaderboard.page - 1 && pageSize == store.leaderboard.per_page) return
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

            />

          </Card>
        </Grid>
      </Grid >

    </DatePickerWrapper>
  )
}

export default Index




