using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;
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
        
        public async Task<Category> PostCategory(string title, int iconId, int defaultBackgroundId) 
        {
            if (await CategoryExists(title, iconId, defaultBackgroundId)) return null;

            var newCategory = new Category 
            {
                Title = title,
                IconId = iconId,
                DefaultBackgroundId = defaultBackgroundId
            };

            _context.Categories.Add(newCategory);
            await _context.SaveChangesAsync();
            return newCategory;
        }

        public async Task<bool> DeleteCategory(int categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            if(category == null) {
                return false;
            }
            _context.Categories.Remove(category);
            return await _context.SaveChangesAsync() > 0;
        }

        private async Task<bool> CategoryExists(string title, int iconId, int defaultBackgroundId)
        {
            return await _context.Categories.AnyAsync(cat => cat.Title.ToLower() == title.ToLower() && cat.IconId == iconId && cat.DefaultBackgroundId == defaultBackgroundId);
        }
  }
}