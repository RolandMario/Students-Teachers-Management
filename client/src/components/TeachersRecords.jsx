const TeachersRecords = ({name, email, phone, current_class, subjects})=>{
    
    return(

<div className="overflow-x-auto w-full">
  <table className="min-w-full table-auto  rounded-md shadow-sm">
<tbody className="text-sm text-white">
  <tr className="hover:bg-black">
    <td className="px-4 py-2 border-b text-left align-middle">{name}</td>
    <td className="px-4 py-2 border-b text-left align-middle">{phone}</td>
    <td className="px-4 py-2 border-b text-left align-middle">{current_class}</td>
    <td className="px-4 py-2 border-b text-left align-middle">{subjects}</td>
    <td className="px-4 py-2 border-b text-left align-middle">
      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
        View
      </button>
    </td>
  </tr>
</tbody>

  </table>
</div>


    )
}

export default TeachersRecords;