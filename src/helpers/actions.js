'use server'

import axios from 'axios';
import { revalidatePath } from 'next/cache';
import {redirect} from 'next/navigation';

export async function counterTrigger() {
    console.log('Counter trigger')
}

export async function addEmployee (formState, formData) {
    try {
        const fullname = formData.get('fullname');
        const position = formData.get('position');
        const age = formData.get('age');

        if (!fullname) {
            return {message: 'The fullname is empty'}
        }
        if (!position) {
            return {message: 'The position is empty'}
        }
        if (!age) {
            return {message: 'The age is empty'}
        }

        await axios.post(`http://localhost:3004/employees`, {
            fullname,
            position,
            age,
        });
    }
    catch (e) {
        return {message: 'Something went wrong'}
    }

    redirect('/');
}

export async function editEmployee (formState, data) {
    try {
        const {fullname, position, age} = data;

        if (!fullname) {
            return {message: 'The fullname is empty'}
        }
        if (!position) {
            return {message: 'The position is empty'}
        }
        if (!age) {
            return {message: 'The age is empty'}
        }

        const res = await fetch (`http://localhost:3004/employees/${data.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname,
                position,
                age,
            })
        });

        if(!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
    } catch (error) {
        return {message: error.message};
    }

    // next disable caching for employee page
    revalidatePath(`/employees/${data.id}`);
    redirect('/');
}

export async function deleteEmployee (id) {
    await fetch (`http://localhost:3004/employees/${id}`, {
        method: 'DELETE',
    })

    redirect('/');
}
