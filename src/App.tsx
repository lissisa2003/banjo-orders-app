import { Button, createTheme, ThemeProvider } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import './App.css';
import NewOrderForm from './NewOrderForm';
import { OrderModel } from './Order';
import OrderTable from './OrderTable';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4C6FFF',
    }
  },
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
    button: {
      textTransform: 'capitalize'
    }
  },
});

// Generate Order Data
function createData(teamMember: string, priority: string, orderNo: number, team: string, dueDate: string) {
  return { teamMember, priority, orderNo, team, dueDate };
}

const orders = [
  createData(
    "Robert Fox",
    "High",
    2345,
    "Blue",
    "01/01/2024"
  ),
  createData(
    "Darlene Robertson",
    "Low",
    210735,
    "Red",
    "01/01/2024"
  ),
  createData(
    "Theresa Webb",
    "Medium",
    7452342,
    "Green",
    "01/01/2024"
  ),
  createData(
    "Kristen Watson",
    "Medium",
    54234,
    "Yellow",
    "01/01/2024"
  ),
  createData(
    "Cody Fisher",
    "High",
    765,
    "Blue",
    "01/01/2024"
  ),
  createData(
    "Jane Cooper",
    "Low",
    76982,
    "Green",
    "01/01/2024"
  ),
  createData(
    "Jerome Bell",
    "Low",
    41233,
    "Yellow",
    "01/01/2024"
  ),
  createData(
    "Jenny Wilson",
    "High",
    867567,
    "Red",
    "01/01/2024"
  ),
  createData(
    "Darrell Steward",
    "Medium",
    2345436,
    "Blue",
    "01/01/2024"
  ),
  createData(
    "Savannah Nguyen",
    "Low",
    23452,
    "Green",
    "01/01/2024"
  ),
];

export interface OrderTableProps {
  orders: OrderModel[]
}

export interface NewOrderFormProps {
  id: string;
  keepMounted: boolean;
  value: OrderModel;
  open: boolean;
  onClose: (value?: OrderModel) => void;
}

function App() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({ teamMember: "", priority: "", orderNo: 0, team: "", dueDate: dayjs().add(1, 'day').format('L') } as OrderModel);


  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = (newValue?: OrderModel) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
      orders.push(newValue)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <div className='header'><span className='title'>Orders</span><Button variant='contained' onClick={handleClickOpen}>New Order</Button></div>
        <OrderTable orders={orders} />
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
