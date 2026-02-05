import { Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home'
import Detail from './pages/Detail'
import Search from './pages/Search'


const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Detail />} />
            <Route path="/search" element={<Search />} />
        </Route>
   </Routes>
  )
}

export default App