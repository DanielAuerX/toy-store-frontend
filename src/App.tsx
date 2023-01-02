import React, {useState, Component} from 'react';
import logo from './logo.svg';
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
        note?: string
    }[]
}

function App(){

    document.title = 'EOS Toy Store'

    const [toys, setToys] = useState<IState["toys"]>([])
    return (
        <div className="App">
            <h1>.:EOS:. Toy Store</h1>
            <h2>Toys in the inventory</h2>
            <List toys={toys}/>
            <AddToList setToys={setToys} toys={toys}/>
        </div>
    );
}

export default App;
