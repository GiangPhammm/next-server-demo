import {notFound} from 'next/navigation';
import Link from 'next/link';

import {deleteEmployee} from '@/helpers/actions';

async function getEmployee (pageId) {
	const res = await fetch(`http://localhost:3004/employees/${pageId}`);

	if(!res.ok) {
		// throw new Error('Could not find employee')
		return notFound();
	}

	return res.json();
}

export default async function EmployeeByIdPage(props) {
	const pageId = props.params.id;
	const employee = await getEmployee(pageId);
	const deleteAction = deleteEmployee.bind(null, pageId);

	return (
		<>
			<h1>{employee.fullname}</h1>
			<div>
				<h4>Position: {employee.position}</h4>
				<h4>Age: {employee.age}</h4>
			</div>
			<hr />
			<Link href={`/form/edit/${employee.id}`}>
				Edit employee
			</Link>
			<hr />
			<form action={deleteAction}>
				<button type='submit'>
					Delete user
				</button>
			</form>
		</>
	);
}
