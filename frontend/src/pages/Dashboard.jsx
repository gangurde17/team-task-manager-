import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}

            <div className="bg-blue-600 text-white px-10 py-5 flex justify-between items-center shadow-md">

                <h1 className="text-3xl font-bold">
                    Team Task Manager
                </h1>

                <button
                    onClick={() => {
                        localStorage.clear();
                        navigate("/");
                    }}
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
                >
                    Logout
                </button>

            </div>


            {/* Main Content */}

            <div className="p-10">

                <h2 className="text-4xl font-bold mb-2">
                    Welcome, {user?.name}
                </h2>

                <p className="text-gray-600 text-lg mb-8">
                    Role: {user?.role}
                </p>


                {/* Cards */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white p-6 rounded-xl shadow-md">

                        <h3 className="text-xl font-semibold mb-2">
                            Projects
                        </h3>

                        <p className="text-gray-500 mb-4">
                            Manage all team projects
                        </p>

                        <button
                            onClick={() => navigate("/projects")}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                            Open
                        </button>

                    </div>


                    <div className="bg-white p-6 rounded-xl shadow-md">

                        <h3 className="text-xl font-semibold mb-2">
                            Tasks
                        </h3>

                        <p className="text-gray-500 mb-4">
                            Create and track tasks
                        </p>

                        <button
                            onClick={() => navigate("/tasks")}
                            className="bg-green-600 text-white px-5 py-2 rounded-lg"
                        >
                            Open
                        </button>

                    </div>


                    <div className="bg-white p-6 rounded-xl shadow-md">

                        <h3 className="text-xl font-semibold mb-2">
                            Dashboard
                        </h3>

                        <p className="text-gray-500 mb-4">
                            Monitor team productivity
                        </p>

                        <button
                            className="bg-purple-600 text-white px-5 py-2 rounded-lg"
                        >
                            Active
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;