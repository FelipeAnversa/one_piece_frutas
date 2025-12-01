import { useState, useEffect } from 'react';
import api from './services/api'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';

export default function Feiticos () {
    const [feiticos, setFeiticos] = useState(null);
    const [selecionado, setSelecionado] = useState(null);
    
    useEffect(() => {
        pegarFeiticos().then(data => setFeiticos(data));
    }, []);

    const selecionar = (e) => {
        const feiticoSelecionado = feiticos.find(feitico => feitico.name === e.target.value);
        setSelecionado(feiticoSelecionado);
    };


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth margin='0 0 20px 0'>
                <InputLabel id='label'>Name</InputLabel>
                <Select 
                    labelId='label'
                    id='select'
                    label='Name'
                    onChange={selecionar}
                >
                    <MenuItem value="">Select a option:</MenuItem>
                    {feiticos && feiticos.map(feitico => (
                        <MenuItem key={feitico.id} value={feitico.name}>
                            {`${feitico.name}`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br />
            {selecionado && (
                <div>
                    <Typography 
                        marginTop={5}
                        variant="h5" 
                        component="div"
                        fontWeight= 'fontWeightBold'
                        sx={{ fontFamily: 'Arial', fontSize: 50 }}
                    >
                        Description:
                    </Typography>
                    <Typography 
                        variant="h5" 
                        component="div"
                        fontWeight= 'fontWeightBold'
                        sx={{ 
                        fontFamily: 'Arial',
                        fontSize: 50, 
                        color: 'rgb(236, 0, 0)'
                        }}
                    >
                        {selecionado.description}
                    </Typography>
                </div>
            )}
        </Box>
    );

    async function pegarFeiticos() {
        try {
            const API = await api.get('/spells');
            const data = API.data;
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}