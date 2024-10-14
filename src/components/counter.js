'use client'

import {useState} from 'react';
import {counterTrigger} from '@/helpers/actions';

export default function Counter (props) {
    const [count, setCount] = useState(0);
    // console.log('where')

    return (
        <div>
            <hr />
            <div>Count: {count}</div>
            <button
                onClick={() => {
                    setCount(count+1);
                    counterTrigger();
                }}
            >
                Update
            </button>
        </div>
    )
}