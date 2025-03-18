import { styled } from '@mui/material/styles';
import { Box, Card, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
// import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";
import { Icon } from '@iconify/react';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar';
import useInfluencerStore, { Influencers } from 'src/features/influencer/influencer.services';
import { Copy, LinkStyled } from 'src/pages/apps/users/list';

interface CellType {
  row: Influencers
}

let page_title = "Influencer Details";



type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof Influencers }
// ** Styled component for the link in the dataTable


const IconSpan = styled('span')(({ theme }) => ({
  color: theme?.palette?.primary.main,
  position: 'relative',
  top: '3px',
  left: '2px',
  cursor: 'pointer'
}))




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
    flex: 0.7,
    minWidth: 90,
    field: 'email',
    headerName: 'User',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' >
      {row?.username}
      <br />
      {row?.email}

    </Typography>
  },



  {
    flex: 1,
    minWidth: 80,
    field: 'fixture_meta_data',
    headerName: 'Match Name',
    editable: true,
    renderCell: ({ row }: CellType) => {
      const fixtureMetaData = JSON.parse(row.fixture_meta_data || '{}' as any)
      return (
        <Typography variant='body2'>{fixtureMetaData?.teama} VS {fixtureMetaData?.teamb}</Typography>

      )
    }
  },


  {
    flex: 0.4,
    minWidth: 90,
    field: 'contest_meta_data',
    headerName: 'Entry fee',
    editable: true,
    renderCell: ({ row }: CellType) => {
      const contest_parse_data = JSON.parse(row.contest_meta_data || '{}' as any)
      return (
        <Typography variant='body2'>{contest_parse_data.entry_fee}</Typography>
      )
    }
  },
  {
    flex: 0.4,
    minWidth: 90,
    field: 'amount',
    headerName: 'Amount Received',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.amount}</Typography>
  },

  // {
  //   flex: 0.07,
  //   minWidth: 90,
  //   field: 'created_at',
  //   headerName: 'Created At',
  //   editable: true,
  //   renderCell: ({ row }: CellType) => <Typography variant='body2'>{moment(row?.created_at).format('DD MMM hh:mm A')}</Typography>
  // },

]



const Index = ({ read, write, update, del }: GlobalProps) => {


  // ** State
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const router = useRouter();
  const { id } = router.query
  const store = useInfluencerStore()
  const [cipboard, setClipBoard] = useState<Array<string>>([])
  useEffect(() => {
    if (!router.isReady) return
    const init = async (id: any) => {
      store.get.detail({ per_page: 0, page: 1, influencerId: id })
    }

    if (id) {
      init(id)
    }

  }, [])

  const [searchValue, setSearchValue] = useState<string>('')

  const handleSearch = (value: string) => {
    setSearchValue(value)
    store.get.paginate({ search: value })
  }




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
              rowHeight={70}
              // autoHeight
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

