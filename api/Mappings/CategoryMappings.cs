using AutoMapper;
using YonderfulApi.DTOs;
using YonderfulApi.Models;


namespace YonderfulApi.Mappings
{
    public class CategoryMappings : Profile
    {
        public CategoryMappings()
        {
            // source -> target
            CreateMap<Category, CategoryDto>();   
        }
    }
}