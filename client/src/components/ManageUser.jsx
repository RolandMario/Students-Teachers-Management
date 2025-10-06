const ManageUser = ({ label, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center hover:bg-gray-50 cursor-pointer">
    <span className="text-2xl mr-2">{icon}</span>
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </div>
);

export default ManageUser;
