import * as React from 'react';

interface LoginFormProps {
    onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username"></label>
            <input
                type="text"
                className="AddToList-input"
                onChange={event => setUsername(event.target.value)}
                id="username"
                value={username}
                placeholder="Name"
            />
            <br />
            <label htmlFor="password"></label>
            <input
                type="password"
                className="AddToList-input"
                onChange={event => setPassword(event.target.value)}
                id="password"
                value={password}
                placeholder="Password"
            />
            <br />
            <button
                type="submit"
                className="AddToList-btn"
            >Log In
            </button>

        </form>
    );
};

export default LoginForm;