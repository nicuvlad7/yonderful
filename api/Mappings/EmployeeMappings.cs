using AutoMapper;
using YonderfulApi.DTOs;
using YonderfulApi.Models;

namespace YonderfulApi.Mappings
{
    public class EmployeeMappings : Profile
    {
        public EmployeeMappings()
        {
            // source -> target
            CreateMap<Employee, EmployeeDto>();
        }
    }
}