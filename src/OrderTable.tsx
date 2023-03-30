import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
import { OrderTableProps } from './App';
import TablePagination from '@mui/material/TablePagination';
import { Box, IconButton, TableFooter } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

function getIconColor(priority: string): string {
  switch (priority) {
    case 'High':
      return '#F16063'
    case 'Medium':
      return '#F7936F'
    case 'Low':
      return '#66CB9F'
    default:
      return '#F16063'
  }
}


export default function OrderTable(props: OrderTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.orders.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Table size="medium">
      <TableHead>
        <TableRow sx={{ backgroundColor: '#FAFAFB' }}>
          <TableCell sx={{ color: '#8492A6' }}>TEAM MEMBER</TableCell>
          <TableCell sx={{ color: '#8492A6' }}>PRIORITY</TableCell>
          <TableCell sx={{ color: '#8492A6' }}>ORDER NUMBER</TableCell>
          <TableCell sx={{ color: '#8492A6' }}>TEAM</TableCell>
          <TableCell sx={{ color: '#8492A6' }}>DUE DATE</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {(rowsPerPage > 0
            ? props.orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.orders
          ).map((order) => (
          <TableRow key={order.orderNo}>
            <TableCell sx={{ fontWeight: 600 }}>{order.teamMember}</TableCell>
            <TableCell sx={{ display: 'flex', alignItems: 'center', lineHeight: '32px' }}><CircleIcon sx={{ width: '10px', marginRight: '12px', color: getIconColor(order.priority) }} />{order.priority}</TableCell>
            <TableCell >{order.orderNo}</TableCell>
            <TableCell >{order.team}</TableCell>
            <TableCell >{order.dueDate}</TableCell>
            <TableCell ><MoreVertIcon /></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
            colSpan={6}
            count={props.orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                'aria-label': 'rows per page',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
}