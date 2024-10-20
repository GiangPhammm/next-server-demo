const handler = async (req, res) => {
    if (req.method === 'GET') {
        const data = await fetch('http://localhost:3004/employees');
        const employees = await data.json();
        res.status(200).json(employees)
    }

    if (req.method === 'POST') {
        const data = req.body;
        const request = await fetch('http://localhost:3004/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (!request.ok) {
            return res.status(400).json({message: 'not ok'});
        }

        res.status(200).json({ok: 'ok'});
    }
}

export default handler;