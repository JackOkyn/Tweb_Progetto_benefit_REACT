
import logo from "../assets/icon.png";
import AuthButtons from "./AuthButtons"; // se lo hai chiamato così


const Navbar = () => {
    return (
        <nav className="bg-blue-900 text-white flex items-center justify-between px-4 py-3 shadow-md relative">
            <div className="flex items-center space-x-2">
                <img src={logo} alt="IceKeeper Logo" className="h-8 w-8" />
                <h1 className="text-xl font-bold">IceKeeper</h1>
            </div>

            {/* Invece dei pulsanti, usiamo il componente che gestisce Login/SignUp/Logout */}
            <AuthButtons />
        </nav>
    );
};

export default Navbar;
