using Microsoft.EntityFrameworkCore;
using YonderfulApi.Models;

namespace YonderfulApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}