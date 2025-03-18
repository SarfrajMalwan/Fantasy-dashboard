import { Box, Card, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
// import ServerSideToolbar from "src/views/table/data-grid/ServerSideToolbar";
import { Icon } from '@iconify/react';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar';
import usePaymentStore, { PaymentData } from 'src/features/users/user.transaction';
import { Copy } from '../list';


interface CellType {
  row: PaymentData
}

let page_title = "Users Transaction Related";


const transactionList = [
  {
    "id": "f2a7d8d7-8013-4c95-9cf4-a494ffe6a13a",
    "User_Type": "Normal User",
    "Email": "at3129678@gmail.com",
    "Username": "at312373",
    "Phone": "8928985570",
    "PaymentType": "WTD",
    "Amount": "176.00",
    "description": "SELF TRANSFERED BY YOU USINadfa adsf asd faf adsf asd fasdf asdfasdf a a asfasdfadsf THIS COUPON REDEPOSIT and CASHBACK OF 5 done by self",
    "CurrentBalance": "378.00",
    "OpeningBalance": "399.00",
    "ClosingBalance": "404",
    "PaymentDate": "2025-03-10 23:53:57"
  },
  {
    "id": "f3db7e31-5788-4fbf-80a3-e22d06c87572",
    "User_Type": "Normal User",
    "Email": "kathatrajjak81@gmail.com",
    "Username": "kath7317",
    "Phone": "7878042327",
    "PaymentType": "WTD",
    "Amount": "100.00",
    "description": "SELF TRANSFERED BY YOU USING THIS COUPON REDEPOSIT and CASHBACK OF 3 done by self",
    "CurrentBalance": "204.08",
    "OpeningBalance": "206.08",
    "ClosingBalance": "209.09",
    "PaymentDate": "2025-03-10 23:52:43"
  },
  {
    "id": "ae65cdbf-44c3-4a89-9b1d-7a3734afee32",
    "User_Type": "Normal User",
    "Email": "anant7006@gmail.com",
    "Username": "Alone",
    "Phone": "8827793289",
    "PaymentType": "WTD",
    "Amount": "1063.00",
    "description": "SELF TRANSFERED BY YOU USING THIS COUPON REDEPOSIT and CASHBACK OF 31 done by self",
    "CurrentBalance": "2635.88",
    "OpeningBalance": "3691.88",
    "ClosingBalance": "1340.29",
    "PaymentDate": "2025-03-10 23:52:03"
  },
  {
    "id": "757420ad-4ac7-4eae-8ebc-7cf55456aa97",
    "User_Type": "Normal User",
    "Email": "jeewak.vas@gmail.com",
    "Username": "JKJWIN",
    "Phone": "9557580533",
    "PaymentType": "WTD",
    "Amount": "980.00",
    "description": "SELF TRANSFERED BY YOU USING THIS COUPON REDEPOSIT and CASHBACK OF 29 done by self",
    "CurrentBalance": "1020.60",
    "OpeningBalance": "1010.60",
    "ClosingBalance": "1039.9",
    "PaymentDate": "2025-03-10 23:51:04"
  },
  {
    "id": "7dac9c79-633a-4892-b693-894a5db584a0",
    "User_Type": "Normal User",
    "Email": "Sakshamdwivedi000@gmail.com",
    "Username": "Saksham0987",
    "Phone": "7208285382",
    "PaymentType": "WTD",
    "Amount": "2750.00",
    "description": "SELF TRANSFERED BY YOU USING THIS COUPON REDEPOSIT and CASHBACK OF 82 done by self",
    "CurrentBalance": "20653.72",
    "OpeningBalance": "31121.72",
    "ClosingBalance": "19803.4",
    "PaymentDate": "2025-03-10 23:49:58"
  }
]




type PlanListColumn = Omit<GridColDef, 'field'> & { field: keyof PaymentData }



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
    flex: 0.25,
    minWidth: 90,
    field: 'Email',
    headerName: 'User',
    renderCell: ({ row }: CellType) => <Typography variant='body2' >
      {row?.Email}
      <br />
      {row.Phone}
      <br />
      {row.User_Type}
    </Typography>
  },

  {
    flex: 0.1,
    minWidth: 90,
    field: 'Username',
    headerName: 'userName',
    renderCell: ({ row }: CellType) => <b>{row.Username}</b>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'PaymentType',
    headerName: 'Payment Type',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.PaymentType}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'Amount',
    headerName: 'Amount',
    renderCell: ({ row }: CellType) => <b>{row.Amount}</b>
  },
  {
    flex: 0.2,
    minWidth: 90,
    field: 'ClosingBalance',
    headerName: 'Transactions',
    renderCell: ({ row }: CellType) => <Typography variant='body2' className="wb" >
      Opening : {row.OpeningBalance}
      <br />
      Closing : {row.ClosingBalance}
    </Typography>
  },

  {
    flex: 0.5,
    minWidth: 90,
    field: 'description',
    headerName: 'Description',
    renderCell: ({ row }: CellType) => <Typography variant='body2' className="wb">{row.description}</Typography>
  },

  {
    flex: 0.1,
    minWidth: 70,
    field: 'CurrentBalance',
    headerName: 'Current Balance',
    renderCell: ({ row }: CellType) => <b>{row.CurrentBalance}</b>
  },

  {
    flex: 0.2,
    minWidth: 90,
    field: 'PaymentDate',
    headerName: 'Payment Date',
    renderCell: ({ row }: CellType) => <Typography variant='body2' className="wb">{row.PaymentDate}</Typography>
  },

  {
    flex: 0.2,
    minWidth: 90,
    field: 'OpeningBalance',
    headerName: 'Payment Date',
    renderCell: ({ row }: CellType) => <Typography variant='body2' className="wb">{row.OpeningBalance}</Typography>
  },





]



const Index = ({ read, write, update, del }: GlobalProps) => {
  const router = useRouter();
  const store = usePaymentStore()
  useEffect(() => {
    if (!router.isReady) return
    const init = async () => {
      store.get.paginate({ per_page: 0, page: 1 })
    }
    init()
  }, [])

  const [searchValue, setSearchValue] = useState<string>('')

  const handleSearch = (value: string) => {
    if (searchValue == value) return
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

              <Grid item xs={12}>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon icon='mdi:account-group-outline' fontSize={22} />
                  <Typography variant="h5" component="h4">
                    {page_title}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <DataGrid
              rowHeight={130}
              autoHeight
              pagination
              rows={transactionList}
              columns={columns}
              rowCount={store.pay?.total}
              paginationMode="server"
              pageSizeOptions={[15, 25, 50, 100]}
              paginationModel={{
                page: store.pay.page - 1,
                pageSize: store.pay?.per_page,
              }}
              onPaginationModelChange={({ page, pageSize }) => {
                if (page == store.pay.page - 1 && pageSize == store.pay.per_page) return;
                store.get.paginate({ page: page + 1, per_page: pageSize });

                router.push(
                  {
                    pathname: router.pathname,
                    query: { page: page + 1, size: pageSize },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
              disableRowSelectionOnClick
              editMode="row"
              sx={{
                minWidth: '100%',

              }}
            />

          </Card>
        </Grid>
      </Grid >
    </DatePickerWrapper>
  )
}

export default Index

