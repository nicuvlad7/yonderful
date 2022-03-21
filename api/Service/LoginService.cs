using System.Threading.Tasks;
using api.DTOs;
using Microsoft.EntityFrameworkCore;
using YonderfulApi.Data;
using YonderfulApi.Models;

namespace api.Service
{
  public class LoginService : ILoginService
  {
    private readonly DataContext _dataContext;
    private HashingManager _hashingManager;

    public LoginService(DataContext dataContext)
    {
      _dataContext = dataContext;
      _hashingManager = new();
    }

    public Task<User> Login(UserLoginDto userLogin)
    {
      throw new System.NotImplementedException();
    }

    public async Task<User> VerifyUserCredentials(UserLoginDto userLogin)
    {
      var user = await _dataContext.Users.FirstOrDefaultAsync(user => user.Email == userLogin.Email );

      if (user == null || !_hashingManager.Verify(userLogin.Password, user.Password)) return null;

      return user;
    }
  }
}