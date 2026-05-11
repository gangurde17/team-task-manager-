import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Projects() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const token = localStorage.getItem("token");

    const [projects, setProjects] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [editId, setEditId] = useState(null);


    // FETCH

    const fetchProjects = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/projects",
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            setProjects(res.data);

        } catch (error) {

            console.log(error);

        }

    };


    // CREATE OR UPDATE

    const handleSubmit = async () => {

        if (!title || !description) {

            return alert("Fill all fields");

        }

        try {

            // UPDATE

            if (editId) {

                await axios.put(
                    `http://localhost:5000/api/projects/${editId}`,
                    {
                        title,
                        description
                    },
                    {
                        headers: {
                            authorization: token
                        }
                    }
                );

                alert("Project Updated");

            }

            // CREATE

            else {

                await axios.post(
                    "http://localhost:5000/api/projects",
                    {
                        title,
                        description
                    },
                    {
                        headers: {
                            authorization: token
                        }
                    }
                );

                alert("Project Created");

            }

            setTitle("");
            setDescription("");
            setEditId(null);

            fetchProjects();

        } catch (error) {

            console.log(error);

        }

    };


    // DELETE

    const deleteProject = async (id) => {

        try {

            await axios.delete(
                `https://team-task-manager-production-a903.up.railway.app/api/projects/${id}`,
                {
                    headers: {
                        authorization: token
                    }
                }
            );

            fetchProjects();

        } catch (error) {

            console.log(error);

        }

    };


    // EDIT

    const editProject = (project) => {

        setTitle(project.title);

        setDescription(project.description);

        setEditId(project._id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    useEffect(() => {

        fetchProjects();

    }, []);


    return (

        <div className="min-h-screen bg-gray-100 p-10">

            {/* HEADER */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Projects
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Manage all your team projects
                    </p>

                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
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
                                    ? "Update Project"
                                    : "Create New Project"

                            }

                        </h2>

                        <input
                            value={title}
                            placeholder="Project Title"
                            className="w-full p-3 border rounded-lg mb-4"
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                        <input
                            value={description}
                            placeholder="Description"
                            className="w-full p-3 border rounded-lg mb-4"
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                        >

                            {

                                editId
                                    ? "Update Project"
                                    : "Create Project"

                            }

                        </button>

                    </div>

                )

            }


            {/* PROJECTS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {

                    projects.map((project) => (

                        <div
                            key={project._id}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >

                            <h2 className="text-2xl font-bold mb-2 text-blue-600">
                                {project.title}
                            </h2>

                            <p className="text-gray-600 mb-4">
                                {project.description}
                            </p>

                            {

                                user?.role === "Admin" && (

                                    <div className="flex gap-2">

                                        <button
                                            onClick={() =>
                                                editProject(project)
                                            }
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteProject(project._id)
                                            }
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                )

                            }

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Projects;