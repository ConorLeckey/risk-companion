import './Spinner.css';
import React, {useEffect, useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

function Spinner({onChange}) {
    const [value, setValue] = useState(0);

    useEffect(()=>{
        onChange(value)
    })

    return (
        <div className="Spinner">
            <InputGroup className="mb-3">
                <Button variant="dark"
                    className="btn-modify"
                    disabled={value === 0}
                    onClick={()=>setValue(value-1)}
                    data-bs-theme="dark"
                >
                    <FontAwesomeIcon className="burger-icon fa-2x" icon={faMinus} />
                </Button>
                <Form.Control
                    className="number-input"
                    type="number"
                    value={value}
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
