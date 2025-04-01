import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useTask } from '../../../context/Task.context';

const AddTask = () => {
    const { addTask } = useTask();

    const validationSchema = yup.object().shape({
        title: yup.string().trim().matches(/^(?!\s*$).+/, "Title cannot be just spaces").required("Title is required"),
        desc: yup.string().trim().matches(/^(?!\s*$).+/, "Description cannot be just spaces").required("Description is required"),
    });

    const initialValues = { title: '', desc: '' };

    const onSubmitHandler = async (values: { title: string; desc: string }, { resetForm }: any) => {
        try {
            await addTask(values.title, values.desc);
            toast.success("Task added successfully!");
        } catch (error: any) {
            toast.error(error.message);
        }
        resetForm();
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 rounded-4">
                <h2 className="text-center mb-4 text-secondary">Add New Task</h2>
                <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmitHandler}>
                    {({ isValid, dirty }) => (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="title" className="fw-bold">Title <span className="text-danger">*</span></label>
                                <Field name="title" id="title" type="text" className="form-control rounded-3 shadow-sm" placeholder="Enter task title" />
                                <ErrorMessage name="title" component="p" className="text-sm text-danger mt-1" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="desc" className="fw-bold">Description <span className="text-danger">*</span></label>
                                <Field as="textarea" rows="3" className="form-control rounded-3 shadow-sm" name="desc" id="desc" placeholder="Enter task description" />
                                <ErrorMessage name="desc" component="p" className="text-sm text-danger mt-1" />
                            </div>
                            <div className="d-grid">
    <button 
        type="submit" 
        className="btn btn-dark fw-bold shadow-sm" 
        disabled={!isValid || !dirty}
    >
        Add Task
    </button>
</div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddTask;
