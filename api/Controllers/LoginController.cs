using System.Threading.Tasks;
using api.DTOs;
using api.Service;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController: ControllerBase
    {
        private readonly ILoginService _loginService;
        private readonly IMapper _mapper;

        public LoginController(ILoginService loginService, IMapper mapper)
        {
            _loginService = loginService;
            _mapper = mapper;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserLoginDto loginUser)
        {
            var user = await _loginService.VerifyUserCredentials(loginUser);

            if (user == null) return Unauthorized("Invalid username or password.");
            
            return Ok();

        }
    }
}