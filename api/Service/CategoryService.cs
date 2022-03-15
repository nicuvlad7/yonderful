using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;
using System.Drawing;
using YonderfulApi.Data;
using Microsoft.EntityFrameworkCore;

namespace YonderfulApi.Service
{
    public class CategoryService : ICategoryService
    {
        private readonly DataContext _context;
        public CategoryService(DataContext context) {
            _context = context;
        }
        public async Task<Category> GetCategory(int categoryId) {
            var category = await _context.Categories.FindAsync(categoryId);
            return category;
        }

       public async Task<IList<Category>> GetCategoryList() {
            var categoryList = await _context.Categories.ToListAsync();
            return categoryList;
        }
        
        public async Task<Category> PostCategory(string title, Image icon, Image defaultBackground) {
            if (await CategoryExists(title, icon, defaultBackground)) return null;

            var newCategory = new Category 
            {
                Title = title,
                Icon = icon,
                DefaultBackground = defaultBackground
            };

            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();
            return newCategory;
        }

        private async Task<bool> CategoryExists(string title, Image icon, Image defaultBackground)
        {
            return await _context.Categories.AnyAsync(cat => cat.Title.ToLower() == title.ToLower() && cat.Icon.Equals(icon) && cat.DefaultBackground.Equals(defaultBackground));
        }
  }
}