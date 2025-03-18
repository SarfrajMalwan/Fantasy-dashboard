// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
// import AnalyticsTable from 'src/views/dashboards/analytics/AnalyticsTable'
// import AnalyticsWeeklyOverview from 'src/views/dashboards/analytics/AnalyticsWeeklyOverview'
import { useEffect } from 'react'
import useDashboard from 'src/features/analytics/analytics.service'
import AnalyticsTrophyCard from 'src/views/dashboards/analytics/AnalyticsTrophyCard'
import AnalyticsTransactionsCard from 'src/views/dashboards/analytics/AnaticsTranscationCard'
import AnalyticsTotalEarningCard from 'src/views/dashboards/analytics/AnalyticsTotalEarningCard'
import CardStatisticsVerticalComponent from 'src/views/dashboards/analytics/CardStatisticsVerticalComponent'
import { Icon } from '@iconify/react'
import AnalyticsNewUserCard from 'src/views/dashboards/analytics/AnalyticsNewUser'
import { toIndianNumberSystem } from 'src/helpers/IndianNoConvertor'

const AnalyticsDashboard = () => {

  const store = useDashboard()


  useEffect(() => {

    const init = async () => {
      await store.get.list()
    }
    init()

  }, [])



  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <AnalyticsTrophyCard
            total_users={toIndianNumberSystem(store?.analytics?.data?.total_users)}

          />
        </Grid>
        <Grid item xs={12} md={8}>
          <AnalyticsTransactionsCard transaction={[
            {
              stats: store?.analytics.data?.todayWithdrawal,
              title: 'Today Withdrawls',
              color: 'primary',
              icon: <Icon icon='mdi:cash-multiple' />
            },
            {
              stats: store?.analytics.data?.today_deposit,
              title: 'Today Deposit',
              color: 'success',
              icon: <Icon icon='mdi:cash' />
            },
            ,
            {
              stats: store?.analytics.data?.month_withdraw,
              title: 'Month Withdrawl',
              color: 'warning',
              icon: <Icon icon='mdi:cash-multiple' />
            },
            {
              stats: store?.analytics.data?.month_deposit,
              title: 'Month Deposit',
              color: 'info',
              icon: <Icon icon='mdi:cash' />
            }
          ]}
            title={'Total Withdraw Request ' + store?.analytics.data?.withdrawal_requests}
          />
        </Grid>


        <Grid item xs={12} md={6} lg={4} >
          <AnalyticsTotalEarningCard
            depositWallet={" ₹ " + toIndianNumberSystem(store?.analytics?.data?.depositWallet)}
            monthTds={store?.analytics?.data?.monthTds}
            title={'Deposit Wallet'}
          />
          <Grid container xs={12} columnSpacing={3} >
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={" + ₹ " + toIndianNumberSystem(store?.analytics?.data?.month_deposit)}
                icon={<Icon icon='mdi:cash' />}
                color='success'
                trendNumber=''
                title='Month Deposit'
                subtitle=''
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={" + ₹ " + toIndianNumberSystem(store?.analytics.data?.today_deposit)}
                icon={<Icon icon='mdi:cash' />}
                color='success'
                trendNumber=''
                title='Today Deposit'
                subtitle=''
              />
            </Grid>
          </Grid>


        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={4}>
            {/* <Grid item xs={6}>
              <AnalyticsTotalProfit />
            </Grid> */}
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={" ₹ " + toIndianNumberSystem(store?.analytics.data?.cashBonusWallet)}
                icon={<Icon icon='mdi:wallet-outline' />}
                color='info'
                trendNumber=''
                title='Cash Bonus Wallet'
                subtitle=''
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={" ₹ " + toIndianNumberSystem(store?.analytics.data?.winningWallet)}
                icon={<Icon icon='mdi:wallet-outline' />}
                color='info'
                trendNumber=''
                title='Winning Wallet'
                subtitle=''
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={" " + toIndianNumberSystem(store?.analytics.data?.verified_users)}
                icon={<Icon icon='mdi:account' />}
                color='secondary'
                trendNumber=''
                title='Verified Users'
                subtitle=''
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={" " + toIndianNumberSystem(store?.analytics.data?.unverified_users)}
                icon={<Icon icon='mdi:account-alert' />}
                color='secondary'
                trendNumber=''
                title='Unverified Users'
                subtitle=''
              />
            </Grid>
          </Grid>

        </Grid>



        <Grid item xs={12} md={6} lg={4} >
          <AnalyticsTotalEarningCard
            depositWallet={" " + toIndianNumberSystem(store?.analytics?.data?.active_contests)}
            monthTds={false}
            title={'Active Contest'}
          />
          <Grid container xs={12} columnSpacing={3} >
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={"" + store?.analytics.data?.inactive_contests}
                icon={<Icon icon='mdi:gamepad-square-outline' />}
                color='error'
                trendNumber=''
                title='Inactive Contest'
                subtitle=''
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={" " + store?.analytics.data?.today_joined_contests}
                icon={<Icon icon='mdi:gamepad-square-outline' />}
                color='error'
                trendNumber=''
                title='Today Joined Contests'
                subtitle=''
              />
            </Grid>
          </Grid>


        </Grid>


        {/* new user and Infulancers */}
        <Grid item xs={6}>
          <AnalyticsNewUserCard
            // title={}
            analytics={[
              {
                imgWidth: 22,
                imgHeight: 20,
                title: store.analytics?.data?.new_users,
                avatarColor: 'primary',
                subtitle: 'New User',
                icon: <Icon icon='mdi:account-plus' />
              },
              {
                imgWidth: 20,
                imgHeight: 21,
                title: store.analytics?.data?.unverifiedAadhaar,
                avatarColor: 'warning',
                subtitle: 'Unverified Aadhar Users',
                icon: <Icon icon='mdi:account-question-outline' />
              },
              {
                imgWidth: 20,
                title: store.analytics?.data?.total_Infulancer,
                imgHeight: 19,
                avatarColor: 'info',
                subtitle: 'Total Infulancers',
                icon: <Icon icon='mdi:account-group' />
              },
              // {
              //   imgWidth: 20,
              //   imgHeight: 20,
              //   title: '389.50k',
              //   avatarColor: 'success',
              //   subtitle: 'Number of Visits',
              //   icon: <Icon icon='mdi:cash' />
              // }
            ]}
          />
        </Grid>



      </Grid>
    </ApexChartWrapper >
  )
}

AnalyticsDashboard.moduleId = 2
AnalyticsDashboard.gameIds = [1, 2]





export default AnalyticsDashboard





// const DashboardStatsCard = (data: any) => {
//   return (
//     <>
//       <Card sx={{ overflow: 'visible', position: 'relative' }}>
//         <CardContent>
//           <Typography sx={{ mb: 6.5, fontWeight: 600 }}>{data?.title}</Typography>
//           <Box sx={{ mb: 1.5, rowGap: 1, width: '55%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
//             <Typography variant='h5' sx={{ mr: 1.5 }}>
//               {data?.stats}
//             </Typography>
//             <Typography
//               component='sup'
//               variant='caption'
//             >

//             </Typography>
//           </Box>

//           {/* <Img src={src} alt={title} /> */}
//         </CardContent>
//       </Card>
//     </>
//   )
// }
