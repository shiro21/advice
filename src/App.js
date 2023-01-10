import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/_reset.scss';
import './styles/_layout.scss';

// Components
import Main from './components/main/Main';
import Test from './components/test/Test';
import Login from './components/login/Login';
import Join from './components/join/Join';
import Profile from './components/profile/Profile';
import Enroll from './components/enroll/Enroll';
import Article from './components/article/Article';
import Test2 from './components/test/Test2';
import Bookmark from './components/bookmark.js/Bookmark';
import MyWrite from './components/mywrite/MyWrite';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/enroll/:_id" element={<Enroll />} />
        <Route path="/update/:update" element={<Enroll />} />
        <Route path="/article/:_id" element={<Article />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/my_write" element={<MyWrite />} />
      </Routes>
    </Router>
  );
}

export default App;