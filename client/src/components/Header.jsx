const Header = ({ toggleSidebar }) => (
  <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-20 md:hidden flex justify-between items-center">
    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
    <button onClick={toggleSidebar} className="text-2xl">
      ☰
    </button>
  </div>
);

export default Header;
