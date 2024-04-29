'use client'

export default function InputCompo({name, text, type, handleChange, error} : {name:string, text:string, type:string, handleChange?: Function, error?: any}) {
    return (
        <div className="flex justify-center items-center my-7 flex-col">
            <input type={type} required id={name} name={name} placeholder={`Please Enter ${text}`} onChange={(e) => handleChange ? handleChange(e) : () => {}}
            className="bg-gray-700  border-2 border-gray-400 rounded-full w-4/5 p-2 text-white focus:outline-none focus:border-blue-400 placeholder-gray-100" />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    )
}