import { Box, Card, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { useEffect } from "react";
// import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";
import { Icon } from '@iconify/react';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import useInvestmentLeaderboard, { Leaderboard } from "src/features/investment/leaderboard.service";
import { Copy, LinkStyled } from "../../users/list";

interface CellType {
  row: Leaderboard
}

let page_title = "Investment Leaderboard";



type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof Leaderboard }








const defaultColumns: PlanListColumn[] = [
  {
    flex: 0.12,
    // field: 'Contest_Category',
    field: 'id',
    minWidth: 150,
    headerName: 'Id',
    renderCell: ({ row }) => (
      // <Typography variant='body2'>{row.Contest_Category}</Typography>
      <>
        {row.is_sys_user && <LinkStyled />}
        <Icon icon='mdi:content-copy' fontSize={20} cursor={'pointer'} onClick={() => {
          Copy(row.id + '')
        }} />
      </>
    )
  },

  {
    flex: 0.1,
    field: 'rank',
    minWidth: 150,
    headerName: 'Rank',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2'>{row?.rank}</Typography>
    )
  },

  {
    flex: 0.12,
    field: 'username',

    minWidth: 150,
    headerName: 'Username',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2'>{row?.username}</Typography>
    )
  },

  {
    flex: 0.12,
    field: 'email',
    headerName: 'Email & Phone',

    minWidth: 150,

    renderCell: ({ row }) => (
      <Typography variant='body2' >
        {row?.email}
        <br />
        {row?.phone}

      </Typography>
    )
  },

  {
    flex: 0.12,
    field: 'total_amount',
    headerName: 'Total Amount',
    minWidth: 150,

    renderCell: ({ row }) => (
      <Typography variant='body2'>{row?.total_amount}</Typography>
    )
  },


];

const userData = [
  {
    id: 1,
    username: 'hanu2024',
    email: 'kunal@wiz.com',
    phone: '',
    total_amount: '2896316.00',
    rank: 1,
    is_sys_user: true
  },
  {
    id: 2,
    username: 'ZubinBG95',
    email: 'zubin@wiz.com',
    phone: '',
    total_amount: '2544560.00',
    rank: 2,
    is_sys_user: true
  },
  {
    id: 3,
    username: 'Shauryasen74',
    email: 'shaurya@wiz.com',
    phone: '',
    total_amount: '2215580.00',
    rank: 3,
    is_sys_user: true
  },
  {
    id: 4,
    username: 'naiduyuvi12',
    email: 'rukmani@wiz.com',
    phone: '',
    total_amount: '2209029.00',
    rank: 4,
    is_sys_user: true
  },
  {
    id: 5,
    username: 'WagzaiPower0103',
    email: 'anir@wiz.com',
    phone: '',
    total_amount: '2161015.00',
    rank: 5,
    is_sys_user: true
  },
  {
    id: 6,
    username: 'kunnupatil96',
    email: 'rekha@wiz.com',
    phone: '',
    total_amount: '1956899.00',
    rank: 6,
    is_sys_user: true
  },
  {
    id: 7,
    username: 'Defenders24',
    email: 'jaideep@wiz.com',
    phone: '',
    total_amount: '1652682.00',
    rank: 7,
    is_sys_user: true
  },
  {
    id: 8,
    username: 'arbivyas',
    email: 'pankaj@wiz.com',
    phone: '',
    total_amount: '1457305.00',
    rank: 8,
    is_sys_user: true
  },
  {
    id: 9,
    username: 'LUCKNOW11',
    email: 'indutripathi0218@gmail.com',
    phone: '',
    total_amount: '1337522.00',
    rank: 9,
    is_sys_user: true
  },
  {
    id: 10,
    username: 'PawantWHX21',
    email: 'pawan@wiz.com',
    phone: '',
    total_amount: '1207853.00',
    rank: 10,
    is_sys_user: true
  },
  {
    id: 11,
    username: 'jdpatell',
    email: 'nishant@wiz.com',
    phone: '',
    total_amount: '1138575.00',
    rank: 11,
    is_sys_user: true
  },
  {
    id: 12,
    username: 'Kanan01',
    email: 'jhanvi@wiz.com',
    phone: '',
    total_amount: '1015542.00',
    rank: 12,
    is_sys_user: true
  },
  {
    id: 13,
    username: 'Prashantb919',
    email: 'prashant@wiz.com',
    phone: '',
    total_amount: '970567.00',
    rank: 13,
    is_sys_user: true
  },
  {
    id: 14,
    username: 'Monto1',
    email: 'rohan@wiz.com',
    phone: '',
    total_amount: '960079.00',
    rank: 14,
    is_sys_user: true
  },
  {
    id: 15,
    username: 'chet15675',
    email: 'chetan@wiz.com',
    phone: '',
    total_amount: '864110.00',
    rank: 15,
    is_sys_user: true
  }
]






const Index = ({ read, write, update, del }: GlobalProps) => {



  const router = useRouter();
  const store = useInvestmentLeaderboard()

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

              // rows={store?.leaderboard?.list}
              rows={userData}
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




