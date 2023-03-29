import { Button, createTheme, ThemeProvider } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import './App.css';
import NewOrderForm from './NewOrderForm';
import { OrderModel } from './Order';
import OrderTable from './OrderTable';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export interface NewOrderFormProps {
  id: string;
  keepMounted: boolean;
  value: OrderModel;
  open: boolean;
  onClose: (value?: OrderModel) => void;
}

function App() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({ teamMember: "", priority: "", orderNo: 0, team: "", dueDate: dayjs().add(1, 'day') } as OrderModel);


  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = (newValue?: OrderModel) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className='header'><span className='title'>Orders</span><Button variant='contained' onClick={handleClickOpen}>New Order</Button></div>
        <OrderTable />
        <NewOrderForm
          id="order-form"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
