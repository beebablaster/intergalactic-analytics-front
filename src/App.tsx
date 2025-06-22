import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UploaderPage } from './pages/Uploader/UploaderPage.tsx';
import { Header } from './components/Header/Header.tsx';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.layout}>
        <Header />
        <Routes>
          <Route index element={<UploaderPage />} />
          {/*<Route path="note/:noteId" element={<NotePage />} />*/}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
