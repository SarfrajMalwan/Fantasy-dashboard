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
import useCouponStore, { Coupon } from "src/features/coupons/coupon.service";
import { ChipStyle } from "../cricket/private";

interface CellType {
  row: Coupon
}

let page_title = "Coupons";



type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof Coupon }
// ** Styled component for the link in the dataTable



const defaultColumns: PlanListColumn[] = [
  {
    flex: 0.02,
    field: 'id',
    minWidth: 70,
    headerName: 'Id',
    renderCell: ({ row }: CellType) => (
      <Icon icon='mdi:content-copy' fontSize={20} cursor={'pointer'} onClick={() => Copy(row.id + '')} />
    ),
  },
  {
    flex: 0.07,
    minWidth: 70,
    field: 'code',
    headerName: 'Coupon Code',
    editable: false,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.code}</Typography>,
  },
  // {
  //   flex: 0.07,
  //   minWidth: 70,
  //   field: 'bonus_percentage',
  //   headerName: 'Bonus Percentage',
  //   editable: false,
  //   renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.bonus_percentage}</Typography>,
  // },


  {
    flex: 0.07,
    minWidth: 70,
    field: 'min_amount',
    headerName: 'Min Amount',
    editable: false,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.min_amount}</Typography>,
  },
  {
    flex: 0.07,
    minWidth: 120,
    field: 'max_cashback',
    headerName: 'Max Cashback',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.max_cashback}</Typography>,
  },
  {
    flex: 0.07,
    minWidth: 70,
    field: 'cashback_percentage',
    headerName: 'Cashback Percentage',
    editable: false,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.cashback_percentage}%</Typography>,
  },

  {
    flex: 0.07,
    minWidth: 70,
    field: 'usage_limit',
    headerName: 'Usages Limit',
    editable: false,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.usage_limit}</Typography>,
  },
  {
    flex: 0.07,
    minWidth: 120,
    field: 'limit_per_user',
    headerName: 'Limit Per User',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.limit_per_user}</Typography>,
  },
  {
    flex: 0.07,
    minWidth: 120,
    field: 'expire_at',
    headerName: 'Expire At',
    editable: true,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.expire_at}</Typography>,
  },
  {
    flex: 0.04,
    minWidth: 70,
    field: 'is_active',
    headerName: 'Active',
    editable: false,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>
      <ChipStyle label={row?.is_active ? 'Yes' : 'No'} variant="outlined"></ChipStyle>
    </Typography>,
  },

  {
    flex: 0.07,
    minWidth: 70,
    field: 'wallet_type',
    headerName: 'Wallet Type',
    editable: false,
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.wallet_type}</Typography>,
  },
]



const Index = ({ read, write, update, del }: GlobalProps) => {


  // ** State
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const router = useRouter();
  const store = useCouponStore()
  // const [cipboard, setClipBoard] = useState<Array<string>>([])
  useEffect(() => {
    if (!router.isReady) return
    const init = async () => {
      store.get.paginate({ per_page: 0, page: 1 })
    }
    init()
  }, [])

  const [searchValue, setSearchValue] = useState<string>('')

  const schema = yup.object().shape({
    code: yup.string().label('Code').required().test(
      'isValidCode',
      'Code should be "test"',
      (value) => value === 'test'
    ),
    min_amount: yup.number().label('Min Amount').required().min(0),
    max_amount: yup.number().label('Max Amount').required().min(yup.ref('min_amount')),
    max_cashback: yup.number().label('Max Cashback').required().min(0),
    wallet_type: yup.string().label('Wallet Type').required().oneOf(['MAIN', 'OTHER']),
    cashback_percentage: yup.number().label('Cashback Percentage').required().min(0),
    usage_limit: yup.number().label('Usage Limit').required().min(0),
    limit_per_user: yup.number().label('Limit Per User').required().min(0),
    expire_at: yup.date().label('Expire At').required().min(new Date()),
    is_active: yup.boolean().label('Is Active').required(),
  });

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
      flex: 0.08,
      minWidth: 90,
      field: 'Action',
      headerName: 'Actions',
      editable: false,

      renderCell: ({ row }: CellType) => <Typography variant='body2' sx={{ textAlign: 'center', cursor: 'pointer' }}> <Tooltip title="Edit" placement="bottom" onClick={() => {
        handleEditClickOpen()
        store.select(row?.id)
      }}><Icon icon='mdi:pencil' fontSize={24} /></Tooltip>
        <Tooltip title="Remove" placement="bottom" onClick={() => {
          handleEditClickOpen()
          store.select(row?.id)
        }}

        >
          <Icon icon='mdi:delete' fontSize={24} />
        </Tooltip>
      </Typography>
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
                  <Button variant='outlined' onClick={() => handleEditClickOpen(true)}>Add {page_title}</Button>
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

