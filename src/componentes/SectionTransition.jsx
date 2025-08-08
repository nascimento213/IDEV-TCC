import '../estilos/PageTransition.css'

function SectionTransition({ children, sectionKey }) {
  return (
    <div key={sectionKey} className="section-transition">
      {children}
    </div>
  )
}

export default SectionTransition