import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
// import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";
import { Icon } from '@iconify/react';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SchemaForm from 'src/helpers/SchemaForm';
import { Copy } from '../users/list';
import useSubAdminStore, { SubAdmin } from "src/features/sub-admin/subadmin.service";

interface CellType {
  row: SubAdmin
}

let page_title = "Sub Admin Create";



type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof SubAdmin }
// ** Styled component for the link in the dataTable



const defaultColumns: PlanListColumn[] = [
  {
    flex: 0.02,
    field: 'id',
    minWidth: 70,
    headerName: 'Id',
    renderCell: ({ row }: CellType) => (
      <Icon icon='mdi:content-copy' fontSize={20} cursor={'pointer'} onClick={() => {
        Copy(row.id + '')
      }} />
    )
  },

  {
    flex: 0.07,
    minWidth: 90,
    field: 'name',
    headerName: 'Name',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.name}</Typography>
  },
  {
    flex: 0.07,
    minWidth: 90,
    field: 'email',
    headerName: 'Email',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.email}</Typography>
  },
  {
    flex: 0.07,
    minWidth: 90,
    field: 'pin',
    headerName: 'pin',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.pin}</Typography>
  },
  {
    flex: 0.07,
    minWidth: 90,
    field: 'role_id',
    headerName: 'role_id',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.role_id}</Typography>
  },


]



const Index = ({ read, write, update, del }: GlobalProps) => {


  // ** State
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const router = useRouter();
  const store = useSubAdminStore()
  const [cipboard, setClipBoard] = useState<Array<string>>([])
  useEffect(() => {
    if (!router.isReady) return
    const init = async () => {
      store.get.paginate({ per_page: 0, page: 1 })
    }
    init()
  }, [])

  const [searchValue, setSearchValue] = useState<string>('')

  const schema = yup.object().shape({
    name: yup.string().label('Name').required(),
    email: yup.string().label('Email').meta({ type: 'email' }).required(),
    password: yup.string().label('Password').meta({ type: 'password' }).required(),
    pin: yup.number().label('Pin').required(),

  })
  const defaultValues = schema.getDefault()

  const onSubmit = async () => {
    console.log('submitting')
    const bodyData = getValues()
    console.log(bodyData)
    // await store.add(bodyData)
    handleEditClose()
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    store.get.paginate({ search: value })
  }

  const editSchema = yup.object().shape({
    password: yup.string().label('Password').meta({ type: 'password' }).required(),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })


  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.07,
      minWidth: 90,
      field: 'Action',
      headerName: 'Actions',
      editable: true,

      renderCell: ({ row }: CellType) => <Typography variant='body2' sx={{ textAlign: 'center', cursor: 'pointer' }}> <Tooltip title="Edit" placement="bottom" onClick={() => {
        handleEditClickOpen()
        store.select(row?.id)
      }}><Icon icon='mdi:pencil' fontSize={24} /></Tooltip></Typography>
    },


  ]

  // ** Handle Edit dialog
  const handleEditClickOpen = (doReset?: boolean) => {

    if (doReset) {
      reset()
      store.select(null)
    }
    setOpenEdit(true)
  }
  const handleEditClose = () => setOpenEdit(false)



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
                  <Icon icon='mdi:trophy' fontSize={22} />
                  <Typography variant="h5" component="h4">
                    {page_title}
                  </Typography>
                </Grid>
                <Grid item xs={2.5} alignContent={'flex-end'}>
                  <Button variant='outlined' onClick={() => handleEditClickOpen(true)}>Add Sub Admin</Button>
                </Grid>
              </Grid>
            </Box>

            <DataGrid
              style={{ overflow: 'auto', height: '750px' }}
              rowHeight={70}
              // autoHeight
              pagination
              rows={store.contest.list}
              columns={columns}
              rowCount={store.contest?.total}
              paginationMode='server'
              pageSizeOptions={[15, 25, 50, 100]}
              paginationModel={{
                page: store.contest.page - 1,
                pageSize: store.contest?.per_page
              }}
              onPaginationModelChange={({ page, pageSize }) => {
                if (page == store.contest.page - 1 && pageSize == store.contest.per_page) return
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

      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='user-view-edit'
        aria-describedby='user-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      >
        <DialogTitle
          id='user-view-edit'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          {store.contest?.id ? 'Edit' : 'Create'} {page_title}
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <DialogContentText
            variant='body2'
            id='user-view-edit-description'
            sx={{ textAlign: 'center', mb: 7 }}
          ></DialogContentText>

          <SchemaForm
            describedSchema={store.contest.id ? editSchema.describe() : schema.describe()}
            onSubmit={onSubmit}
            isDialog={true}
            gx={12}
          />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={onSubmit}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleEditClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>


    </DatePickerWrapper>
  )
}

export default Index

