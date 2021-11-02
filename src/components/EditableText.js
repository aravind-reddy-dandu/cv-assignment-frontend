import React, { useState, useRef, useEffect } from "react";

const EditableInput = props => {
    // We use hooks to declare "initial" states
    const inputRef = useRef(null);
    const [inputVisible, setInputVisible] = useState(false);
    const [text, setText] = useState(props.text);
    const handleArticleEdit = props.handleArticleEdit;

    function onClickOutSide(e) {
        // Check if user is clicking outside of <input>
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setInputVisible(false); // Disable text input
            handleArticleEdit(text);
        }
    }

    useEffect(() => {
        // Handle outside clicks on mounted state
        if (inputVisible) {
            document.addEventListener("mousedown", onClickOutSide);
        }

        // This is a necessary step to "dismount" unnecessary events when we destroy the component
        return () => {
            document.removeEventListener("mousedown", onClickOutSide);
        };
    });

    return (
        <React.Fragment>
            <div style={{ display: 'table', margin: '0 auto', border: '5px solid black', padding: '20px' , maxWidth : '50%'}}>
                {inputVisible ? (
                    <textarea
                        style={{ overflow: 'auto' }}
                        ref={inputRef} // Set the Ref
                        value={text} // Now input value uses local state
                        onChange={e => {
                            setText(e.target.value);
                        }}
                    />
                ) : (
                    <span onClick={() => setInputVisible(true)}>{text}</span>
                )}
            </div>
        </React.Fragment>
    );
};

export default EditableInput; // We got our component!