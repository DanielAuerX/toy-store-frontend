import React from "react";
import { IState as Props } from "../App";

interface IProps {
    toys: Props["toys"]
}

const List: React.FC<IProps> = ({ toys }) => {
    const renderList = (): JSX.Element[] => {
        return toys.map(toy => {
            return (
                <li className="List">
                    <div className="List-header">
                        <img className="List-img" src={toy.url}/>
                        <h2>{toy.classType}</h2>
                    </div>
                    <p className="List-note">ID: {toy.uuid}</p>
                    <p>{toy.name}</p>
                    <p>{toy.size}</p>
                    <p>Producer ID: {toy.producerId}</p>
                    <p>Wheels: {toy.numberOfWheels}</p>
                </li>
            )                                                   // <p className="List-note">Note: {toy.note}</p>
        })
    }

    return (
        <ul>
            {renderList()}
        </ul>
    )
}

export default List