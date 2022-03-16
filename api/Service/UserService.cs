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

    private readonly DataContext _context;
    public UserService(DataContext context)
    {
        _context = context;
    }
    public async Task<bool> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return false;

        _context.Users.Remove(user);
        return await _context.SaveChangesAsync() > 0;

    }

    public async Task<User> GetUser(int employeeId)
    {
        var user = await _context.Users.FindAsync(employeeId);
        return user;
    }

    public async Task<IList<User>> GetUserList()
    {
        var employeeList = await _context.Users.ToListAsync();
        return employeeList;
    }

    public async Task<User> PostUser(User user)
    {
        if (await UserExists(user.Email)) return null;

        var newUser = new User
        {
            Email = user.Email,
            Name = user.Name,
            Role=user.Role,
            Position=user.Position,
            PhoneNo=user.PhoneNo
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
        return newUser;
    }


    public async Task<User> PutUser(User user)
    {
        var existingUser = await _context.Users.FindAsync(user.Id);
        if (existingUser == null) return null;

        existingUser.Email=user.Email;
        existingUser.Name=user.Name;
        existingUser.Role=user.Role;
        existingUser.Position=user.Position;
        existingUser.PhoneNo=user.PhoneNo;

        _context.Users.Update(existingUser);
        await _context.SaveChangesAsync();
        return existingUser;

    }

    
    private async Task<bool> UserExists(string email)
    {
        return await _context.Users.AnyAsync(usr => usr.Email.ToLower() == email.ToLower());
    }

  }
}