import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";
import { Icon } from '@iconify/react';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import useMisReport, { Mis } from 'src/features/mis/mis.services';

interface CellType {
  row: Mis
}

let page_title = "MIS REPORT";



type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof Mis }


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
    flex: 0.7,
    minWidth: 90,
    field: 'Verified_By',
    headerName: 'KYC Verified By',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2' >
      {row?.Verified_By}
    </Typography>
  },


  {
    flex: 0.4,
    minWidth: 90,
    field: 'Adhaar_Count',
    headerName: 'Adhaar Count',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.Adhaar_Count}</Typography>
  },

  {
    flex: 0.4,
    minWidth: 90,
    field: 'Bank_Count',
    headerName: 'Bank Count',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.Bank_Count}</Typography>
  },

]



const Index = ({ read, write, update, del }: GlobalProps) => {


  // ** State
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const router = useRouter();
  const store = useMisReport()
  const [cipboard, setClipBoard] = useState<Array<string>>([])
  useEffect(() => {
    if (!router.isReady) return
    const init = async () => {
      store.get.paginate()
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
              // style={{ overflow: 'auto', height: '750px' }}
              rowHeight={60}
              autoHeight
              rows={store.mis.list}
              columns={columns}
              disableRowSelectionOnClick
              // editMode='row'
              hideFooterPagination
              hideFooter

            />
            <Divider sx={{ my: '0 !important' }} />
            <CustomFooter total={store.mis?.Total} />
          </Card>
        </Grid>
      </Grid >

    </DatePickerWrapper>
  )
}

export default Index



const CustomFooter = (props: any) => {
  return (

    <Grid container spacing={4} sx={{ p: 4 }} >
      <Grid item xs={2}></Grid>
      <Grid item xs={4.7}>Total : </Grid>
      <Grid item xs={2.8}>{props.total?.Bank_Count}</Grid>
      <Grid item xs={2}>{props.total?.Adhaar_Count}</Grid>
    </Grid>
  )
}
