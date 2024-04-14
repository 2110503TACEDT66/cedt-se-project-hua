'use client'

export default function InputCompo({name, text, type, handleChange} : {name:string, text:string, type:string, handleChange?: Function}) {
    return (
        <div className="flex justify-center items-center my-7">
            <input type={type} required id={name} name={name} placeholder={`Please Enter ${text}`} onChange={(e) => handleChange ? handleChange(e) : () => {}}
            className="bg-gray-700  border-2 border-gray-400 rounded-full w-4/5 p-2 text-white focus:outline-none focus:border-blue-400 placeholder-gray-100" />
        </div>
    )
}