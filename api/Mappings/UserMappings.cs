using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Models;
using AutoMapper;

namespace api.Mappings
{
    public class UserMappings: Profile
    {
        public UserMappings()
        {
            CreateMap<User, UserDto>();

            CreateMap<UserDto, User>();
        }
    }
}