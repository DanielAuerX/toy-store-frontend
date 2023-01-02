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
        note: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    function setUrl() {
        if (input.classType === 'Starship') {
            input.url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjvPEyUsvNaS2v4b-enzSghJrShtTIoeOOXw&usqp=CAU'
        } else if (input.classType === 'Car') {
            input.url = 'https://www.kidsroom.de/WebRoot/KidsroomDE/Shops/Kidsroom/4CBE/0CAE/F074/6FA6/7A5F/4DEB/AE1B/D04D/BILD3_7022066.jpg'
        }
    }

    async function handleClick() {
        if (!input.classType || !input.name || !input.size || !input.producerId) return;
        setUrl();
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
                /*const response = await fetch('http://localhost:8080/api/toys');
                const toysFromAPI = await response.json();
                setToys(toysFromAPI);
                 */
                setToys([
                    ...toys,
                    {
                        classType: input.classType,
                        name: input.name,
                        size: input.size,
                        producerId: parseInt(input.producerId),
                        numberOfWheels: parseInt(input.numberOfWheels),
                        url: input.url,
                        note: input.note,
                    },
                ]);
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
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
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
            <textarea
                onChange={handleChange}
                className="AddToList-input"
                name="note"
                value={input.note}
                placeholder="Note"
            />
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