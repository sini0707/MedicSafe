import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../../../../backend/config/db";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Pagination from "../../components/Pagination/Pagination.jsx";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${baseURL}/admin/userlist`, {
        method: "GET",
      });
      const result = await res.json();

      setUsers(result.userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data");
    }
  };

  const dispatch = useDispatch();

  const handleBlock = async (userId) => {
    try {
      const res = await fetch(`${baseURL}/admin/block-user/${userId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const updatedUser = await res.json();

        toast.success("User blocked successfully");
        setUsers(
          users.map((user) => {
            if (user._id === userId) {
              return { ...user, blocked: true };
            }
            return user;
          })
        );

        if (updatedUser.blocked) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
        }
      } else {
        console.error("Failed to block user");
        toast.error("Failed to block user");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Failed to block user");
    }
  };
  const handleUnblock = async (userId) => {
    try {
      const res = await fetch(`${baseURL}/admin/unblock-user/${userId}`, {
        method: "PUT",
      });
      if (res.ok) {
        toast.success("User unblocked successfully");

        setUsers(
          users.map((user) => {
            if (user._id === userId) {
              return { ...user, blocked: false };
            }
            return user;
          })
        );
      } else {
        toast.error("Failed to unblock user");
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("Failed to unblock user");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const indexOfLastUser = currentPage * postsPerPage;
  const indexOfFirstUser = indexOfLastUser - postsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <section className="container">
      <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="md:w-1/3 my-2 mx-4 p-5 text-center rounded-lg border-4 border-blue-500 bg-blue-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl.No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Blood Group
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="border-2">
            {currentUsers.map((user, index) => (
              <tr className="bg-white border-b hover:bg-gray-200" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {(currentPage - 1) * postsPerPage + index + 1}
                </th>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.blood}</td>
                <td className="px-6 py-4">{user.gender}</td>
                {user.blocked ? (
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        handleUnblock(user._id);
                      }}
                      className="bg-yellow-100 hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
                    >
                      Unblock
                    </button>
                  </td>
                ) : (
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        handleBlock(user._id);
                      }}
                      className="bg-red-100 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                    >
                      Block
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {users.length === 0 && (
              <tr className="bg-white border-b hover:bg-gray-200">
                <td
                  colSpan={5}
                  className="px-6 py-4 font-medium text-gray-900 text-center"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPosts={users.length}
        postPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </section>
  );
};

export default AdminUsers;
