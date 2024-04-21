import React, { useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './MainPage.scss';

const MainPage = () => {
    const [text, setText] = useState('');
    const { userId } = useContext(AuthContext);
    const [todos, setTodos] = useState([]);
    const [duplicateMessage, setDuplicateMessage] = useState('');
    const [deletingTodo, setDeletingTodo] = useState(null);

    const getTodo = useCallback(async () => {
        try {
            const response = await axios.get('https://pcc-team-9b757ec39e30.herokuapp.com/api/todo', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { userId }
            });
            setTodos(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [userId]);

    const createTodo = useCallback(async () => {
        if (!text) return;

        const lowerCaseText = text.toLowerCase(); // Convert input text to lowercase

        const isDuplicate = todos.some(todo => todo.text.toLowerCase() === lowerCaseText);

        if (isDuplicate) {
            setDuplicateMessage('This domain name already exists.');
            return;
        }

        try {
            const response = await axios.post('https://pcc-team-9b757ec39e30.herokuapp.com/api/todo/add', { text, userId }, {
                headers: { 'Content-Type': 'application/json' }
            });
            setTodos([...todos, response.data]);
            setText('');
            setDuplicateMessage(''); // Clear duplicate message if successful
        } catch (error) {
            console.log(error);
        }
    }, [text, userId, todos]);

    const removeTodos = useCallback(async (todo) => {
        setDeletingTodo(todo); // Set the todo to be deleted
    }, []);

    const confirmDelete = async (id) => {
        try {
            await axios.delete(`https://pcc-team-9b757ec39e30.herokuapp.com/api/todo/delete/${id}`, {
                headers: { 'Content-Type': 'application/json' }
            });
            // Update the todo list after deletion
            await getTodo();
            setDeletingTodo(null); // Hide the confirmation modal
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTodo();
    }, [getTodo]);

    return (
        <div className="container">
            <div className="main-page">
                <h4>Add Domain:</h4>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                id="text"
                                name="input"
                                className="validate"
                                value={text}
                                onChange={e => {
                                    setText(e.target.value);
                                    setDuplicateMessage(''); // Clear duplicate message on input change
                                }}
                            />
                            <label htmlFor="input">Names</label>
                            {duplicateMessage && <p className="red-text">{duplicateMessage}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <button className="login-reg-button" onClick={createTodo}>
                            Add
                        </button>
                    </div>
                </form>

                <h3>Active domains</h3>
                <div className="todos">
                    {todos.map((todo, index) => (
                        <div className="">
                            <div className="row flex todos-item" key={index}>
                            <div className="col todos-num">{index + 1}</div>
                            <div className="col todos-text">{todo.text}</div>
                            <div className="col todos-buttons">
                                <i
                                    className="material-icons red-text"
                                    onClick={() => removeTodos(todo)}
                                >
                                    delete
                                </i>
                            </div>
                        </div>
                        {deletingTodo && deletingTodo._id === todo._id && (
                                <div className="confirmation-modal">
                                    <div className="confirmation-back">
                                    <p>Delete <span>{todo.text}</span>?</p>
                                    <div>
                                        <button className="login-reg-button" onClick={() => confirmDelete(todo._id)}>Confirm</button>
                                        <button className="login-reg-button-grey" onClick={() => setDeletingTodo(null)}>Cancel</button>
                                    </div>
                                    </div>
                                    
                                </div>
                            )}
                        </div> 
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
