import './App.css';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="app">
      <header>
        <div>
          <h1>whatsapp</h1>
          
        </div>
     
        <h3 className="menu"> Menu </h3>
      </header>
     

      <div className="app__body">

        {/* sidebar */}
        <Sidebar/>

       {/* chat */}
     </div>

    </div>
  );
}

export default App;
