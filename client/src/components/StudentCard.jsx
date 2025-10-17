import { Link } from "react-router-dom";

const StudentCard = ({name, email, phone, current_class, attendance})=>{
    return(
<div className="max-w-6xl mx-auto p-4 bg-inherit shadow-lg rounded-lg font-sans">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start">
    {/* Name & Email */}
    <div className="flex flex-col space-y-1">
      <span className="text-sm text-blue-500">Name</span>
      <span className="text-base font-medium text-white">{name}</span>
      <span className="text-sm text-blue-500">Email</span>
      <span className="text-base font-thin text-white">{email}</span>
    </div>

    {/* Phone */}
    <div className="flex flex-col space-y-1">
      <span className="text-sm text-blue-500">Phone</span>
      <span className="text-base font-thin text-white">{phone}</span>
    </div>

    {/* Class */}
    <div className="flex flex-col space-y-1">
      <span className="text-sm text-blue-500">Class</span>
      <span className="text-base font-thin text-white">{current_class}</span>
    </div>

    {/* Attendance */}
    <div className="flex flex-col space-y-1">
      <span className="text-sm text-blue-500">Attendance</span>
      <span className="text-base font-thin text-white">{attendance}</span>
    </div>

    {/* Action Button */}
    <div className="flex items-start justify-start lg:justify-end">
      <Link to={`/admin-dashboard/student-dashboard?email=${email}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        View Profile
      </Link>
    </div>
  </div>
</div>


    )
}

export default StudentCard;