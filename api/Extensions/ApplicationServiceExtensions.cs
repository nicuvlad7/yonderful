using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using YonderfulApi.Mappings;
using YonderfulApi.Service;

namespace YonderfulApi.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IPictureService, PictureService>();
            
            return services;
        }

        public static IServiceCollection AddMappingServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddAutoMapper(typeof(EmployeeMappings));
            services.AddAutoMapper(typeof(CategoryMappings));
            return services;
        }
    }
}