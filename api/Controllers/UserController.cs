using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Models;
using api.Service;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController:ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            var user = await _userService.GetUser(userId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpGet]
        public async Task<IActionResult> GetUserList()
        {
            var userList = await _userService.GetUserList();
            if (userList == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<IList<UserDto>>(userList));
        }


        [HttpPost]
        public async Task<IActionResult> PostUser(UserDto user)
        {
            var newUser = await _userService.PostUser(user.Email, user.Name, user.Role, user.PhoneNo);
            if (newUser == null)
            {
                return BadRequest();
            }
            return Created(nameof(GetUser), _mapper.Map<UserDto>(newUser));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var removedUser = await _userService.DeleteUser(userId);
            return removedUser ? Ok() : BadRequest();
        }


        //partially implemented
        [HttpPut]
        public async Task<IActionResult> PutUser(User user)
        {
            var newUser = await _userService.PutUser(user.Id, user.Email, user.Name, user.Role, user.PhoneNo);
            if (newUser == null)
            {
                return BadRequest();
            }
            return Created(nameof(GetUser), _mapper.Map<User>(newUser));
        }




    }
}