// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

interface DataType {
  title: string
  imgAlt: string
  icon: string
  subtitle: string
  imgWidth: number
  imgHeight: number
  avatarColor: ThemeColor
}



const AnalyticsNewUserCard = (data: any) => {
  return (
    <Card>
      <CardHeader
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(1.5)} !important` }}>
        {data?.analytics.length > 0 && data.analytics?.map((item: DataType, index: number) => {

          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: index !== data.length - 1 ? 4 : undefined
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomAvatar
                  variant='rounded'
                  color={item.avatarColor}
                  sx={{ mr: 3, boxShadow: 3, width: 44, height: 44, '& svg': { fontSize: '1.75rem' } }}
                >
                  {item.icon}
                </CustomAvatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h6'>{item.title}</Typography>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default AnalyticsNewUserCard
