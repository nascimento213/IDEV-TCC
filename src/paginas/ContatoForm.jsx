import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../componentes/Header'
import PageTransition from '../componentes/PageTransition'

function ContatoForm() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const destinatarioId = searchParams.get('destinatario')
  
  const [formData, setFormData] = useState({
    mensagem: '',
    anexo: ''
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
      console.log('Enviando mensagem para:', destinatarioId)
      
      const mensagemData = {
        remetenteId: user.id,
        destinatarioId: parseInt(destinatarioId),
        assunto: 'Contato direto',
        mensagem: formData.mensagem
      }
      
      if (formData.anexo && formData.anexo.trim()) {
        mensagemData.anexo = formData.anexo.trim()
      }
      
      const response = await fetch('http://localhost:8080/api/v1/mensagem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mensagemData)
      })
      
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const result = await response.text()
        console.log('Response body:', result)
      } else {
        const errorText = await response.text()
        console.log('Error response:', errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }
      
      if (!response.ok) throw new Error('Erro ao enviar mensagem')
      alert('Mensagem enviada com sucesso!')
      navigate(-1)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      alert('Erro ao enviar mensagem')
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
          maxWidth: '500px',
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
              Enviar Mensagem
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: '1rem',
              margin: 0
            }}>
              Entre em contato com este profissional
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
                Mensagem *
              </label>
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
                rows={6}
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
                placeholder="Escreva sua mensagem..."
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
                Anexo (URL) - Opcional
              </label>
              <input
                type="url"
                name="anexo"
                value={formData.anexo}
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
                placeholder="https://exemplo.com/arquivo.png (opcional)"
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'space-between',
              marginTop: '1rem'
            }}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{
                  padding: '0.875rem 2rem',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
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
                {enviando ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </PageTransition>
  )
}

export default ContatoForm