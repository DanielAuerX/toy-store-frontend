import React, {useState} from 'react'
import {IState as Props} from "../App";

interface IProps {
    setToys: React.Dispatch<React.SetStateAction<Props["toys"]>>
    toys: Props["toys"]
}

const AddToList: React.FC<IProps> = ({setToys, toys}) => {

    const [input, setInput] = useState({
        classType: "",
        name: "",
        size: "",
        producerId: "",
        numberOfWheels: "",
        url: "",
        uuid: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    async function handleClick() {
        if (!input.classType || !input.name || !input.size || !input.producerId) return;
        try {
            const response = await fetch('http://localhost:8080/api/toys', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    classType: input.classType,
                    name: input.name,
                    size: input.size,
                    producerId: parseInt(input.producerId),
                    numberOfWheels: parseInt(input.numberOfWheels),
                }),
            });
            const responseText = await response.text();
            if (response.ok) {
                console.log(responseText)
                const response = await fetch('http://localhost:8080/api/toys');
                const toysFromAPI = await response.json();
                setToys(toysFromAPI);
                /*setToys([
                    ...toys,
                    {
                        classType: input.classType,
                        name: input.name,
                        size: input.size,
                        producerId: parseInt(input.producerId),
                        numberOfWheels: parseInt(input.numberOfWheels),
                        url: input.url,
                        uuid: input.uuid,
                    },
                ]);
                 */
            } else {
                throw new Error(responseText);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="AddToList">
            <select
                onChange={handleChange}
                className="AddToList-input"
                name="classType"
                value={input.classType}
            >
                <option value="">Select a class type</option>
                <option value="Car">Car</option>
                <option value="Starship">Starship</option>
            </select>
            <input
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="name"
                value={input.name}
                placeholder="Name"
            />
            <select
                onChange={handleChange}
                className="AddToList-input"
                name="size"
                value={input.size}
            >
                <option value="">Select a size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <select
                onChange={handleChange}
                className="AddToList-input"
                name="producerId"
                value={input.producerId}
            >
                <option value="">Select a producer ID</option>
                <option value="1">1</option>
            </select>
            <select
                onChange={handleChange}
                className="AddToList-input"
                name="numberOfWheels"
                value={input.numberOfWheels}
            >
                <option value="">Select the number of wheels</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
            </select>
            <button
                onClick={handleClick}
                className="AddToList-btn"
            >
                Add to List
            </button>
        </div>
    )
}

export default AddToList