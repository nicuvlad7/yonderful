using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using YonderfulApi.Data;
using YonderfulApi.Models;
using api.Service;

namespace YonderfulApi.Service
{
    public class UserService : IUserService
    {
        private HashingManager hashing = new HashingManager();
        private readonly DataContext _context;
        public UserService(DataContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserById(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            return user;
        }

        public async Task<IList<User>> GetUserList()
        {
            var userList = await _context.Users.ToListAsync();
            return userList;
        }

        public async Task<User> PostUser(string firstName, string lastName, string username, string email, string password)
        {
            if (await UserExists(username, email)) return null;

            var newUser = new User
            {
                FirstName = firstName,
                LastName = lastName,
                Username = username,
                Password = hashing.HashToString(password),
                Email = email
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return newUser;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            return await _context.SaveChangesAsync() > 0;
        }

        private async Task<bool> UserExists(string username, string email)
        {
            return await _context.Users.AnyAsync(u => u.Username.ToLower() == username.ToLower() ||
                                                        u.Email.ToLower() == email.ToLower());
        }
    }
}