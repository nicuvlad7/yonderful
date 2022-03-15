using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;

namespace YonderfulApi.Service
{
    public interface IUserService
    {
        Task<IList<User>> GetUserList();
        Task<User> GetUserById(int userId);
        Task<User> PostUser(string firstName, string lastName, string username, string email, string password);
        Task<bool> DeleteUser(int id);
    }
}