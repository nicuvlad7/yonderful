using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;

namespace YonderfulApi.Service
{
    public interface IUserService
    {
        Task<IList<User>> GetUserList();
        Task<User> GetUserById(int userId);
        Task<User> GetUserByEmail(string email);
        Task<User> PostUser(User user);
        Task<bool> DeleteUser(int id);
    }
}