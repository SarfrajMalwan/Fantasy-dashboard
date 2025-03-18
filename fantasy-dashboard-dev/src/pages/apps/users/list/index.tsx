import { styled } from '@mui/material/styles';
import { Box, Card, Chip, Grid, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import userStore, { User } from "src/features/users/user.services";
// import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";
import { Icon } from '@iconify/react';
import { auto } from '@popperjs/core';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar';
import moment from 'moment';
import clipboardCopy from 'clipboard-copy';
import toast from 'react-hot-toast';


interface CellType {
  row: User
}

let page_title = "Users List"



type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof User }
// ** Styled component for the link in the dataTable
export const LinkStyled = styled('span')(({ theme }) => ({
  position: 'relative',
  right: '15px',
  width: '3.5px',
  height: '96%',
  borderRadius: '4px',
  background: theme.palette.primary.main,
}))

const IconSpan = styled('span')(({ theme }) => ({
  color: theme?.palette?.primary.main,
  position: 'relative',
  top: '3px',
  left: '2px',
  cursor: 'pointer'
}))



export const Copy = async (text: string) => {
  try {
    await clipboardCopy(text);
    toast.success(text + ' Copied');
  } catch (err) {
    console.error('Failed to copy text to clipboard:', err);
  }
};

const defaultColumns: PlanListColumn[] = [
  {
    flex: 0.02,
    field: 'id',
    minWidth: 70,
    headerName: 'Id',
    renderCell: ({ row }: CellType) => (

      <>
        {row.is_sys_user && <LinkStyled />}
        <Icon icon='mdi:content-copy' fontSize={20} cursor={'pointer'} onClick={() => {
          Copy(row.id + '')
        }} />
      </>

    )
  },
  {
    flex: 0.14,
    minWidth: 90,
    field: 'email',
    headerName: 'User',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' >
      {row?.email}
      <IconSpan >{row.email_verified && <Tooltip title="Verified" placement="bottom"><Icon icon='mdi:check-decagram' /></Tooltip>}</IconSpan>
      <br />
      {row.phone}

      <IconSpan >{row.phone_verified && <Tooltip title="Verified" placement="bottom"><Icon icon='mdi:check-decagram' /></Tooltip>}</ IconSpan>
    </Typography>
  },

  {
    flex: 0.05,
    minWidth: 90,
    field: 'username',
    headerName: 'userName',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.username}</Typography>
  },

  {
    flex: 0.05,
    minWidth: 90,
    field: 'document_verified',
    headerName: 'Document Verifiied',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' sx={{ textAlign: 'center', m: auto }}>
      <IconSpan>
        {row.document_verified ?
          <Tooltip title="Verified" placement="bottom">
            <Icon icon='mdi:check-decagram' />
          </Tooltip>
          :
          <Tooltip title="Not Verified" placement="bottom">
            <Icon icon='mdi:alert-circle-outline' fontSize={24} />
          </Tooltip>}
      </IconSpan>
    </Typography >
  },
  {
    flex: 0.08,
    minWidth: 90,
    field: 'is_sys_user',
    headerName: 'User Details',
    editable: true,
    renderCell: ({ row }: CellType) =>
      <Typography variant='body2' sx={{ textAlign: 'center' }}>
        <Chip label={row.promoter_type == '0' ? 'Normal' : 'Promoter'} color="success" variant="outlined" />
      </Typography>


  },


  {
    flex: 0.07,
    minWidth: 90,
    field: 'created_at',
    headerName: 'Signup Date',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{moment(row?.created_at).format('DD MMM hh:mm A')}</Typography>
  },

]



const Index = ({ read, write, update, del }: GlobalProps) => {
  const router = useRouter();
  const store = userStore()
  useEffect(() => {
    if (!router.isReady) return
    const init = async () => {
      store.get.paginate({ per_page: 10, page: 1 })
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
    {
      flex: 0.05,
      minWidth: 90,
      field: 'sendNotification',
      headerName: 'Sent Notifications',
      editable: true,
      renderCell: ({ row }: CellType) => <Typography variant='body2' sx={{ textAlign: 'center', m: auto, cursor: 'pointer' }}> <Tooltip title="Add" placement="bottom"><Icon icon='mdi:bell-plus' fontSize={24} /></Tooltip></Typography>
    },


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

              <Grid item xs={12}>
                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon icon='mdi:account-group-outline' fontSize={22} />
                  <Typography variant="h5" component="h4">
                    {page_title}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <DataGrid
              // style={{ overflow: 'auto', height: '750px' }}
              rowHeight={70}
              autoHeight
              editMode={'false' as any}
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


// {
//   flex: 0.1,
//   minWidth: 180,
//   sortable: false,
//   field: 'actions',
//   headerName: 'Actions',
//   renderCell: ({ row }: any) => (
//     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//       {update && (
//         <Tooltip title={`Edit ${page_title}`}>
//           <IconButton
//             size='small'
//           // onClick={() => {
//           //   // for (let key in defaultValues) {
//           //   //   console.log('row[key]: ', row[key])
//           //   //   setValue(key as any, row[key])
//           //   // }
//           //   handleEditClickOpen(false, row)
//           //   store.select(row?.id)
//           // }}
//           >
//             <Icon icon='mdi:edit-outline' fontSize={20} />
//           </IconButton>
//         </Tooltip>
//       )}
//       {del && (
//         <Tooltip title={`Delete ${page_title}`}>
//           <IconButton
//             size='small'
//           // onClick={() => {
//           //   store.select(row?.id)
//           //   store.delete()
//           // }}
//           >
//             <Icon icon='mdi:delete-outline' fontSize={20} />
//           </IconButton>
//         </Tooltip>
//       )}
//       {row.pre_squad ? (
//         <Tooltip title={`Lineup ${page_title}`}>
//           <IconButton
//             size='small'
//             onClick={() => {
//               router.push(`/apps/matches/lineup/${row?.id}`)
//             }}
//           >
//             <Icon icon='mdi:account-group-outline' fontSize={20} />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title={`Pre-Squad ${page_title}`}>
//           <IconButton
//             size='small'
//             onClick={() => {
//               router.push(`/apps/matches/pre-squad/${row?.id}`)
//             }}
//           >
//             <Icon icon='mdi:parking' fontSize={20} />
//           </IconButton>
//         </Tooltip>
//       )}

//       {row.lineup_announced ? (
//         <Tooltip title={`Start ${page_title}`}>
//           <IconButton
//             size='small'
//             onClick={() => {
//               router.push(`/apps/matches/start/${row?.id}`)
//             }}
//           >
//             <Icon icon='mdi:play' fontSize={20} />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <></>
//       )}
//       {write && (
//         <Tooltip title={`Copy ${page_title}`}>
//           <IconButton
//             size='small'
//           // onClick={() => {
//           //   for (let key in defaultValues) {
//           //     setValue(key as any, row[key])
//           //     handleEditClickOpen()
//           //   }
//           // }}
//           >
//             <Icon icon='mdi:content-copy' fontSize={20} />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Box>
//   )
// }
