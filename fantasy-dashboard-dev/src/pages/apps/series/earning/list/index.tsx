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

// const defaultColumns: PlanListColumn[] = [
//     {
//         flex: 0.09,
//         field: 'status',
//         minWidth: 150,
//         headerName: 'Status',
//         renderCell: ({ row }: CellType) => (
//             <Typography variant='body2'>{row.status}</Typography>
//         )
//     },



//     {
//         flex: 0.12,
//         field: 'Contest_Category',
//         minWidth: 100,
//         headerName: 'Contest Category',
//         renderCell: ({ row }: CellType) => (
//             <ThemeText >{row.Contest_Category}</ThemeText>
//         )
//     },
//     {
//         flex: 0.1,
//         field: 'Total_Contests',
//         minWidth: 150,
//         headerName: 'Contest ',
//         renderCell: ({ row }: CellType) => (
//             <Typography variant='body2'>
//                 <b>Total</b> :{row.Total_Contests} <br />
//                 <b>Completed</b> :{row.Contests_Completed}<br />
//                 <b>Canceled</b> :{row.Contests_Canceled}<br />
//             </Typography>
//         )
//     },
//     {
//         flex: 0.12,
//         field: 'Deposit_Wallet',
//         minWidth: 150,
//         headerName: 'Wallet Type ',
//         renderCell: ({ row }: CellType) => (
//             <Typography variant='body2'>
//                 <b>Bonus</b> :{row.Bonus_Wallet} <br />
//                 <b>Winning</b> :{row.Winning_Wallet}<br />
//                 <b>Deposit</b> :{row.Deposit_Wallet}<br />
//                 <b>Discount</b> :{row.Discount_Wallet}<br />
//             </Typography>
//         )
//     },
//     {
//         flex: 0.12,
//         field: 'Normal_User_PnL',
//         minWidth: 100,
//         headerName: 'Normal User',
//         renderCell: ({ row }: CellType) => (
//             <Typography variant='body2'>
//                 <b>User Count</b> :{row.Normal_Users} <br />
//                 <b>Invested</b> :{row.Amount_Collected}<br />
//                 <b>Winning</b> :{row.Normal_Winner_Amount}<br />
//                 <SuccessText>Profit</SuccessText> :{row.Profit_Loss}<br />
//             </Typography>
//         )
//     },
//     {
//         flex: 0.08,
//         field: 'Contests_Canceled',
//         minWidth: 100,
//         headerName: 'Canceled',
//         renderCell: ({ row }: CellType) => (
//             <Typography variant='body2'>{row.Contests_Canceled}</Typography>
//         )
//     },
//     {
//         flex: 0.12,
//         field: 'Normal_Winner_Amount',
//         minWidth: 130,
//         headerName: 'Normal Winner Amount',
//         renderCell: ({ row }: CellType) => (
//             <Typography variant='body2'>{row.Normal_Winner_Amount}</Typography>
//         )
//     },
//     {
//         flex: 0.12,
//         field: 'System_Winner_Amount',
//         minWidth: 130,
//         headerName: 'System Winner Amount',
//         renderCell: ({ row }: CellType) => (
//             <Typography variant='body2'>{row.System_Winner_Amount}</Typography>
//         )
//     },
//     {
//         flex: 0.12,
//         field: 'Profit_Loss',
//         minWidth: 120,
//         headerName: 'Profit/Loss',
//         renderCell: ({ row }: CellType) => (
//             <Typography variant='body2' color={row.Profit_Loss >= 0 ? 'green' : 'red'}>
//                 {row.Profit_Loss}
//             </Typography>
//         )
//     },

// ];

const defaultColumns: PlanListColumn[] = [
    {
        flex: 0.05,
        field: 'id',
        minWidth: 50,
        headerName: '#',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>{row.id}</Typography>
        )
    },
    {
        flex: 0.15,
        field: 'Name',
        minWidth: 150,
        headerName: 'Name',
        renderCell: ({ row }: CellType) => (
            <ThemeText>{row.Name}</ThemeText>
        )
    },
    {
        flex: 0.12,
        field: 'Total_Users_Teams',
        minWidth: 150,
        headerName: 'Total Users/Teams',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
                <b>Users</b>:{row.Total_Users} <br />
                <b>Teams</b>:{row.Total_Teams}
            </Typography>
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

                <b>Investment</b> :{row.Normal_Investment}<br />
                <b>Winning</b> :{row.Normal_Winner_Amount}<br />
                <SuccessText>Profit</SuccessText> :{row.Profit_Loss}<br />
            </Typography>
        )
    },




    {
        flex: 0.12,
        field: 'System_Investments',
        minWidth: 150,
        headerName: 'System Investments',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>

                <b>Investment</b> :{row.Amount_Collected}<br />
                <b>Winning</b> :{row.System_Winner_Amount}<br />
                <SuccessText>Profit</SuccessText> :{row.Profit_Loss}<br />
            </Typography>
        )
    },

    {
        flex: 0.12,
        field: 'Total_Commissions',
        minWidth: 150,
        headerName: 'Commissions',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
                <b>Total</b>  {row.Total_Commissions}
                <b>Influencer</b> {row.Commissions_Influencer}
                <b>Actual</b> {row.Commissions_Actual}
            </Typography>
        )
    },

    {
        flex: 0.12,
        field: 'Profit_Loss',
        minWidth: 150,
        headerName: 'Profit/Loss',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>{row.Profit_Loss}</Typography>
        )
    }
];

const seriesEarningData = [
    {
        id: 1,
        Name: "Master Takes All",
        Total_Teams: 2726,
        Total_Users: 6690,
        Total_Contests: 4283,
        Contests_Completed: 1376,
        Contests_Canceled: 2907,
        Bonus_Wallet: 24.25,
        Winning_Wallet: 306070.54,
        Deposit_Wallet: 423323.33,
        Discount_Wallet: 0,

        Normal_Investment: 735418,
        Normal_Winner_Amount: 515551.6,
        System_Loss: 219866.4,

        System_Investment_2: 403777,
        System_Winner_Amount: 494332.6,
        Normal_Profit: 90555.6,
        Total_Amount: 129543.97,
        Influencer_Commission: 15683.68,
        Actual_Commission: 113860.29,
        Profit_Loss: 204182.72
    },
    {
        id: 2,
        Name: "DISCOUNT DHAMAKA",
        Total_Teams: 9266,
        Total_Users: 17616,
        Total_Contests: 1392,
        Contests_Completed: 586,
        Contests_Canceled: 806,
        Bonus_Wallet: 0,
        Winning_Wallet: 118208.18,
        Deposit_Wallet: 264854.32,
        Discount_Wallet: 235965.54,

        Normal_Investment: 619028,
        Normal_Winner_Amount: 395398.6,
        System_Loss: 223629.4,
        System_Investment_2: 373763,
        System_Winner_Amount: 472499.17,
        Normal_Profit: 98736.17,
        Total_Amount: 129579.18,
        Influencer_Commission: 9848.71,
        Actual_Commission: 119730.47,
        Profit_Loss: 213780.69
    },
    {
        id: 3,
        Name: "Head to Head",
        Total_Teams: 2776,
        Total_Users: 7409,
        Total_Contests: 1004,
        Contests_Completed: 275,
        Contests_Canceled: 729,
        Bonus_Wallet: 0,
        Winning_Wallet: 42205.75,
        Deposit_Wallet: 41646.25,
        Discount_Wallet: 0,
        Normal_Investment: 83852,
        Normal_Winner_Amount: 67530,
        System_Loss: 16322,
        System_Investment_2: 41402,
        System_Winner_Amount: 43050,
        Normal_Profit: 1648,
        Total_Amount: 16931.39,
        Influencer_Commission: 1124.33,
        Actual_Commission: 15807.06,
        Profit_Loss: 15197.67
    },
    {
        id: 4,
        Name: "BONUS DHAMAKA",
        Total_Teams: 4637,
        Total_Users: 9923,
        Total_Contests: 526,
        Contests_Completed: 24,
        Contests_Canceled: 502,
        Bonus_Wallet: 375.65,
        Winning_Wallet: 32619.8,
        Deposit_Wallet: 21504.55,
        Discount_Wallet: 0,
        Normal_Investment: 54500,
        Normal_Winner_Amount: 42691.67,
        System_Loss: 11808.33,
        System_Investment_2: 34055,
        System_Winner_Amount: 34041.67,
        Normal_Loss: 13.33,
        Total_Amount: 11821.23,
        Influencer_Commission: 1247.91,
        Actual_Commission: 10573.32,
        Profit_Loss: 10560.42
    },
    {
        id: 5,
        Name: "Contest for Masters",
        Total_Teams: 39797,
        Total_Users: 59.745,
        Total_Contests: 461,
        Contests_Completed: 43,
        Contests_Canceled: 418,
        Bonus_Wallet: 7.2,
        Winning_Wallet: 3854.97,
        Deposit_Wallet: 6354.83,
        Discount_Wallet: 0,
        Normal_Investment: 10217,
        Normal_Winner_Amount: 9701.12,
        System_Loss: 515.88,
        System_Investment_2: 22714,
        System_Winner_Amount: 19389.8,
        Normal_Loss: 3324.2,
        Total_Amount: 3613.12,
        Influencer_Commission: 216.55,
        Actual_Commission: 3396.57,
        Profit_Loss: 299.33
    },
    {
        id: 6,
        Name: "Paanch Ka Punch",
        Total_Teams: 2726,
        Total_Users: 6690,
        Total_Contests: 231,
        Contests_Completed: 31,
        Contests_Canceled: 200,
        Bonus_Wallet: 0,
        Winning_Wallet: 7999.5,
        Deposit_Wallet: 19650.5,
        Discount_Wallet: 0,
        Normal_Investment: 27650,
        Normal_Winner_Amount: 8320,
        System_Loss: 19330,
        System_Investment_2: 9648,
        System_Winner_Amount: 24680,
        Normal_Profit: 15032,
        Total_Amount: 4276.37,
        Influencer_Commission: 586.41,
        Actual_Commission: 3689.96,
        Profit_Loss: 18743.59
    },
    {
        id: 7,
        Name: "Mini League",
        Total_Teams: 2726,
        Total_Users: 6690,
        Total_Contests: 30,
        Contests_Completed: 6,
        Contests_Canceled: 24,
        Bonus_Wallet: 0,
        Winning_Wallet: 5844.72,
        Deposit_Wallet: 1808.28,
        Discount_Wallet: 0,
        Normal_Investment: 7653,
        Normal_Winner_Amount: 6867,
        System_Loss: 786,
        System_Investment_2: 0,
        System_Winner_Amount: 0,
        Normal_Profit: 0,
        Total_Amount: 770,
        Influencer_Commission: 81.57,
        Actual_Commission: 688.43,
        Profit_Loss: 704.43
    },
    {
        id: 8,
        Name: "Mega Contest",
        Total_Teams: 2726,
        Total_Users: 6690,
        Total_Contests: 1,
        Contests_Completed: 1,
        Contests_Canceled: 0,
        Bonus_Wallet: 0,
        Winning_Wallet: 7708.1,
        Deposit_Wallet: 3289.9,
        Discount_Wallet: 0,
        Normal_Investment: 10998,
        Normal_Winner_Amount: 8523.88,
        System_Loss: 2474.12,
        System_Investment_2: 0,
        System_Winner_Amount: 0,
        Normal_Profit: 0,
        Total_Amount: 29047.2,
        Influencer_Commission: 330.9,
        Actual_Commission: 28716.3,
        Profit_Loss: 2143.22
    },
    {
        id: 9,
        Name: "Total",
        Total_Teams: 2726,
        Total_Users: 6690,
        Total_Contests: 7928,
        Contests_Completed: 2342,
        Contests_Canceled: 5586,
        Bonus_Wallet: 407.1,
        Winning_Wallet: 524511.56,
        Deposit_Wallet: 788431.96,
        Discount_Wallet: 235965.54,

        Normal_Investment: 1549316,
        Normal_Winner_Amount: 1054583.87,
        System_Loss: 494732.13,
        System_Investment_2: 885359,
        System_Winner_Amount: 1087993.24,
        Normal_Profit: 202634.24,
        Total_Amount: 325582.45,
        Influencer_Commission: 29120.06,
        Actual_Commission: 296462.39,
        Profit_Loss: 465612.07
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
                            rows={seriesEarningData}
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


