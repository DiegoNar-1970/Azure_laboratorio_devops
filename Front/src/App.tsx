
import './App.css'
import WelcomeView from './WelcomeView.tsx'
import Calculator from './Calculator.tsx'

function App() {


  return (
    <>
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <WelcomeView />
      <h1>¡Bienvenido !</h1>
      <p>Nos alegra tenerte aquí 🚀</p>
      <Calculator />
    </div>
    </>
  )
}

export default App
