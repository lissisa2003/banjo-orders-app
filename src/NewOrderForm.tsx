import React from 'react';
import { Box, Button, Dialog, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import {NewOrderFormProps} from './App';
import { OrderModel } from './Order';


export default function NewOrderForm(props: NewOrderFormProps) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [state, setState] = React.useState({teamMember: "", priority:"", team: "", dueDate: dayjs().add(1, 'day')});

    function handlePrioritySelectChange(event: SelectChangeEvent): void {
        setState({teamMember: state.teamMember , priority: event.target.value, team: state.team, dueDate: state.dueDate})
    }
    
    function handleTeamSelectChange(event: SelectChangeEvent) {
        setState({teamMember: state.teamMember , priority: state.priority, team: event.target.value, dueDate: state.dueDate})
    }

    function handleDueDateChange(value: string | null) {
        const dateValue = value ?? ''
        setState({teamMember: state.teamMember , priority: state.priority, team: state.team, dueDate: dayjs(dateValue)})
    }

    function submitNewOrder(){
        const newOrder = {...state, orderNo: Math.random() * 100000}
        props.onClose(newOrder as OrderModel);
    }

    function cancelForm(){
        props.onClose()
    }

    return (
        <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 535, backgroundColor: '#F7FAFC' } }}
        maxWidth="sm"
        open={open}
        {...other}
      >
        <Box textAlign={'center'} width={'430px'} marginX={'auto'} marginY={'40px'}>
            <Typography variant='h4'>Create a New Order</Typography>
            <Typography variant='subtitle1' sx={{marginBottom: '40px'}}>Fill out the required information to create a new order</Typography>
            <FormControl required fullWidth margin="normal">
            <TextField
                required
                id="outlined-required"
                label="Team Member Name"
                value={state.teamMember}
                placeholder="Placeholder"
                onChange={(event) => {
                    setState({teamMember: event.target.value, priority: state.priority, team: state.team, dueDate: state.dueDate});
                  }}
            />
            </FormControl>
            <FormControl fullWidth required margin="normal">
                <InputLabel id="priority-select-label">Priority</InputLabel>
                <Select
                    labelId="priority-select-label"
                    id="priority-select"
                    value={state.priority}
                    label="Priority"
                    onChange={handlePrioritySelectChange}
                    placeholder="Placeholder"
                >
                    <MenuItem value={""}></MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth required margin="normal">
                <InputLabel id="team-select-label">Team</InputLabel>
                <Select
                    labelId="team-select-label"
                    id="team-select"
                    value={state.team}
                    label="Priority"
                    onChange={handleTeamSelectChange}
                    placeholder="Placeholder"
                >
                    <MenuItem value={""}></MenuItem>
                    <MenuItem value={"Blue"}>Blue</MenuItem>
                    <MenuItem value={"Yellow"}>Yellow</MenuItem>
                    <MenuItem value={"Green"}>Green</MenuItem>
                    <MenuItem value={"Red"}>Red</MenuItem>
                </Select>
            </FormControl >
            <FormControl fullWidth  margin="normal">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                <DatePicker disablePast value={dayjs(state.dueDate).format('L')} onChange={handleDueDateChange} />
                <FormHelperText>Date Format must be mm/dd/yyyy</FormHelperText>
                </LocalizationProvider>
            </FormControl>

            <div className="buttonRow">
                <Button onClick={cancelForm}>Cancel</Button>
                <Button variant='contained' onClick={submitNewOrder}>Submit</Button>
            </div>
        </Box>
        </Dialog>
    )
}