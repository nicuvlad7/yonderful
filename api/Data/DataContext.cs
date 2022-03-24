using YonderfulApi.Models;
using Microsoft.EntityFrameworkCore;


namespace YonderfulApi.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Picture> Pictures { get; set; }
    public DbSet<User> Users { get; set; }

    public DbSet<MockEvent> MockEvents { get; set; } //mock db
  }
}