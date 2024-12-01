"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./main.css";
import { useRouter } from "next/navigation";

const Home = ({ children }) => {
    const router = useRouter()
    const [img, setImg] = useState(null);
    const [role, setRole] = useState("Guest");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");

    const getData = async () => {
        try {
            const response = await axios("/api/getUserData");
            const image = response.data.user?.img;
            const formattedImg = image.startsWith("data:image/") ? image : `data:image/jpeg;base64,${image}`;

            const gloData = {
                img: formattedImg,
                role: response.data.user?.role || "Guest",
                name: response.data.user?.name || "",
                email: response.data.user?.email || "",
                department: response.data.user?.department || "",
            };
            setImg(formattedImg);
            setRole(gloData.role);
            setName(gloData.name);
            setEmail(gloData.email);
            setDepartment(gloData.department);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const logout = async () => {
        const response = await axios("/api/logout")
        if (response.data.status === 200) {
            alert("logout sucessfull")
            router.push("/login")
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className=" bg-gray-200">
            {/* Navigation Bar */}
            <nav className="bg-blue-600 h-20 flex justify-between items-center px-6">
                <h1 className="text-white text-xl font-bold">MMC COURSE PLATFORM</h1>
                <div id="profile" className="flex items-center space-x-4">
                    <Link href="/profile">
                        <img src={img} alt="Profile" className="w-14 h-14 rounded-full" />
                    </Link>
                    <button type="button" onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
                    {role === "admin" ? (
                        <Link href="/dashboard">
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                Dashboard
                            </button>
                        </Link>
                    ) : (
                        <p></p>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div id="dept_course" className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                {/* Department Links */}
                <div id="dept" className="h-[900px] bg-white p-2 rounded-lg shadow-md row-span-3 flex flex-col space-y-5">
                    <Link href="/project/course/computer_science" className="p-4 rounded-lg border-b-2 border-gray-700 text-black text-lg active:bg-blue-600 focus:bg-blue-600 focus:text-white">Computer Science</Link>
                    <Link href="/project/course/Commerce" className="p-4 rounded-lg border-b-2 border-gray-700 text-black text-lg active:bg-blue-600 focus:bg-blue-600 focus:text-white">Commerce</Link>
                    <Link href="/project/course/hotel_Management" className="p-4 rounded-lg border-b-2 border-gray-700 text-black text-lg active:bg-blue-600 focus:bg-blue-600 focus:text-white">Hotel Management</Link>
                    <Link href="/project/course/Physics" className="p-4 rounded-lg border-b-2 border-gray-700 text-black text-lg active:bg-blue-600 focus:bg-blue-600 focus:text-white">Physics</Link>
                    <Link href="/project/course/Mathematics" className="p-4 rounded-lg border-b-2 border-gray-700 text-black text-lg active:bg-blue-600 focus:bg-blue-600 focus:text-white">Mathematics</Link>
                    <Link href="/project/course/Chemistry" className="p-4 rounded-lg border-b-2 border-gray-700 text-black text-lg active:bg-blue-600 focus:bg-blue-600 focus:text-white">Chemistry</Link>
                    <Link href="/project/course/Bio_Technology" className="p-4 rounded-lg border-b-2 border-gray-700 text-black text-lg active:bg-blue-600 focus:bg-blue-600 focus:text-white">Bio Technology</Link>
                    <Link href="/project/course/Microbiology" className="p-4 rounded-lg border-b-2 border-gray-700 text-black text-lg active:bg-blue-600 focus:bg-blue-600 focus:text-white">Microbiology</Link>
                    <Link href="/project/course/English" className="p-4 rounded-lg border-b-2 border-gray-700 text-black text-lg active:bg-blue-600 focus:bg-blue-600 focus:text-white">English</Link>
                    <Link href="/project/course/Forensic_Science" className="p-4 rounded-lg border-b-2 border-gray-700 text-black text-lg active:bg-blue-600 focus:bg-blue-600 focus:text-white">Forensic Science</Link>
                    <Link href="/project/course/Sanitary_Inspector" className="p-4 rounded-lg border-b-2 border-gray-700 text-black text-lg active:bg-blue-600 focus:bg-blue-600 focus:text-white">Sanitary Inspector</Link>
                </div>

                {/* Course Content */}
                <div id="course" className="h-[900px] col-span-3 bg-white p-6 rounded-lg shadow-md overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Home;
