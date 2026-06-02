export default function InputField( {label , type , placeholder} ){
    return(
        <div>
            <label className="block text-gray-700 font-medium">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          />
        </div>
    );
}