import React from "react";
import { AuthProvider } from "./hooks/AuthProvider";
import { RouterPrincipal } from "./routes/RouterPrincipal";
function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterPrincipal />
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
