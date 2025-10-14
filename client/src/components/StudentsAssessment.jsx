import { Link } from "react-router-dom";

export function StudentsAssessment(params) {
    return(
            <div className=' sm:justify-self-end'>
              <Link to='/admin-dashboard/student-dashboard' className=' bg-indigo-500 p-2 text-white rounded-sm '>View</Link>
            </div>
    )
}