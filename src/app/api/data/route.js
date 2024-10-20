import {cookies} from 'next/headers';

export async function GET (request) {
    // const x = request.nextUrl.searchParams.get('x');
    // const y = request.nextUrl.searchParams.get('y');

    // const cookiesStore = cookies();
    // const token = cookiesStore.get('token');

    const res = await fetch('http://localhost:3004/employees', {
        next: {revalidate: 30}
    })

    const employees = await res.json();

    return Response.json (employees, {
        status: 200,
        headers: {
            'Set-Cookie': 'token=Bearer kjjfdjdfjkjkfdljhdfd'
        }
    })
}

export async function POST (request) {
    const data = await request.json();
    const res = await fetch('http://localhost:3004/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        return Response.json(res.statusText, {
            status: res.status,
        })
    }

    return Response.json('ok', {status: 200});
}