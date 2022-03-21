using System.Collections.Generic;
using System.Threading.Tasks;
using YonderfulApi.Models;
using YonderfulApi.Data;
using Microsoft.EntityFrameworkCore;
using YonderfulApi.DTOs;
using Microsoft.AspNetCore.Components;

namespace YonderfulApi.Service
{
    public class CategoryService : ICategoryService
    {
        private readonly DataContext _context;
        private readonly IPictureService _pictureService;
        public CategoryService(DataContext context, IPictureService pictureService) {
            _context = context;
            _pictureService = pictureService;
        }

    public async Task<Category> GetCategory(int categoryId) {
        var category = await _context.Categories.FindAsync(categoryId);
        return category;
    }

    public async Task<IList<Category>> GetCategoryList() {
        var categoryList = await _context.Categories.ToListAsync();
        return categoryList;
    }
    
    public async Task<Category> PostCategory(Category newCategory) 
    {
        if (await CategoryExists(newCategory)) return null;

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

    public async Task<Category> PutCategory(int categoryId, Category categoryToPut)
    {
      var category = await _context.Categories.FindAsync(categoryId);
        if(category == null) {
            return null;
        }
        category = categoryToPut;

        _context.Categories.Update(category);
        await _context.SaveChangesAsync();
        return category;
    }
    private async Task<bool> CategoryExists(Category category)
    {
        return await _context.Categories.AnyAsync(cat => cat.Title.ToLower() == category.Title.ToLower());
    }

    public async Task<CategoryOutputDto> TransformCategoryDtoForOutput(CategoryOutputDto categoryOutputDto) {
        if(categoryOutputDto != null) {
            categoryOutputDto.Icon = await _pictureService.GetPictureContent(categoryOutputDto.Icon);
            categoryOutputDto.DefaultBackground = await _pictureService.GetPictureContent(categoryOutputDto.DefaultBackground);
        }
        return categoryOutputDto;
    }

    public async Task<IList<CategoryOutputDto>> TransformCategoryDtoListForOutput(IList<CategoryOutputDto> categoryList) {
        IList<CategoryOutputDto> outputCategoryList = new List<CategoryOutputDto>();
        foreach(CategoryOutputDto categoryOutputDto in categoryList) {
            outputCategoryList.Add(await TransformCategoryDtoForOutput(categoryOutputDto));
        }
        return outputCategoryList;
    }

    public async Task<Category> CreateCategory(CategoryDto categoryDto) {
        Category newCategory = new Category {
            Title = categoryDto.Title,
            IconId = await _pictureService.CreatePictureByContent(categoryDto.Icon),
            DefaultBackgroundId = await _pictureService.CreatePictureByContent(categoryDto.DefaultBackground)
        };
        return newCategory;
    }
  }
}