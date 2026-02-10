import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Detail from './pages/Detail'
import Search from './pages/Search'
import Movies from './pages/Movies/Movies'
import NotFound from './pages/NotFound'
import AppLayout from './layout/AppLayout';
import Homepage from "./pages/Homepage/Homepage.jsx";


const App = () => {
  return (
    <Routes>
        <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<Detail />} />
            <Route path="/search" element={<Search />} />
        </Route>

        <Route path="*" element={<NotFound />} />
   </Routes>
   
  )
}

export default App