import logo from './logo.svg';
import './App.css';
import './components/Header.css';
import './components/Technologies.css';
import './components/Table.css';
import Technologies from './components/Technologies';
import Header from './components/Header';
import Table from './components/Table';


const App = () => {
  return (
    <div className="mainInfo">
      <div className="headerInfo"><Header /></div>
      <div className="table"><Table /></div>
      <div className="techInfo"><Technologies /></div>
    </div>
  );
}




export default App;
