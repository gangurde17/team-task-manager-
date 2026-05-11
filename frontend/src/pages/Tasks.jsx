import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tasks() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const token = localStorage.getItem("token");

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [status, setStatus] = useState("Pending");

    const [editId, setEditId] = useState(null);


    // FETCH TASKS

    const fetchTasks = async () => {

        try {

            const res = await axios.get(
                "https://team-task-manager-production-a903.up.railway.app/api/tasks",
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setTasks(res.data);

        } catch (error) {

            console.log(error);

        }

    };


    // CREATE OR UPDATE TASK

    const handleSubmit = async () => {

        if (!title || !description) {

            return alert("Please fill all fields");

        }

        try {

            // UPDATE

            if (editId) {

                await axios.put(
                    `https://team-task-manager-production-a903.up.railway.app/api/tasks/${editId}`,
                    {
                        title,
                        description,
                        status
                    },
                    {
                        headers: {
                            authorization: token
                        }
                    }
                );

                alert("Task Updated");

            }

            // CREATE

            else {

                await axios.post(
                    "https://team-task-manager-production-a903.up.railway.app/api/tasks",
                    {
                        title,
                        description,
                        status
                    },
                    {
                        headers: {
                            authorization: token
                        }
                    }
                );

                alert("Task Created");

            }

            // RESET FORM

            setTitle("");

            setDescription("");

            setStatus("Pending");

            setEditId(null);

            fetchTasks();

        } catch (error) {

            console.log(error);

        }

    };


    // DELETE TASK

    const deleteTask = async (id) => {

        try {

            await axios.delete(
                `https://team-task-manager-production-a903.up.railway.app/api/tasks/${id}`,
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            fetchTasks();

        } catch (error) {

            console.log(error);

        }

    };


    // EDIT TASK

    const editTask = (task) => {

        setTitle(task.title);

        setDescription(task.description);

        setStatus(task.status);

        setEditId(task._id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    useEffect(() => {

        fetchTasks();

    }, []);


    return (

        <div className="min-h-screen bg-gray-100 p-10">

            {/* HEADER */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Tasks
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Create and manage tasks
                    </p>

                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                >
                    Dashboard
                </button>

            </div>


            {/* FORM */}

            {

                user?.role === "Admin" && (

                    <div className="bg-white p-6 rounded-xl shadow-md mb-8">

                        <h2 className="text-2xl font-semibold mb-4">

                            {

                                editId
                                    ? "Update Task"
                                    : "Create New Task"

                            }

                        </h2>

                        <input
                            value={title}
                            placeholder="Task Title"
                            className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-green-400"
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                        <input
                            value={description}
                            placeholder="Description"
                            className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-green-400"
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                        <select
                            value={status}
                            className="w-full p-3 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-green-400"
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                        >

                            <option>
                                Pending
                            </option>

                            <option>
                                In Progress
                            </option>

                            <option>
                                Completed
                            </option>

                        </select>

                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
                        >

                            {

                                editId
                                    ? "Update Task"
                                    : "Create Task"

                            }

                        </button>

                    </div>

                )

            }


            {/* TASKS GRID */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {

                    tasks.map((task) => (

                        <div
                            key={task._id}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition flex flex-col justify-between min-h-[220px]"
                        >

                            <h2 className="text-2xl font-bold mb-2 text-green-600">
                                {task.title}
                            </h2>

                            <p className="text-gray-600">
                                {task.description}
                            </p>


                            {/* STATUS + BUTTONS */}

                            <div className="flex items-center justify-between mt-6">

    {/* STATUS */}

    <span
        className={`w-[120px] text-center py-2 rounded-lg text-white font-semibold ${
            task.status === "Completed"
            ? "bg-green-500"
            : task.status === "In Progress"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
    >
        {task.status}
    </span>


    {/* BUTTONS */}

    {

        user?.role === "Admin" && (

            <div className="flex gap-3">

                <button
                    onClick={() =>
                        editTask(task)
                    }
                    className="w-[110px] bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
                >
                    Edit
                </button>

                <button
                    onClick={() =>
                        deleteTask(task._id)
                    }
                    className="w-[100px] bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                    Delete
                </button>

            </div>

        )

    }

</div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Tasks;