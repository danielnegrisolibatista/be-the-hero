import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidets] = useState([]);
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  // useEffect, param[0], {} o que executar
  // useEffect, param[1], [] quando o que mudar deve executar
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidets(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setIncidets(incidents.filter(incident => incident.id !== id));

    } catch (err) {
      alert('Erro ao deletar caso, tente novamente');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button 
          onClick={handleLogout} 
          type="button"
        >
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos castrados</h1>
      
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO: {incident.id}</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

            <button 
              onClick={() => handleDeleteIncident(incident.id)}
              type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
        
      </ul>
    </div>
  );
}