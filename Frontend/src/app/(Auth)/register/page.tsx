import Link from "next/link";
import { redirect } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

export default async function RegisterPage() {
    const RegisterUser = async (addRegisterForm: FormData) => {
        'use server'
        const name = addRegisterForm.get('name');
        const email = addRegisterForm.get('email');
        const tel = addRegisterForm.get('tel');
        const password = addRegisterForm.get('password');

        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    tel: tel,
                    password: password
                })
            });

            if (!response.ok) throw new Error("Registration failed");
            console.log("Register Success");
        } catch (err) {
            console.log(err);
        }
        redirect('./')
    }

    return (
        <body className="flex justify-center items-center h-scree bg-cover bg-center bg-no-repeat">
            <form action={RegisterUser} className="bg-purple-400/30 backdrop-blur-sm rounded-lg my-5 px-3 py-5 w-[50%] text-center h-[60%]">
                <div className="text-5xl text-center text-black font-bold p-6">Register</div>
                <div className="flex justify-center items-center w-full  my-7">
                    <input type="text" required id='name' name="name" placeholder="Enter your name"
                    className="bg-gray-700  border-2 border-gray-400 rounded-full w-4/5 p-2 text-white focus:outline-none focus:border-blue-400 placeholder-gray-100" />
                </div>
                <div className="flex justify-center items-center  my-7">
                    <input type="text" required id='tel' name="tel" placeholder="Enter your telephone number"
                    className="bg-gray-700  border-2 border-gray-400 rounded-full w-4/5 p-2 text-white focus:outline-none focus:border-blue-400 placeholder-gray-100" />
                </div>
                <div className="flex justify-center items-center  my-7">
                    <input type="text" required id='email' name="email" placeholder="Enter your email"
                    className="bg-gray-700  border-2 border-gray-400 rounded-full w-4/5 p-2 text-white focus:outline-none focus:border-blue-400 placeholder-gray-100" />
                </div>
                <div className="flex justify-center items-center  my-7">
                    <input type="password" required id='password' name="password" placeholder="Enter your password"
                    className="bg-gray-700  border-2 border-gray-400 rounded-full w-4/5 p-2 text-white focus:outline-none focus:border-blue-400 placeholder-gray-100" />
                </div>
                <div className="flex flex-col gap-4 items-center">
                    <button type="submit" className="bg-black hover:scale-105 transition duration-100 
                    text-white p-2 font-medium rounded-full px-5 text-xl">
                        Register
                    </button>
                    <Link href="/" className="bg-black hover:scale-105 transition duration-100 
                    text-white p-2 font-medium rounded-full px-5 text-xl flex items-center gap-1" >
                        <IoMdArrowRoundBack/> Back
                    </Link>
                </div>
            </form>
        </body>
    )
}