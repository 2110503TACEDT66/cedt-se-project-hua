export default function InputCompo({name, text, type} : {name:string, text:string, type:string}) {
    return (
        <div className="flex items-center my-2">
            <label className="w-auto block text-gray-700 pr-4" htmlFor={name}>{text}</label>
            <input type={type} required id={name} name={name} placeholder={`Please Enter ${text}`}
            className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
        </div>
    )
}