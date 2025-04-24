import { Routes, Route } from 'react-router-dom';
import Counter from './pages/usestate/Counter';
import TodoList from './pages/usestate/TodoList';
import Imagegallery from './pages/usestate/Imagegallery';
import Darkmode from './pages/usestate/Darkmode';
import ShoppingCart from './pages/usestate/ShoppingCart';
import UsestateMain from './pages/usestate/UsestateMain';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UsestateMain />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/gallery" element={<Imagegallery />} />
        <Route path="/darkmode" element={<Darkmode />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </>
  );
}

export default App;
