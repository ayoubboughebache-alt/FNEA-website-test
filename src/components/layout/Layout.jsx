import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollManager from './ScrollManager';
import useDocumentTitle from '../../lib/useDocumentTitle';

export default function Layout() {
  useDocumentTitle();
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none"><Outlet /></main>
      <Footer />
    </>
  );
}
