import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
import { OrderTableProps } from './App';



function getIconColor(priority: string): string {
  switch (priority){
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
  return (
      <Table size="medium">
        <TableHead>
          <TableRow sx={{backgroundColor: '#FAFAFB'}}>
            <TableCell sx={{color: '#8492A6'}}>TEAM MEMBER</TableCell>
            <TableCell sx={{color: '#8492A6'}}>PRIORITY</TableCell>
            <TableCell sx={{color: '#8492A6'}}>ORDER NUMBER</TableCell>
            <TableCell sx={{color: '#8492A6'}}>TEAM</TableCell>
            <TableCell sx={{color: '#8492A6'}}>DUE DATE</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.orders.map((order) => (
            <TableRow  key={order.orderNo}>
              <TableCell sx={{fontWeight: 600}}>{order.teamMember}</TableCell>
              <TableCell sx={{display: 'flex', alignItems: 'center', lineHeight: '32px'}}><CircleIcon sx={{width: '10px', marginRight: '12px', color: getIconColor(order.priority)}}/>{order.priority}</TableCell>
              <TableCell >{order.orderNo}</TableCell>
              <TableCell >{order.team}</TableCell>
              <TableCell >{order.dueDate}</TableCell>
              <TableCell ><MoreVertIcon/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}