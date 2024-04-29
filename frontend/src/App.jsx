
import { AuthProvider } from "./hooks/AuthProvider"
import { RouterPrincipal } from "./routes/RouterPrincipal"
function App() {
return (
  <AuthProvider>
   <RouterPrincipal />
  </AuthProvider>
)
  
}

export default App
