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

    const classTypeOptions = [
        {value: '', label: 'Select a class type'},
        {value: 'Car', label: 'Car'},
        {value: 'Starship', label: 'Starship'},
    ];

    const sizeOptions = [
        {value: '', label: 'Select a size'},
        {value: 'XS', label: 'XS'},
        {value: 'S', label: 'S'},
        {value: 'M', label: 'M'},
        {value: 'L', label: 'L'},
        {value: 'XL', label: 'XL'},
    ];

    const producerIdOptions = [
        {value: '', label: 'Select a producer ID'},
        {value: '1', label: '1'},
    ];

    const numberOfWheelsOptions = [
        {value: '', label: 'Select the number of wheels'},
        {value: '1', label: '1'},
        {value: '2', label: '2'},
        {value: '3', label: '3'},
        {value: '4', label: '4'},
        {value: '6', label: '6'},
        {value: '8', label: '8'},
    ];

    return (
        <div className="AddToList">
            <select
                onChange={handleChange}
                className="AddToList-input"
                name="classType"
                value={input.classType}
            >
                {classTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
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
                {sizeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <select
                onChange={handleChange}
                className="AddToList-input"
                name="producerId"
                value={input.producerId}
            >
                {producerIdOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {input.classType === 'Car' ? (
                <select
                    onChange={handleChange}
                    className="AddToList-input"
                    name="numberOfWheels"
                    value={input.numberOfWheels}
                >
                    {numberOfWheelsOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : null}
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