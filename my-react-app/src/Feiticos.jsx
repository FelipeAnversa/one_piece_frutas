import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Feiticos ({ nome }) {
    const [feitico, setFeitico] = useState(null);

    useEffect(() => {
        pegarFeiticos(nome).then(setFeitico).catch(error => console.log(error));
    }, [nome]);

    if(!feitico) return <h1>Carregando...</h1>

    return (
        <div>
            <>
                <h1>Name: </h1>
                <h2>{feitico.name}</h2>
                <br />
                <h1>Description: </h1>
                <h2>{feitico.description}</h2>
            </>
        </div>
    );
}

async function pegarFeiticos(nome) {
    try {
        const API = await axios.get('https://hp-api.onrender.com/api/spells');
        const feiticos = API.data;
        const feitico = feiticos.find(f => f.name === nome);
        if (!feitico) throw new Error(`Feitiço "${nome}" não encontrado`);
        return {
            name: feitico.name,
            description: feitico.description
        };
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}