'use client'

export default function InputCompo({name, text, type, handleChange, error, initial} : {name:string, text:string, type:string, handleChange?: Function, error?: any, initial?: any}) {
    return (
        <div className="flex justify-center items-center my-7 flex-col">
            <input type={type} required id={name} name={name} placeholder={`Please Enter ${text}`} value={initial} onChange={(e) => handleChange ? handleChange(e) : () => {}}
            className="bg-gray-50  border-2 border-gray-700 rounded-2xl w-4/5 p-2 text-black focus:outline-none focus:border-blue-400 placeholder-gray-500"/>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    )
}