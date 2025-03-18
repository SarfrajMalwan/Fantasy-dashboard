// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
// ** Icon Imports// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import { useRouter } from 'next/router'
import useContestEarning, { ContestEarning } from 'src/features/contest/earning.service'
import styled from '@mui/system/styled'

interface CellType {
    row: ContestEarning
}
const ThemeText = styled('div')(({ theme }) => ({
    color: theme.palette.primary.main
}))
const SuccessText = styled('span')(({ theme }) => ({
    color: theme.palette.primary.main
}))

type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof ContestEarning }

const defaultColumns: PlanListColumn[] = [
    {
        flex: 0.09,
        field: 'status',
        minWidth: 150,
        headerName: 'Status',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>{row.status}</Typography>
        )
    },

    {
        flex: 0.12,
        field: 'Contest_Category',
        minWidth: 100,
        headerName: 'Contest Category',
        renderCell: ({ row }: CellType) => (
            <ThemeText >{row.Contest_Category}</ThemeText>
        )
    },
    {
        flex: 0.1,
        field: 'Total_Contests',
        minWidth: 150,
        headerName: 'Contest ',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
                <b>Total</b> :{row.Total_Contests} <br />
                <b>Completed</b> :{row.Contests_Completed}<br />
                <b>Canceled</b> :{row.Contests_Canceled}<br />
            </Typography>
        )
    },
    {
        flex: 0.12,
        field: 'Deposit_Wallet',
        minWidth: 150,
        headerName: 'Wallet Type ',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
                <b>Bonus</b> :{row.Bonus_Wallet} <br />
                <b>Winning</b> :{row.Winning_Wallet}<br />
                <b>Deposit</b> :{row.Deposit_Wallet}<br />
                <b>Discount</b> :{row.Discount_Wallet}<br />
            </Typography>
        )
    },
    {
        flex: 0.12,
        field: 'Normal_User_PnL',
        minWidth: 100,
        headerName: 'Normal User',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
                <b>User Count</b> :{row.Normal_Users} <br />
                <b>Invested</b> :{row.Amount_Collected}<br />
                <b>Winning</b> :{row.Normal_Winner_Amount}<br />
                <SuccessText>Profit</SuccessText> :{row.Profit_Loss}<br />
            </Typography>
        )
    },
    {
        flex: 0.08,
        field: 'Contests_Canceled',
        minWidth: 100,
        headerName: 'Canceled',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>{row.Contests_Canceled}</Typography>
        )
    },
    {
        flex: 0.12,
        field: 'Normal_Winner_Amount',
        minWidth: 130,
        headerName: 'Normal Winner Amount',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>{row.Normal_Winner_Amount}</Typography>
        )
    },
    {
        flex: 0.12,
        field: 'System_Winner_Amount',
        minWidth: 130,
        headerName: 'System Winner Amount',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>{row.System_Winner_Amount}</Typography>
        )
    },
    {
        flex: 0.12,
        field: 'Profit_Loss',
        minWidth: 120,
        headerName: 'Profit/Loss',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2' color={row.Profit_Loss >= 0 ? 'green' : 'red'}>
                {row.Profit_Loss}
            </Typography>
        )
    },

];


const contestData = [
    {
        id: 1,
        Contest_Category: "Master Takes All",
        Total_Contests: 2678,
        Contests_Completed: 1277,
        Contests_Canceled: 1401,
        Normal_Winner_Amount: 682918.01,
        System_Winner_Amount: 627057.49,
        System_Investment: 682259,
        System_User_PnL: -55201.51,
        Normal_User_PnL: -120313.99,
        Bonus_Wallet: 8.4,
        Deposit_Wallet: 564850.46,
        Winning_Wallet: 238373.2,
        Discount_Wallet: 0,
        Amount_Collected: 803232,
        Total_Commission: 176724.2013,
        Influencer_Commission: 17622.39,
        Actual_Commission: 159101.8113,
        status: "NOT STARTED",
        Profit_Loss: 102691.6
    },
    {
        id: 2,
        Contest_Category: "DISCOUNT DHAMAKA",
        Total_Contests: 1039,
        Contests_Completed: 636,
        Contests_Canceled: 403,
        Normal_Winner_Amount: 388234.93,
        System_Winner_Amount: 290690.17,
        System_Investment: 376710,
        System_User_PnL: -86019.83,
        Normal_User_PnL: -11655.07,
        Bonus_Wallet: 0,
        Deposit_Wallet: 148075.24,
        Winning_Wallet: 86306.94,
        Discount_Wallet: 165507.92,
        Amount_Collected: 399890,
        Total_Commission: 100148.6176,
        Influencer_Commission: 5884.98,
        Actual_Commission: 94263.6376,
        status: "NOT STARTED",
        Profit_Loss: 5770.09
    },
    {
        id: 3,
        Contest_Category: "Head to Head",
        Total_Contests: 691,
        Contests_Completed: 331,
        Contests_Canceled: 360,
        Normal_Winner_Amount: 56025.0,
        System_Winner_Amount: 28530.0,
        System_Investment: 37070,
        System_User_PnL: -8540.0,
        Normal_User_PnL: -3665.0,
        Bonus_Wallet: 0,
        Deposit_Wallet: 33033.34,
        Winning_Wallet: 26656.66,
        Discount_Wallet: 0,
        Amount_Collected: 59690,
        Total_Commission: 14853.6374,
        Influencer_Commission: 1656.34,
        Actual_Commission: 13197.2974,
        status: "NOT STARTED",
        Profit_Loss: 2008.66
    },
    {
        id: 4,
        Contest_Category: "Contest for Masters",
        Total_Contests: 293,
        Contests_Completed: 27,
        Contests_Canceled: 266,
        Normal_Winner_Amount: 2474.63,
        System_Winner_Amount: 0.0,
        System_Investment: 0,
        System_User_PnL: 0.0,
        Normal_User_PnL: -653.37,
        Bonus_Wallet: 0,
        Deposit_Wallet: 440.75,
        Winning_Wallet: 2687.25,
        Discount_Wallet: 0,
        Amount_Collected: 3128,
        Total_Commission: 488.667,
        Influencer_Commission: 56.0,
        Actual_Commission: 432.667,
        status: "NOT STARTED",
        Profit_Loss: 597.37
    },
    {
        id: 5,
        Contest_Category: "BONUS DHAMAKA",
        Total_Contests: 288,
        Contests_Completed: 43,
        Contests_Canceled: 245,
        Normal_Winner_Amount: 10216.67,
        System_Winner_Amount: 92250.0,
        System_Investment: 69718,
        System_User_PnL: 22532.0,
        Normal_User_PnL: -39862.33,
        Bonus_Wallet: 471.95,
        Deposit_Wallet: 12823.78,
        Winning_Wallet: 36783.27,
        Discount_Wallet: 0,
        Amount_Collected: 50079,
        Total_Commission: 17417.1294,
        Influencer_Commission: 1669.7,
        Actual_Commission: 15747.4294,
        status: "NOT STARTED",
        Profit_Loss: 38192.63
    },
    {
        id: 6,
        Contest_Category: "Paanch Ka Punch",
        Total_Contests: 134,
        Contests_Completed: 36,
        Contests_Canceled: 98,
        Normal_Winner_Amount: 23125.0,
        System_Winner_Amount: 13184.0,
        System_Investment: 17300,
        System_User_PnL: -4116.0,
        Normal_User_PnL: -227.0,
        Bonus_Wallet: 0,
        Deposit_Wallet: 13912.76,
        Winning_Wallet: 9439.24,
        Discount_Wallet: 0,
        Amount_Collected: 23352,
        Total_Commission: 4333.632,
        Influencer_Commission: 392.73,
        Actual_Commission: 3940.902,
        status: "NOT STARTED",

        Profit_Loss: -165.73
    },
    {
        id: 7,
        Contest_Category: "Master's Battle",
        Total_Contests: 78,
        Contests_Completed: 1,
        Contests_Canceled: 77,
        Normal_Winner_Amount: 30000.0,
        System_Winner_Amount: 0.0,
        System_Investment: 17099,
        System_User_PnL: -17099.0,
        Normal_User_PnL: 12901.0,
        Bonus_Wallet: 0,
        Deposit_Wallet: 17099,
        Winning_Wallet: 0,
        Discount_Wallet: 0,
        Amount_Collected: 17099,
        Total_Commission: 4784.3002,
        Influencer_Commission: 0.0,
        Actual_Commission: 4784.3002,
        status: "NOT STARTED",

        Profit_Loss: -12901.0
    },
    {
        id: 8,
        Contest_Category: "Mini League",
        Total_Contests: 15,
        Contests_Completed: 5,
        Contests_Canceled: 10,
        Normal_Winner_Amount: 5679.0,
        System_Winner_Amount: 0.0,
        System_Investment: 0,
        System_User_PnL: 0.0,
        Normal_User_PnL: -701.0,
        Bonus_Wallet: 0,
        Deposit_Wallet: 2395.8,
        Winning_Wallet: 3984.18,
        Discount_Wallet: 0,
        Amount_Collected: 6380,
        Total_Commission: 638.0,
        Influencer_Commission: 95.91,
        Actual_Commission: 542.09,
        Profit_Loss: 605.09
    }
];






const PlanList = () => {
    const page_title = 'Contest Earning Summary'

    // ** State
    const [openEdit, setOpenEdit] = useState<boolean>(false)

    // ** Hooks
    const store = useContestEarning()



    const router = useRouter()



    useEffect(() => {
        if (!router.isReady) return
        const { size, page, search } = router.query;

        store.get.paginate({ page, size, search } as any)


    }, [router.isReady])





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
                            <Grid xs={4}></Grid>

                        </Box>
                        <DataGrid
                            autoHeight
                            pagination
                            rows={contestData}
                            columns={columns}

                            rowHeight={130}

                            // checkboxSelection
                            disableRowSelectionOnClick
                            pageSizeOptions={[10, 25, 50]}
                            paginationMode='server'
                            paginationModel={{
                                page: store.earning.page - 1,
                                pageSize: store.earning.size
                            }}
                            onPaginationModelChange={({ page, pageSize }) => {
                                if (page == store.earning.page - 1 && pageSize == store.earning.size) return
                                store.get.paginate({ page: page + 1, size: pageSize })

                                router.push(
                                    {
                                        pathname: router.pathname,
                                        query: { page: page + 1, size: pageSize }
                                    },
                                    undefined,
                                    { shallow: true }
                                )
                            }}
                            onColumnOrderChange={e => {
                                console.log('e: ', e)
                            }}
                            rowCount={store.earning.total}
                        />
                    </Card>

                </Grid>
            </Grid>
        </DatePickerWrapper>
    )
}
PlanList.moduleId = 14
PlanList.gameIds = [1, 2, 3, 4]
export default PlanList


