import React from 'react';
import { Box, Button, Dialog, FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import {NewOrderFormProps} from './App';
import { OrderModel } from './Order';


export default function NewOrderForm(props: NewOrderFormProps) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [state, setState] = React.useState({teamMember: "", priority:"", team: "", dueDate: dayjs().add(1, 'month').format('L')});

    function handlePrioritySelectChange(event: SelectChangeEvent): void {
        setState({teamMember: state.teamMember , priority: event.target.value, team: state.team, dueDate: state.dueDate})
    }
    
    function handleTeamSelectChange(event: SelectChangeEvent) {
        setState({teamMember: state.teamMember , priority: state.priority, team: event.target.value, dueDate: state.dueDate})
    }

    function handleDueDateChange(value: string | undefined) {
        const dateValue = value ?? ''
        setState({teamMember: state.teamMember , priority: state.priority, team: state.team, dueDate: dateValue})
    }

    function submitNewOrder(){
        const newOrder = {...state, orderNo: Math.floor(Math.random() * 100000)}
        props.onClose(newOrder as OrderModel);
        setState({teamMember: "", priority:"", team: "", dueDate: dayjs().add(1, 'month').format('L')})
    }

    function cancelForm(){
        props.onClose()
        setState({teamMember: "", priority:"", team: "", dueDate: dayjs().add(1, 'month').format('L')})
    }

    return (
        <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 630, backgroundColor: '#F7FAFC', borderRadius: '16px' } }}
        maxWidth="sm"
        open={open}
        {...other}
      >
        <Box textAlign={'center'} width={'430px'} marginX={'auto'} marginY={'40px'}>
            <Typography variant='h4'>Create a New Order</Typography>
            <Typography variant='subtitle1' sx={{marginBottom: '16px', fontSize: '14px'}}>Fill out the required information to create a new order</Typography>
            <form onSubmit={submitNewOrder} id="new-order">
            <FormControl required fullWidth margin="dense" sx={{backgroundColor:'#FFFFFF'}}>
                <FormLabel required sx={{backgroundColor: '#F7FAFC', textAlign: 'left', fontSize:'14px'}}>Team Member Name</FormLabel>
                <TextField
                    required
                    id="outlined-required"
                    value={state.teamMember}
                    placeholder="Placeholder"
                    onChange={(event) => {
                        setState({teamMember: event.target.value, priority: state.priority, team: state.team, dueDate: state.dueDate});
                    }}
                />
            </FormControl>
            <FormControl fullWidth required margin="dense" sx={{backgroundColor:'#FFFFFF', textAlign: 'left'}}>
                <FormLabel required sx={{backgroundColor: '#F7FAFC', textAlign: 'left', fontSize:'14px'}}>Priority</FormLabel>
                <Select
                    required
                    id="priority-select"
                    value={state.priority}
                    label="Priority"
                    onChange={handlePrioritySelectChange}
                >
                    <MenuItem selected value={""}>Placeholder</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth required margin="dense" sx={{backgroundColor:'#FFFFFF', textAlign: 'left'}}>
                <FormLabel required sx={{backgroundColor: '#F7FAFC', textAlign: 'left', fontSize:'14px'}}>Team</FormLabel>
                <Select
                    required
                    id="team-select"
                    value={state.team}
                    label="Priority"
                    onChange={handleTeamSelectChange}
                >
                    <MenuItem value={""}></MenuItem>
                    <MenuItem value={"Blue"}>Blue</MenuItem>
                    <MenuItem value={"Yellow"}>Yellow</MenuItem>
                    <MenuItem value={"Green"}>Green</MenuItem>
                    <MenuItem value={"Red"}>Red</MenuItem>
                </Select>
            </FormControl >
            <FormControl fullWidth  margin="dense" sx={{backgroundColor:'#FFFFFF'}}>
                <FormLabel required sx={{backgroundColor: '#F7FAFC', textAlign: 'left', fontSize:'14px'}}>Due Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                <DatePicker disablePast value={dayjs(state.dueDate)} onChange={(newValue)=>handleDueDateChange(newValue?.format('L'))}/>
                </LocalizationProvider>
            </FormControl>
            <FormHelperText >Date Format must be mm/dd/yyyy</FormHelperText>

            <Box sx={{marginTop:'40px', display: 'flex', justifyContent: 'space-between'}}>
                <Button variant='outlined' onClick={cancelForm}>Cancel</Button>
                <Button variant='contained' type="submit">Submit</Button>
            </Box>
            </form>
        </Box>
        </Dialog>
    )
}