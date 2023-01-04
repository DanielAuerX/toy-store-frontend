import React, {useState, useEffect} from 'react';
import logo from './logoAsThree.svg';
import './App.css';
import List from "./components/List";
import AddToList from './components/AddToList';

export interface IState {
    toys: {
        classType: string
        name: string
        size: string
        producerId: number
        numberOfWheels?: number
        url: string
        uuid?: string
    }[]
}

function App(){
    document.title = 'äosTECH'

    const [toys, setToys] = useState<IState["toys"]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8080/api/toys');
                const toysFromAPI = await response.json();
                setToys(toysFromAPI);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])

    return (
        <div className="App">
            <img src={logo} alt="Logo" style={{ width: '350px', height: '180px' }} />
            <h1>.:Toy Store:.</h1>
            <h2>Toys in the inventory</h2>
            <List toys={toys}/>
            <AddToList setToys={setToys} toys={toys}/>
        </div>

    );
}

export default App;
