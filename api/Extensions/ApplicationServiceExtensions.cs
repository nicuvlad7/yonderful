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
            services.AddScoped<IPictureService, PictureService>();
            services.AddScoped<ICategoryService, CategoryService>();

            services.AddScoped<IUserService, UserService>();
            return services;
        }

        public static IServiceCollection AddMappingServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddAutoMapper(typeof(CategoryMappings));
            services.AddAutoMapper(typeof(UserMappings));
            return services;
        }
    }
}