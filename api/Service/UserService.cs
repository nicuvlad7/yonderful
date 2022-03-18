using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;
using YonderfulApi.Data;

namespace api.Service
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

    public async Task<User> GetUserByEmail(string email)
    {
      var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
      return user;
    }

    public async Task<IList<User>> GetUserList()
    {
      var userList = await _context.Users.ToListAsync();
      return userList;
    }

    public async Task<User> PostUser(User user)
    {
      var newUser = new User
      {
        Name = user.Name,
        Password = hashing.HashToString(user.Password),
        Email = user.Email
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

    private async Task<bool> UserExists(string email)
    {
      return await _context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }

    public async Task<User> PutUser(User user)
    {
      var existingUser = await _context.Users.FindAsync(user.Id);
      if (existingUser == null) return null;

      existingUser.Email = user.Email;
      existingUser.Name = user.Name;
      existingUser.UserRole = user.UserRole;
      existingUser.Position = user.Position;
      existingUser.Password = hashing.HashToString(user.Password);
      existingUser.PhoneNo = user.PhoneNo;

      _context.Users.Update(existingUser);
      await _context.SaveChangesAsync();
      return existingUser;
    }
  }
}