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

    public async Task<User> PostUser(string email, string name, Role role, ulong? phoneNo)
    {
      
        if (await UserExists(email)) return null;

        var newUser = new User
        {
            Email = email,
            Name = name,
            Role=role,
            PhoneNo=phoneNo
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();
        return newUser;
    }

    public async Task<User> PutUser(int id, string email, string name, Role role, ulong? phoneNo)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return null;

        user = new User
        {
            Id = user.Id,
            Email = email,
            Name = name,
            Role=role,
            PhoneNo=phoneNo
        };

        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return user;

    }

    
    private async Task<bool> UserExists(string email)
    {
        return await _context.Users.AnyAsync(usr => usr.Email.ToLower() == email.ToLower());
    }

  }
}