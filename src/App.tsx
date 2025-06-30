import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Create from './pages/Create'
import Error from './pages/Error'
import Profile from './pages/Profile'
import Members from './pages/Members'
import Chat from './pages/Chat'
import Matches from './pages/Matches'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/error" element={<Error />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/members" element={<Members />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/matches" element={<Matches />} />
        </Routes>
      </main>
    </div>
  )
}

export default App