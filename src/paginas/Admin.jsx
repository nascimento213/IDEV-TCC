import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../componentes/PageTransition'

function Admin() {
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    tipo: 'profissional',
    telefone: ''
  })

  useEffect(() => {
    carregarUsuarios()
  }, [])

  const carregarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/usuario')
      const data = await response.json()
      
      // Mock comentado
      // if (data.length === 0) {
      //   const mockData = [...]
      // }
      setUsuarios(data)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
      // Mock comentado em caso de erro
      setUsuarios([])
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch(`http://localhost:8080/api/v1/usuario/${editando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      alert('Usuário atualizado com sucesso!')
      setFormData({ nome: '', email: '', tipo: 'profissional', telefone: '' })
      setEditando(null)
      carregarUsuarios()
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      alert('Erro ao atualizar usuário')
    }
  }

  const handleEditar = (usuario) => {
    setEditando(usuario.id)
    setFormData({
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo,
      telefone: usuario.telefone || ''
    })
  }

  const handleExcluir = async (id) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await fetch(`http://localhost:8080/api/v1/usuario/${id}`, {
          method: 'DELETE'
        })
        alert('Usuário excluído com sucesso!')
        carregarUsuarios()
      } catch (error) {
        console.error('Erro ao excluir usuário:', error)
        alert('Erro ao excluir usuário')
      }
    }
  }

  const cancelarEdicao = () => {
    setEditando(null)
    setFormData({ nome: '', email: '', tipo: 'profissional', telefone: '' })
  }

  return (
    <PageTransition>
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Formulário de Edição */}
          {editando && (
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1.5rem'
              }}>
                Editar Usuário
              </h2>

              <form onSubmit={handleSubmit} style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Nome completo"
                  required
                  style={{
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
                
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  style={{
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
                
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  style={{
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="profissional">Profissional</option>
                  <option value="empresa">Empresa</option>
                </select>
                
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="Telefone"
                  style={{
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="submit"
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    Atualizar
                  </button>
                  
                  <button
                    type="button"
                    onClick={cancelarEdicao}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tabela */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#111827',
                margin: 0
              }}>
                Usuários Cadastrados
              </h2>
              

            </div>

            {loading ? (
              <p>Carregando...</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.875rem'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>ID</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Nome</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Email</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Tipo</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Telefone</th>
                      <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '0.75rem' }}>{usuario.id}</td>
                        <td style={{ padding: '0.75rem' }}>{usuario.nome}</td>
                        <td style={{ padding: '0.75rem' }}>{usuario.email}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            backgroundColor: usuario.tipo === 'profissional' ? '#dbeafe' : '#fef3c7',
                            color: usuario.tipo === 'profissional' ? '#1e40af' : '#92400e'
                          }}>
                            {usuario.tipo}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem' }}>{usuario.telefone || '-'}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                          <button
                            onClick={() => handleEditar(usuario)}
                            style={{
                              padding: '0.25rem 0.75rem',
                              backgroundColor: '#f59e0b',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              marginRight: '0.5rem'
                            }}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleExcluir(usuario.id)}
                            style={{
                              padding: '0.25rem 0.75rem',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              cursor: 'pointer'
                            }}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {usuarios.length === 0 && (
                  <p style={{
                    textAlign: 'center',
                    color: '#6b7280',
                    padding: '2rem'
                  }}>
                    Nenhum usuário encontrado
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default Admin