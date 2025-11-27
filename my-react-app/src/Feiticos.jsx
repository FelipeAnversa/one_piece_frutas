import { useState, useEffect } from 'react';
import api from './services/api'

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
        <div id='home'>
            <>
                <h1>Name: </h1>
                <select onChange={selecionar}>
                    <option value="">Select a option:</option>
                    {feiticos && feiticos.map(feitico => (
                        <option key={feitico.id} value={feitico.name}>
                            {`${feitico.name}`}
                        </option>
                    ))}
                </select>
                {selecionado && (
                    <div>
                        <h1>Description: </h1>
                        <h2>{selecionado.description}</h2>
                    </div>
                )}
            </>
        </div>
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