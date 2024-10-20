export async function PATCH (req, res) {
    const employeeID = req.query.id;

    if (req.method === 'PATCH') {
        const data = req.body;
        const request = await fetch(`http://localhost:3004/employees/${employeeID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!request.ok) {
            return res.status(400).json({message: 'not ok'});
        }

        res.status(200).json({ok: 'ok'});
    }
}