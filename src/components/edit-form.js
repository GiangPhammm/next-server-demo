'use client'

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useFormState} from 'react-dom';

import {editEmployee} from '@/helpers/actions';


export default function EditForm ({employee}) {
    const initialState = {message: null};
    const [state, formAction] = useFormState(editEmployee, initialState);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: employee.id,
            fullname: employee.fullname,
            position: employee.position,
            age: employee.age,
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('Sorry, fullname is required'),
            position: Yup.string().required('Sorry, position is required'),
            age: Yup.string().required('Sorry, age is required'),
        }),
        onSubmit: (values) => {
            // console.log(values);
            formAction(values);
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
				<input
					type='text'
					className='form-control mb-3'
					id='fullname'
					placeholder='Enter the fullname'
					name='fullname'
                    {...formik.getFieldProps('fullname')}
				/>
                {formik.errors.fullname && formik.touched.fullname ? (
                    <div className='alert alert-warning' roll='alert'>
                        {formik.errors.fullname}
                    </div>
                ): null}

				<input
					type='text'
					className='form-control mb-3'
					id='position'
					placeholder='Enter the position'
					name='position'
                    {...formik.getFieldProps('position')}
				/>
                {formik.errors.position && formik.touched.position ? (
                    <div className='alert alert-warning' roll='alert'>
                        {formik.errors.position}
                    </div>
                ): null}

				<input
					type='text'
					className='form-control mb-3'
					id='age'
					placeholder='Enter the age'
					name='age'
                    {...formik.getFieldProps('age')}
				/>
                {formik.errors.age && formik.touched.age ? (
                    <div className='alert alert-warning' roll='alert'>
                        {formik.errors.age}
                    </div>
                ): null}

                {state.message ? (
                    <div className='alert alert-danger' roll='alert'>
                        {state.message}
                    </div>
                ): null}

				<button
					type='submit'
					className='btn btn-primary'
				>
					Edit employee
				</button>
			</form>
        </>
    )
}