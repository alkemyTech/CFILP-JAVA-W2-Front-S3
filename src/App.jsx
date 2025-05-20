import { isAuthenticated } from './utils/auth'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { Navigate, Route, Routes } from 'react-router'
import { Login, Register, Home } from './pages'

function App() {

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated() ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </>
  )
}

export default App
