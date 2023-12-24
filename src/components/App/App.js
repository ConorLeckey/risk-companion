import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

function App() {
    return (
        <div className="App">
            <FontAwesomeIcon className="burger-icon fa-2x" icon={faPlus} />
        </div>
    );
}

export default App;
