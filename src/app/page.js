import Link from 'next/link'
import {headers, cookies} from 'next/headers';

import Counter from '@/components/counter';

// force-dynamic is not working on next 14.2.15
// https://github.com/vercel/next.js/issues/65170
// export const dynamic = 'force-dynamic';

// Take amount of time to fetch dynamic request
// If revalidate = 5, it means after 5s it does the fetching, before 5s use cache
export const revalidate = 0;

async function getEmployees () {
	const res = await fetch('http://localhost:3004/employees')

	if(!res.ok) {
		throw new Error('Oops, no employees')
	}

	return res.json();
}

export default async function Home() {
	// const authHeader = headers().get('auth');
	// const authHeader = headers().entries();
	// const authHeader = headers().forEach();
	// const authHeader = headers().has('Content-Type');
	// const authHeader = headers().keys();
	// const authHeader = headers().values();

	// const cookiesStore = cookies().get('someCookie');
	// const cookiesStore = cookies().getAll().map((cookie) => {});
	// const cookiesStore = cookies().has('whatever');

	// cookies().set('name', 'value', {secure: true});
	// cookies().delete('name')

	const employees = await getEmployees();
	const showEmployees = employees.map(employee => (
		<div 
			key={employee.id}
			className='col'
		>
			<div className='card'>
				<div className='card-body'>
					<h3 className='card-title'>{employee.fullname}</h3>
					<hr />
					<p className='card-text'>{employee.position}</p>
					<p className='card-text'>{employee.age}</p>
					<Link
						href={`employees/${employee.id}`}
						className='btn btn-primary'
					>
						Go to employee
					</Link>
				</div>
			</div>
		</div>
	))

	// const counterTrigger = async () => {
	// 	'use server'
	// 	console.log('test');
	// }

	return (
		<>
			<h1>Employees:</h1>
			<div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
				{showEmployees}
			</div>
			<Counter />
		</>
	);
}
