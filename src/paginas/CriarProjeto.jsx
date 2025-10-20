import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../componentes/Header'
import PageTransition from '../componentes/PageTransition'

function CriarProjeto() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    orcamentoMin: '',
    orcamentoMax: ''
  })
  const [enviando, setEnviando] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    
    try {
      const projeto = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        empresaId: user.id,
        // orcamentoMin: formData.orcamentoMin ? parseFloat(formData.orcamentoMin) : null,
        // orcamentoMax: formData.orcamentoMax ? parseFloat(formData.orcamentoMax) : null
      }
      
      const response = await fetch('http://localhost:8080/api/v1/projeto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projeto)
      })
      
      if (response.ok) {
        alert('Projeto criado com sucesso!')
        navigate('/dashboard')
      } else {
        alert('Erro ao criar projeto')
      }
    } catch (error) {
      console.error('Erro ao criar projeto:', error)
      alert('Erro ao criar projeto')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <PageTransition>
      <Header secaoAtiva="" setSecaoAtiva={() => {}} aoClicarLogin={() => navigate('/')} />
      
      <main style={{
        minHeight: 'calc(100vh - 70px)',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '600px',
          padding: '2.5rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
        }}>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#111827',
              margin: '0 0 0.5rem 0'
            }}>
              Criar Novo Projeto
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: '1rem',
              margin: 0
            }}>
              Publique seu projeto e encontre profissionais qualificados
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Título do Projeto *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Ex: Desenvolvimento de E-commerce"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Descrição *
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
                placeholder="Descreva detalhadamente o projeto, tecnologias necessárias, prazos..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Orçamento Mínimo (R$)
                </label>
                <input
                  type="number"
                  name="orcamentoMin"
                  value={formData.orcamentoMin}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="5000"
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Orçamento Máximo (R$)
                </label>
                <input
                  type="number"
                  name="orcamentoMax"
                  value={formData.orcamentoMax}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="10000"
                />
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'space-between',
              marginTop: '1rem'
            }}>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                style={{
                  padding: '0.875rem 2rem',
                  backgroundColor: 'white',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={enviando}
                style={{
                  padding: '0.875rem 2rem',
                  backgroundColor: enviando ? '#9ca3af' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: enviando ? 'not-allowed' : 'pointer'
                }}
              >
                {enviando ? 'Criando...' : 'Criar Projeto'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </PageTransition>
  )
}

export default CriarProjeto