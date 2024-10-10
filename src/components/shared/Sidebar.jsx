import React from "react";
import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaBox,
    FaChartBar,
    FaCog,
    FaTimes,
    FaList,
    FaTruck,
    FaUser,
} from "react-icons/fa";
import "../../styles/colors.css";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../store/authSlice";

const SidebarLink = ({ to, icon, text }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center px-4 py-2 mt-2 text-sm transition-colors duration-200 ease-in-out rounded-lg ${
                isActive ? "bg-opacity-25" : "hover:bg-opacity-10"
            }`
        }
        style={({ isActive }) => ({
            backgroundColor: isActive ? "var(--color-primary)" : "transparent",
            color: isActive
                ? "var(--color-text-primary)"
                : "var(--color-text-secondary)",
        })}
    >
        {icon}
        <span className="mx-4">{text}</span>
    </NavLink>
);

const Sidebar = ({ isOpen, onClose }) => {
  const userRole = useSelector(selectUserRole);
  // console.log(userRole)
    return (
        <div
            className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } lg:relative lg:translate-x-0`}
            style={{
                backgroundColor: "var(--color-card-background)",
                borderRight: "1px solid var(--color-border)",
            }}
        >
            <div className="flex items-center justify-between p-4 lg:hidden">
                <h2
                    className="text-xl font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    Menu
                </h2>
                <button
                    onClick={onClose}
                    style={{ color: "var(--color-text-primary)" }}
                >
                    <FaTimes size={24} />
                </button>
            </div>
            <div className="flex flex-col h-full py-4">
                <h2
                    className="text-2xl font-semibold text-center mb-6"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    Inventory
                </h2>
                <nav className="flex-1">
                    <SidebarLink
                        to="/"
                        icon={<FaHome className="w-5 h-5" />}
                        text="Dashboard"
                    />
                    <SidebarLink
                        to="/inventory"
                        icon={<FaBox className="w-5 h-5" />}
                        text="Inventory"
                    />
                    <SidebarLink
                        to="/reports"
                        icon={<FaChartBar className="w-5 h-5" />}
                        text="Reports"
                    />
                    <SidebarLink
                        to="/manage-categories"
                        icon={<FaList className="w-5 h-5" />}
                        text="Manage Categories"
                    />
                    <SidebarLink
                        to="/manage-suppliers"
                        icon={<FaTruck className="w-5 h-5" />}
                        text="Manage Suppliers"
                    />
                    {userRole === "admin" && (
                        <SidebarLink
                            to="/manage-users"
                            icon={<FaUser className="w-5 h-5" />}
                            text="Manage Users"
                        />
                    )
                    }
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
