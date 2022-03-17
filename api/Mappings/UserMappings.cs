using AutoMapper;
using YonderfulApi.DTOs;
using YonderfulApi.Models;

namespace YonderfulApi.Mappings
{
    public class UserMappings : Profile
    {
        public UserMappings()
        {
            // source -> target
            CreateMap<User, UserDto>();
        }
    }
}