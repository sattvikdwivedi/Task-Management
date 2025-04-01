import { MdOutlineDone } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";
import { Task, useTask } from '../../../context/Task.context';

const AllTask = () => {
    const { tasks, deleteTaskById, editTaskById } = useTask();

    return (
        <div className="container mt-5">
            <h2 className="text-center text-success">All Tasks ({tasks?.length})</h2>

            <div className="row justify-content-center">
                {tasks && tasks.length > 0 ? (
                    tasks.map((cur: Task, i) => (
                        <div key={i} className="col-sm-12 col-md-6 col-lg-4 my-3">
                            <div className="card shadow-sm p-3 border rounded-3">
                                <h5 className={`fw-bold ${cur.isComplete ? 'text-decoration-line-through text-muted' : 'text-dark'}`}>
                                    {cur.title}
                                </h5>
                                <p className="text-muted">{cur.description}</p>
                                <div className="d-flex justify-content-between">
                                    <button onClick={() => deleteTaskById(cur._id)} title="Delete" className="btn btn-outline-danger rounded-pill">
                                        <RxCross2 />
                                    </button>
                                    {!cur.isComplete && (
                                        <button onClick={() => editTaskById(cur._id)} title="Mark Complete" className="btn btn-outline-success rounded-pill">
                                            <MdOutlineDone />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3 className="text-center text-muted mt-5">No Tasks Available</h3>
                )}
            </div>
        </div>
    );
};

export default AllTask;
