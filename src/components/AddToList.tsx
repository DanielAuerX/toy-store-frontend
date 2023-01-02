import React, { useState } from 'react'
import { IState as Props } from "../App";

interface IProps {
    setToys: React.Dispatch<React.SetStateAction<Props["toys"]>>
    toys: Props["toys"]
}

const AddToList: React.FC<IProps> = ({setToys, toys}) => {

    const [input, setInput] = useState({
        classType: "",
        name: "",
        size: "",
        producerId : "",
        numberOfWheels : "",
        url: "",
        note: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        if(!input.classType || !input.name || !input.size || !input.producerId) return
        setToys([
            ...toys,
            {
                classType: input.classType,
                name: input.name,
                size: input.size,
                producerId: parseInt(input.producerId),
                numberOfWheels: parseInt(input.numberOfWheels),
                url: input.url,
                note: input.note
            }
        ])
        fetch("http://localhost:8080/api/toys",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                classType: input.classType,
                name: input.name,
                size: input.size,
                producerId: parseInt(input.producerId),
                numberOfWheels: parseInt(input.numberOfWheels)
            })

        }).then(()=>{
            console.log("New toy added")
        });                                             //added without ; ??

        setInput({
            classType: "",
            name: "",
            size: "",
            producerId : "",
            numberOfWheels : "",
            url: "",
            note: ""
        })
    }

    return (
        <div className="AddToList">
            <input
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="classType"
                value={input.classType}
                placeholder="Class type"
            />
            <input
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="name"
                value={input.name}
                placeholder="Name"
            />
            <input
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="size"
                value={input.size}
                placeholder="Size"
            />
            <input
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="producerId"
                value={input.producerId}
                placeholder="Producer ID"
            />
            <input
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="numberOfWheels"
                value={input.numberOfWheels}
                placeholder="Number of wheels"
            />
            <input
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="url"
                value={input.url}
                placeholder="Image Url"
            />
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