export async function GET (request, {params}) {
    const data = await request.json();
    const res = await fetch(`http://localhost:3004/employees/${params.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
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