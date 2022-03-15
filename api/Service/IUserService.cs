using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Service
{
    public interface IUserService
    {
        Task<IList<User>> GetUserList();
        Task<User> GetUser(int employeeId);
        Task<User> PostUser(string email, string name, Role role, string phoneNo);
        Task<User> PutUser(int id, string email, string name, Role role, string phoneNo);
        Task<bool> DeleteUser(int id);
    }
}