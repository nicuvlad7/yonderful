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
    Task<User> GetUserById(int userId);
    Task<User> GetUserByEmail(string email);
    Task<User> PostUser(User user);
    Task<User> PutUser(User user);
    Task<bool> DeleteUser(int id);
  }
}