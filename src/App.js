import React from 'react';
import './index.css';
import Die from './die';

export default function App() {
    return (
        <main>
            <div className="outer-box">
                <div className="inner-box">
                    <div className="dice-container">
                        <Die value={1} />
                        <Die value={1} />
                        <Die value={1} />
                        <Die value={1} />
                        <Die value={1} />
                        <Die value={1} />
                        <Die value={1} />
                        <Die value={1} />
                        <Die value={1} />
                        <Die value={1} />
                    </div>
                </div>
            </div>
        </main>
    );
}
