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

    const styles = {
        container: {
            fontFamily: 'Arial, Helvetica, sans-serif',
            textAlign: 'center',
            border: '4px solid black',
            padding: '10px',
            margin: '0 auto',
            width: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }
    };

    return (
        <div style={styles.container}>
            <>
                <h1 style={{color: 'black'}}>Name: </h1>
                <select onChange={selecionar} style={{padding: '20px', fontSize: '20px', cursor: 'pointer'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'lightgray'} onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}>
                    <option value="">Select a option:</option>
                    {feiticos && feiticos.map(feitico => (
                        <option key={feitico.id} value={feitico.name}>
                            {`${feitico.name}`}
                        </option>
                    ))}
                </select>
                {selecionado && (
                    <div>
                        <h1 style={{color: 'black'}}>Description: </h1>
                        <h2 style={{color: 'rgb(236, 0, 0)', fontWeight: '2000'}}>{selecionado.description}</h2>
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