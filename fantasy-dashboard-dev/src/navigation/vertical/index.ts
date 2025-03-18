import { useRouter } from 'next/router'
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import useAppUtils from 'src/features/_football/auth_util/auth.util.service'

const can = (moduleId: number, gameIds: number[]) => ({ moduleId, gameIds })

export const commonRoutes = [
  {
    title: 'Dashboards',
    icon: 'mdi:home-outline',
    path: '/dashboards/analytics',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Users',
    icon: 'mdi:user',
    path: '/apps/users/list',
    gameIds: [1, 2],
    moduleId: 1
  },

  {
    title: 'User Transactions',
    icon: 'mdi:currency-rupee',
    path: '/apps/users/transaction',
    gameIds: [1, 2],
    moduleId: 1
  },

  {
    title: 'Contest Earning',
    icon: 'mdi:currency-rupee',
    path: '/apps/contest/earning/list',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Daily Earning',
    icon: 'mdi:currency-rupee',
    path: '/apps/daily/earning/list',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Series Earning',
    icon: 'mdi:currency-rupee',
    path: '/apps/series/earning/list',
    gameIds: [1, 2],
    moduleId: 1
  },

  {
    title: 'User Earning',
    icon: 'mdi:currency-rupee',
    path: '/apps/user/earning/list',
    gameIds: [1, 2],
    moduleId: 1
  },

  {
    title: 'Verification',
    icon: 'mdi:check-decagram',
    path: '/apps/verifications',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Influencers',
    icon: 'mdi:human-greeting-proximity',
    path: '/apps/influencers',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Daily MIS',
    icon: 'mdi:check-decagram',
    path: '/apps/mis-report',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'GST Info',
    icon: 'mdi:currency-usd-off',
    path: '/apps/gst-info',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Leaderboard',
    icon: 'mdi:account-group-outline',
    gameIds: [1, 2],
    moduleId: 1,
    children: [
      {
        title: 'Influencer Leaderboard',
        icon: 'mdi:account-group-outline',
        path: '/apps/leaderboard/influencer',
        ...can(1, [1, 2])
      },
      {
        title: 'Investment Leaderboard',
        icon: 'mdi:account-group-outline',
        path: '/apps/leaderboard/investment',
        ...can(1, [1, 2])
      },
      {
        title: 'Deposit Leaderboard',
        icon: 'mdi:account-group-outline',
        path: '/apps/leaderboard/deposit',
        ...can(1, [1, 2])
      }
    ]
  },
  {
    title: 'Earning Manager',
    icon: 'mdi:cash-multiple',
    gameIds: [1, 2],
    moduleId: 1,
    children: [
      {
        title: 'Cricket Earning Manager',
        icon: 'mdi:cash',
        path: '/apps/earning-manager/cricket',
        ...can(1, [1, 2])
      },
      {
        title: 'Football Earning Manager',
        icon: 'mdi:cash',
        path: '/apps/earning-manager/football',
        ...can(1, [1, 2])
      },
      {
        title: 'Kabadi Earning Manager',
        icon: 'mdi:cash',
        path: '/apps/earning-manager/kabaddi',
        ...can(1, [1, 2])
      },
      {
        title: 'Basketball Earning Manager',
        icon: 'mdi:cash',
        path: '/apps/earning-manager/basketball',
        ...can(1, [1, 2])
      },
      {
        title: 'Baseball Earning Manager',
        icon: 'mdi:cash',
        path: '/apps/earning-manager/baseball',
        ...can(1, [1, 2])
      },
      {
        title: 'Hockey Earning Manager',
        icon: 'mdi:cash',
        path: '/apps/earning-manager/hockey',
        ...can(1, [1, 2])
      }
    ]
  },
  {
    title: 'Contest Categories',
    icon: 'mdi:shape',
    path: '/apps/contest-categories',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Contest Templates',
    icon: 'mdi:invoice-list',
    path: '/apps/contest-template',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Rank Categories',
    icon: 'mdi:trophy',
    path: '/apps/rank-categories',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Cricket',
    icon: 'mdi:cricket',
    gameIds: [1, 2],
    moduleId: 1,
    children: [
      {
        title: 'Private Contasts',
        icon: 'mdi:cricket',
        path: '/apps/cricket/private',
        ...can(1, [1, 2])
      },
      {
        title: 'Competitions',
        icon: 'mdi:cricket',
        path: '/apps/cricket/competitions',
        ...can(1, [1, 2])
      },
      {
        title: 'Fixtures',
        icon: 'mdi:cricket',
        path: '/apps/cricket/fixture',
        ...can(1, [1, 2])
      },
      {
        title: 'Contests',
        icon: 'mdi:cricket',
        path: '/apps/cricket/contest',
        ...can(1, [1, 2])
      },
      {
        title: 'Fantasy Points',
        icon: 'mdi:cricket',
        path: '/apps/cricket/fantasy-point',
        ...can(1, [1, 2])
      },
      {
        title: 'User Teams',
        icon: 'mdi:user',
        path: '/apps/cricket/user-teams',
        ...can(1, [1, 2])
      }
    ]
  },

  {
    title: 'Sub Admin Create',
    icon: 'mdi:account-multiple',
    path: '/apps/sub-admin',
    gameIds: [1, 2],
    moduleId: 1
  },

  {
    title: 'System User',
    icon: 'mdi:robot',
    path: '/apps/system-users',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Referal User',
    icon: 'mdi:cash-fast',
    path: '/apps/referal-users',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Coupons',
    icon: 'mdi:ticket-percent-outline',
    path: '/apps/coupons',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Payments',
    icon: 'mdi:cash-100',
    path: '/apps/payments',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'Withdraw',
    icon: 'mdi:cash-remove',
    path: '/apps/withdraw',
    gameIds: [1, 2],
    moduleId: 1
  },
  {
    title: 'TDS',
    icon: 'mdi:currency-usd-off',
    path: '/apps/tds',
    gameIds: [1, 2],
    moduleId: 1
  }
]

const navigation = (): VerticalNavItemsType => {
  return [...(commonRoutes as any)]
}

export default navigation
