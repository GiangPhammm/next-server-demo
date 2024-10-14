import EditForm from '@/components/edit-form'

async function getEmployee(pageId) {
	const res = await fetch(`http://localhost:3004/employees/${pageId}`);

	if(!res.ok) {
		throw new Error('Could not find employee');
	}

	return res.json();
}

export default async function EditPage(props) {
	const id = props.params.id;
	const employee = await getEmployee(id);

	console.log(employee);

	return (
		<>
			<EditForm employee={employee} />
		</>
	);
}
