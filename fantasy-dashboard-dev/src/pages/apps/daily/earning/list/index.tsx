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

type dailyEarningsColumns = Omit<GridColDef, 'field'> & { field: keyof ContestEarning }

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


// const contestData = [
//     {
//         id: 1,
//         Contest_Category: "Master Takes All",
//         Total_Contests: 2678,
//         Contests_Completed: 1277,
//         Contests_Canceled: 1401,
//         Normal_Winner_Amount: 682918.01,
//         System_Winner_Amount: 627057.49,
//         System_Investment: 682259,
//         System_User_PnL: -55201.51,
//         Normal_User_PnL: -120313.99,
//         Bonus_Wallet: 8.4,
//         Deposit_Wallet: 564850.46,
//         Winning_Wallet: 238373.2,
//         Discount_Wallet: 0,
//         Amount_Collected: 803232,
//         Total_Commission: 176724.2013,
//         Influencer_Commission: 17622.39,
//         Actual_Commission: 159101.8113,
//         status: "NOT STARTED",
//         Profit_Loss: 102691.6
//     },
//     {
//         id: 2,
//         Contest_Category: "DISCOUNT DHAMAKA",
//         Total_Contests: 1039,
//         Contests_Completed: 636,
//         Contests_Canceled: 403,
//         Normal_Winner_Amount: 388234.93,
//         System_Winner_Amount: 290690.17,
//         System_Investment: 376710,
//         System_User_PnL: -86019.83,
//         Normal_User_PnL: -11655.07,
//         Bonus_Wallet: 0,
//         Deposit_Wallet: 148075.24,
//         Winning_Wallet: 86306.94,
//         Discount_Wallet: 165507.92,
//         Amount_Collected: 399890,
//         Total_Commission: 100148.6176,
//         Influencer_Commission: 5884.98,
//         Actual_Commission: 94263.6376,
//         status: "NOT STARTED",
//         Profit_Loss: 5770.09
//     },
//     {
//         id: 3,
//         Contest_Category: "Head to Head",
//         Total_Contests: 691,
//         Contests_Completed: 331,
//         Contests_Canceled: 360,
//         Normal_Winner_Amount: 56025.0,
//         System_Winner_Amount: 28530.0,
//         System_Investment: 37070,
//         System_User_PnL: -8540.0,
//         Normal_User_PnL: -3665.0,
//         Bonus_Wallet: 0,
//         Deposit_Wallet: 33033.34,
//         Winning_Wallet: 26656.66,
//         Discount_Wallet: 0,
//         Amount_Collected: 59690,
//         Total_Commission: 14853.6374,
//         Influencer_Commission: 1656.34,
//         Actual_Commission: 13197.2974,
//         status: "NOT STARTED",
//         Profit_Loss: 2008.66
//     },
//     {
//         id: 4,
//         Contest_Category: "Contest for Masters",
//         Total_Contests: 293,
//         Contests_Completed: 27,
//         Contests_Canceled: 266,
//         Normal_Winner_Amount: 2474.63,
//         System_Winner_Amount: 0.0,
//         System_Investment: 0,
//         System_User_PnL: 0.0,
//         Normal_User_PnL: -653.37,
//         Bonus_Wallet: 0,
//         Deposit_Wallet: 440.75,
//         Winning_Wallet: 2687.25,
//         Discount_Wallet: 0,
//         Amount_Collected: 3128,
//         Total_Commission: 488.667,
//         Influencer_Commission: 56.0,
//         Actual_Commission: 432.667,
//         status: "NOT STARTED",
//         Profit_Loss: 597.37
//     },
//     {
//         id: 5,
//         Contest_Category: "BONUS DHAMAKA",
//         Total_Contests: 288,
//         Contests_Completed: 43,
//         Contests_Canceled: 245,
//         Normal_Winner_Amount: 10216.67,
//         System_Winner_Amount: 92250.0,
//         System_Investment: 69718,
//         System_User_PnL: 22532.0,
//         Normal_User_PnL: -39862.33,
//         Bonus_Wallet: 471.95,
//         Deposit_Wallet: 12823.78,
//         Winning_Wallet: 36783.27,
//         Discount_Wallet: 0,
//         Amount_Collected: 50079,
//         Total_Commission: 17417.1294,
//         Influencer_Commission: 1669.7,
//         Actual_Commission: 15747.4294,
//         status: "NOT STARTED",
//         Profit_Loss: 38192.63
//     },
//     {
//         id: 6,
//         Contest_Category: "Paanch Ka Punch",
//         Total_Contests: 134,
//         Contests_Completed: 36,
//         Contests_Canceled: 98,
//         Normal_Winner_Amount: 23125.0,
//         System_Winner_Amount: 13184.0,
//         System_Investment: 17300,
//         System_User_PnL: -4116.0,
//         Normal_User_PnL: -227.0,
//         Bonus_Wallet: 0,
//         Deposit_Wallet: 13912.76,
//         Winning_Wallet: 9439.24,
//         Discount_Wallet: 0,
//         Amount_Collected: 23352,
//         Total_Commission: 4333.632,
//         Influencer_Commission: 392.73,
//         Actual_Commission: 3940.902,
//         status: "NOT STARTED",

//         Profit_Loss: -165.73
//     },
//     {
//         id: 7,
//         Contest_Category: "Master's Battle",
//         Total_Contests: 78,
//         Contests_Completed: 1,
//         Contests_Canceled: 77,
//         Normal_Winner_Amount: 30000.0,
//         System_Winner_Amount: 0.0,
//         System_Investment: 17099,
//         System_User_PnL: -17099.0,
//         Normal_User_PnL: 12901.0,
//         Bonus_Wallet: 0,
//         Deposit_Wallet: 17099,
//         Winning_Wallet: 0,
//         Discount_Wallet: 0,
//         Amount_Collected: 17099,
//         Total_Commission: 4784.3002,
//         Influencer_Commission: 0.0,
//         Actual_Commission: 4784.3002,
//         status: "NOT STARTED",

//         Profit_Loss: -12901.0
//     },
//     {
//         id: 8,
//         Contest_Category: "Mini League",
//         Total_Contests: 15,
//         Contests_Completed: 5,
//         Contests_Canceled: 10,
//         Normal_Winner_Amount: 5679.0,
//         System_Winner_Amount: 0.0,
//         System_Investment: 0,
//         System_User_PnL: 0.0,
//         Normal_User_PnL: -701.0,
//         Bonus_Wallet: 0,
//         Deposit_Wallet: 2395.8,
//         Winning_Wallet: 3984.18,
//         Discount_Wallet: 0,
//         Amount_Collected: 6380,
//         Total_Commission: 638.0,
//         Influencer_Commission: 95.91,
//         Actual_Commission: 542.09,
//         Profit_Loss: 605.09
//     }
// ];

const defaultColumns: dailyEarningsColumns[] = [
    {
        flex: 0.12,
        field: 'Contest_Category',
        minWidth: 150,
        headerName: 'Contest Category',
        renderCell: ({ row }) => (
            <Typography variant='body2'>{row.Contest_Category}</Typography>
        )
    },
    {
        flex: 0.1,
        field: 'Daily_Contests',
        minWidth: 150,
        headerName: 'Contest ',
        renderCell: ({ row }: CellType) => (
            <Typography variant='body2'>
                <b>Total</b> :{row.Daily_Contests} <br />
                <b>Completed</b> :{row.Daily_Contests_Completed}<br />
                <b>Canceled</b> :{row.Daily_Contests_Canceled}<br />
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
        minWidth: 150,
        headerName: 'Normal User',
        renderCell: ({ row }) => (
            <Typography variant='body2'>
                <b>Investment</b>: {row.Amount_Collected} <br />
                <b>Winning</b>: {row.Normal_Winner_Amount}<br />
                <b>Loss</b>: {row.Normal_User_PnL}<br />
            </Typography>
        )
    },
    {
        flex: 0.12,
        field: 'System_User_PnL',
        minWidth: 150,
        headerName: 'System User',
        renderCell: ({ row }) => (
            <Typography variant='body2'>
                <b>Investment</b>: {row.System_Investment} <br />
                <b>Winning</b>: {row.System_Winner_Amount}<br />
                <b>Profit</b>: {row.System_User_PnL}<br />
            </Typography>
        )
    },
    {
        flex: 0.12,
        field: 'Total_Commission',
        minWidth: 150,
        headerName: 'Commission',
        renderCell: ({ row }) => (
            <Typography variant='body2'>
                <b>Total</b>: {row.Total_Commission} <br />
                <b>Influencer</b>: {row.Influencer_Commission}<br />
                <b>Actual</b>: {row.Actual_Commission}<br />
            </Typography>
        )
    },
    {
        flex: 0.12,
        field: 'Profit_Loss',
        minWidth: 120,
        headerName: 'Profit/Loss',
        renderCell: ({ row }) => (
            <Typography variant='body2' color={row.Profit_Loss >= 0 ? 'green' : 'red'}>
                {row.Profit_Loss}
            </Typography>
        )
    }
];

// const dailyEarningsData = [

//     {
//         id: 1,
//         Contest_Category: "Master Takes All",
//         Daily_Contests: 5003,
//         Daily_Contests_Completed: 1491,
//         Daily_Contests_Canceled: 3512,
//         Deposit_Wallet: 20.75,
//         Winning_Wallet: 276478.26,
//         Deposit: 636875.03,
//         Discount: 0,
//         Investment_1: 913374,
//         Winning_1: 664420.94,
//         Loss_1: 248953.06,
//         Investment_2: 856317,
//         Winning_2: 896723.63,
//         Profit_2: 40406.63,
//         Total: 211050.55,
//         Influencer: 18958.21,
//         Actual: 192092.34,
//         Profit: 223994.85
//     },
//     {
//         id: 2,
//         Contest_Category: "DISCOUNT DHAMAKA",
//         Daily_Contests: 1708,
//         Daily_Contests_Completed: 756,
//         Daily_Contests_Canceled: 952,
//         Bonus: 0,
//         Winning: 139070.34,
//         Deposit: 234027.54,
//         Discount: 337444.38,
//         Investment_1: 710542,
//         Winning_1: 539523.9,
//         Loss_1: 171018.1,
//         Investment_2: 503967,
//         Winning_2: 522305.55,
//         Profit_2: 18338.55,
//         Total: 155540.94,
//         Influencer: 9492.35,
//         Actual: 146448.59,
//         Profit: 161525.75
//     },
//     {
//         id: 3,
//         Contest_Category: "Head to Head",
//         Daily_Contests: 1211,
//         Daily_Contests_Completed: 309,
//         Daily_Contests_Canceled: 902,
//         Bonus: 0,
//         Winning: 45107.47,
//         Deposit: 55235.53,
//         Discount: 0,
//         Investment_1: 97364,
//         Winning_1: 86905,
//         Loss_1: 10459,
//         Investment_2: 37138,
//         Winning_2: 31905,
//         Loss_2: 5233,
//         Total: 18643.79,
//         Influencer: 1965.67,
//         Actual: 16678.12,
//         Profit: 8493.33
//     },
//     {
//         id: 4,
//         Contest_Category: "Contest for Masters",
//         Daily_Contests: 703,
//         Daily_Contests_Completed: 33,
//         Daily_Contests_Canceled: 670,
//         Bonus: 50.7,
//         Winning: 8508.28,
//         Deposit: 1165.02,
//         Discount: 0,
//         Investment_1: 9724,
//         Winning_1: 6536.35,
//         Loss_1: 3187.65,
//         Investment_2: 22250,
//         Winning_2: 21820,
//         Loss_2: 430,
//         Total: 3453.29,
//         Influencer: 92.04,
//         Actual: 3341.25,
//         Profit: 3095.61
//     },
//     {
//         id: 5,
//         Contest_Category: "BONUS DHAMAKA",
//         Daily_Contests: 647,
//         Daily_Contests_Completed: 32,
//         Daily_Contests_Canceled: 615,
//         Bonus: 376.05,
//         Winning: 9517.95,
//         Deposit: 24055.02,
//         Discount: 0,
//         Investment_1: 33949,
//         Winning_1: 27762.5,
//         Loss_1: 6186.5,
//         Investment_2: 30640,
//         Winning_2: 26654.17,
//         Loss_2: 3985.83,
//         Total: 10350.73,
//         Influencer: 855.77,
//         Actual: 9494.96,
//         Profit: 5330.73
//     },
//     {
//         id: 6,
//         Contest_Category: "Paanch Ka Punch",
//         Daily_Contests: 297,
//         Daily_Contests_Completed: 51,
//         Daily_Contests_Canceled: 246,
//         Bonus: 0,
//         Winning: 14649.94,
//         Deposit: 27692.06,
//         Discount: 0,
//         Investment_1: 32332,
//         Winning_1: 29340,
//         Loss_1: 2992,
//         Investment_2: 22356,
//         Winning_2: 18485,
//         Loss_2: 3871,
//         Total: 6828.89,
//         Influencer: 748.75,
//         Actual: 6080.14,
//         Profit: 2243.25
//     },
//     {
//         id: 7,
//         Contest_Category: "Mini League",
//         Daily_Contests: 32,
//         Daily_Contests_Completed: 4,
//         Daily_Contests_Canceled: 28,
//         Bonus: 0,
//         Winning: 2793.98,
//         Deposit: 1206.02,
//         Discount: 0,
//         Investment_1: 4000,
//         Winning_1: 3600.01,
//         Loss_1: 399.99,
//         Investment_2: 0,
//         Winning_2: 0,
//         Profit_2: 0,
//         Total: 400,
//         Influencer: 56.63,
//         Actual: 343.37,
//         Profit: 343.36
//     },

//     {
//         id: 14,
//         Contest_Category: "Total",
//         Daily_Contests: 9634,
//         Daily_Contests_Completed: 2682,
//         Daily_Contests_Canceled: 6952,
//         Bonus: 447.5,
//         Winning: 563209.05,
//         Deposit: 1035398.45,
//         Discount: 337444.38,
//         Investment_1: 1936499,
//         Winning_1: 1464740.18,
//         Loss_1: 471758.82,
//         Investment_2: 1478223,
//         Winning_2: 1526930.01,
//         Profit_2: 48707.01,
//         Total: 665942.62,
//         Influencer: 36771.89,
//         Actual: 629170.73,
//         Profit: 434986.93
//     },
// ]
const dailyEarningsData = [
    {
        id: 1,
        Contest_Category: "Master Takes All",
        Daily_Contests: 5003,
        Daily_Contests_Completed: 1491,
        Daily_Contests_Canceled: 3512,
        Bonus_Wallet: 20.75,
        Winning_Wallet: 276478.26,
        Deposit_Wallet: 636875.03,
        Discount_Wallet: 0,
        Amount_Collected: 913374,
        Normal_Winner_Amount: 664420.94,
        Normal_User_PnL: -248953.06,
        System_Investment: 856317,
        System_Winner_Amount: 896723.63,
        System_User_PnL: 40406.63,
        Total_Commission: 211050.55,
        Influencer_Commission: 18958.21,
        Actual_Commission: 192092.34,
        Profit_Loss: 223994.85
    },
    {
        id: 2,
        Contest_Category: "DISCOUNT DHAMAKA",
        Daily_Contests: 1708,
        Daily_Contests_Completed: 756,
        Daily_Contests_Canceled: 952,
        Bonus_Wallet: 0,
        Winning_Wallet: 139070.34,
        Deposit_Wallet: 234027.54,
        Discount_Wallet: 337444.38,
        Amount_Collected: 710542,
        Normal_Winner_Amount: 539523.9,
        Normal_User_PnL: -171018.1,
        System_Investment: 503967,
        System_Winner_Amount: 522305.55,
        System_User_PnL: 18338.55,
        Total_Commission: 155540.94,
        Influencer_Commission: 9492.35,
        Actual_Commission: 146448.59,
        Profit_Loss: 161525.75
    },
    {
        id: 3,
        Contest_Category: "Head to Head",
        Daily_Contests: 1211,
        Daily_Contests_Completed: 309,
        Daily_Contests_Canceled: 902,
        Bonus_Wallet: 0,
        Winning_Wallet: 45107.47,
        Deposit_Wallet: 55235.53,
        Discount_Wallet: 0,
        Amount_Collected: 97364,
        Normal_Winner_Amount: 86905,
        Normal_User_PnL: -10459,
        System_Investment: 37138,
        System_Winner_Amount: 31905,
        System_User_PnL: -5233,
        Total_Commission: 18643.79,
        Influencer_Commission: 1965.67,
        Actual_Commission: 16678.12,
        Profit_Loss: 8493.33
    },
    {
        id: 4,
        Contest_Category: "Contest for Masters",
        Daily_Contests: 703,
        Daily_Contests_Completed: 33,
        Daily_Contests_Canceled: 670,
        Bonus_Wallet: 50.7,
        Winning_Wallet: 8508.28,
        Deposit_Wallet: 1165.02,
        Discount_Wallet: 0,
        Amount_Collected: 9724,
        Normal_Winner_Amount: 6536.35,
        Normal_User_PnL: -3187.65,
        System_Investment: 22250,
        System_Winner_Amount: 21820,
        System_User_PnL: -430,
        Total_Commission: 3453.29,
        Influencer_Commission: 92.04,
        Actual_Commission: 3341.25,
        Profit_Loss: 3095.61
    },
    {
        id: 5,
        Contest_Category: "BONUS DHAMAKA",
        Daily_Contests: 647,
        Daily_Contests_Completed: 32,
        Daily_Contests_Canceled: 615,
        Bonus_Wallet: 376.05,
        Winning_Wallet: 9517.95,
        Deposit_Wallet: 24055.02,
        Discount_Wallet: 0,
        Amount_Collected: 33949,
        Normal_Winner_Amount: 27762.5,
        Normal_User_PnL: -6186.5,
        System_Investment: 30640,
        System_Winner_Amount: 26654.17,
        System_User_PnL: -3985.83,
        Total_Commission: 10350.73,
        Influencer_Commission: 855.77,
        Actual_Commission: 9494.96,
        Profit_Loss: 5330.73
    },
    {
        id: 6,
        Contest_Category: "Paanch Ka Punch",
        Daily_Contests: 297,
        Daily_Contests_Completed: 51,
        Daily_Contests_Canceled: 246,
        Bonus_Wallet: 0,
        Winning_Wallet: 14649.94,
        Deposit_Wallet: 27692.06,
        Discount_Wallet: 0,
        Amount_Collected: 32332,
        Normal_Winner_Amount: 29340,
        Normal_User_PnL: -2992,
        System_Investment: 22356,
        System_Winner_Amount: 18485,
        System_User_PnL: -3871,
        Total_Commission: 6828.89,
        Influencer_Commission: 748.75,
        Actual_Commission: 6080.14,
        Profit_Loss: 2243.25
    },
    {
        id: 7,
        Contest_Category: "Mini League",
        Daily_Contests: 32,
        Daily_Contests_Completed: 4,
        Daily_Contests_Canceled: 28,
        Bonus_Wallet: 0,
        Winning_Wallet: 2793.98,
        Deposit_Wallet: 1206.02,
        Discount_Wallet: 0,
        Amount_Collected: 4000,
        Normal_Winner_Amount: 3600.01,
        Normal_User_PnL: -399.99,
        System_Investment: 0,
        System_Winner_Amount: 0,
        System_User_PnL: 0,
        Total_Commission: 400,
        Influencer_Commission: 56.63,
        Actual_Commission: 343.37,
        Profit_Loss: 343.36
    },
    {
        id: 14,
        Contest_Category: "Total",
        Daily_Contests: 9634,
        Daily_Contests_Completed: 2682,
        Daily_Contests_Canceled: 6952,
        Bonus_Wallet: 447.5,
        Winning_Wallet: 563209.05,
        Deposit_Wallet: 1035398.45,
        Discount_Wallet: 337444.38,
        Amount_Collected: 1936499,
        Normal_Winner_Amount: 1464740.18,
        Normal_User_PnL: -471758.82,
        System_Investment: 1478223,
        System_Winner_Amount: 1526930.01,
        System_User_PnL: 48707.01,
        Total_Commission: 665942.62,
        Influencer_Commission: 36771.89,
        Actual_Commission: 629170.73,
        Profit_Loss: 434986.93
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
                            rows={dailyEarningsData}
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


