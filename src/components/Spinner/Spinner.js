import './Spinner.css';
import React, {useEffect, useRef, useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

function Spinner({ defaultValue, onChange, minimum=0 }) {
    const [value, setValue] = useState(0);
    const inputRef = useRef(null);

    useEffect(()=>{
        onChange(value)
    })

    useEffect(()=>{
        setValue(defaultValue)
    }, [defaultValue])

    useEffect(()=>{
        inputRef.current.value = value
    }, [value])

    return (
        <div className="Spinner">
            <InputGroup className="mb-3">
                <Button variant="dark"
                    className="btn-modify"
                    disabled={value <= minimum}
                    onClick={()=>setValue(value-1)}
                    data-bs-theme="dark"
                >
                    <FontAwesomeIcon className="burger-icon fa-2x" icon={faMinus} />
                </Button>
                <Form.Control
                    ref={inputRef}
                    className="number-input"
                    type="number"
                    onChange={(event)=>setValue(parseInt(event.target.value))}
                    data-bs-theme="dark"
                />
                <Button variant="dark"
                    className="btn-modify"
                    onClick={()=>setValue(value+1)}
                >
                    <FontAwesomeIcon className="burger-icon fa-2x" icon={faPlus} />
                </Button>
            </InputGroup>
        </div>
    );
}

export default Spinner;
