using System.Threading.Tasks;
using api.DTOs;
using api.Service;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LoginController : ControllerBase
  {
    private readonly ILoginService _loginService;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public LoginController(ILoginService loginService, IMapper mapper, IConfiguration configuration)
    {
      _loginService = loginService;
      _mapper = mapper;
      _configuration = configuration;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Post([FromBody] UserLoginDto loginUser)
    {
      var user = await _loginService.VerifyUserCredentials(loginUser);

      if (user == null) return Unauthorized("Invalid credentials.");

      loginUser.Token = _loginService.GenerateJwt(user, _configuration["Jwt:Issuer"], _configuration["Jwt:Key"]);

      return Ok(user);

    }
  }
}