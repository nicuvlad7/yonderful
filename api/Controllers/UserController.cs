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
  public class UserController : ControllerBase
  {
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public UserController(IUserService userService, IMapper mapper)
    {
      _userService = userService;
      _mapper = mapper;
    }

    [HttpGet("Id/{userId}")]
    public async Task<IActionResult> GetUserById(int userId)
    {
      var user = await _userService.GetUserById(userId);
      if (user == null)
      {
        return NotFound("No user with given id!");
      }
      return Ok(_mapper.Map<UserDto>(user));
    }

    [HttpGet("email/{email}")]
    public async Task<IActionResult> GetUserByEmail(string email)
    {
      var user = await _userService.GetUserByEmail(email);
      if (user == null)
      {
        return NotFound("No user with given id!");
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
      if (await _userService.GetUserByEmail(user.Email) == null)
      {
        var newUser = _mapper.Map<UserDto, User>(user);
        var postUser = await _userService.PostUser(newUser);
        return Ok("Your account was successfully created.");
      }
      return BadRequest("User with given email already exists!");
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteUser(int userId)
    {
      var removedUser = await _userService.DeleteUser(userId);
      return removedUser ? Ok("User deleted succesfully!") : BadRequest("User with given id does not exist!");
    }

    [HttpPut]
    public async Task<IActionResult> PutUser(User user)
    {
      var newUser = await _userService.PutUser(user);
      if (newUser == null)
      {
        return BadRequest();
      }
      return Created(nameof(GetUserById), newUser);
    }
  }
}