import { Box, Card, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { useEffect } from "react";
// import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";
import { Icon } from '@iconify/react';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import useGstStore, { GstInfo } from "src/features/gst-info/gst.services";
import moment from "moment";

interface CellType {
  row: GstInfo
}

let page_title = "GST INFO";



type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof GstInfo }

const defaultColumns: PlanListColumn[] = [
  {
    flex: 0.3,
    minWidth: 90,
    field: 'id',
    headerName: 'Id',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' >
      {row?.id}
    </Typography>
  },

  {
    flex: 0.5,
    minWidth: 90,
    field: 'user',
    headerName: 'User',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' >
      {row?.user?.name}
    </Typography>
  },

  {
    flex: 0.4,
    minWidth: 90,
    field: 'actual_deposite_amt',
    headerName: 'Deposited Amount',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.actual_deposite_amt}</Typography>
  },
  {
    flex: 0.4,
    minWidth: 90,
    field: 'gst',
    headerName: 'Gst',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.gst}</Typography>
  },
  {
    flex: 0.4,
    minWidth: 90,
    field: 'created_at',
    headerName: 'Date',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{moment(row?.created_at).format('YYYY-MM-DD HH:mm:ss')}</Typography>
  },



]



const Index = ({ read, write, update, del }: GlobalProps) => {



  const router = useRouter();
  const store = useGstStore()

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

              rows={store?.gst?.list}
              columns={columns}
              disableRowSelectionOnClick
              rowCount={store.gst?.total}
              paginationMode='server'
              pageSizeOptions={[15, 25, 50, 100]}
              paginationModel={{
                page: store.gst.page - 1,
                pageSize: store.gst?.per_page
              }}
              onPaginationModelChange={({ page, pageSize }) => {
                if (page == store.gst.page - 1 && pageSize == store.gst.per_page) return
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




