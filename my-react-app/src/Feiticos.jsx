import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Feiticos () {
    const [feitico, setFeitico] = useState(pegarFeiticos());
    const [valor, setValor] = useState(null);

    return (
        <div>
            <>
                <h1>Name: </h1>
                <select></select>
                <option value="">Select a option:</option>
                {feitico.map(() => {
                    <option key={}>

                    </option>
                })}
                <br />
                <h1>Description: </h1>
                <h2>{feitico.description}</h2>
            </>
        </div>
    );
}

async function pegarFeiticos() {
    try {
        const API = await axios.get('https://hp-api.onrender.com/api/spells');
        const data = API.data;
        return {
            name: data.name,
            description: data.description
        };
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}