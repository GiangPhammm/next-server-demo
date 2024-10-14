import Link from 'next/link';

export default function EmployeeNotFound () {
    return (
        <div>
            <h1>Sorry we could not find it</h1>
            <Link href='/'>Back home</Link>
        </div>
    )
}