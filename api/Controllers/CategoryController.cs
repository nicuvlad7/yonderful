using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YonderfulApi.DTOs;
using YonderfulApi.Service;
using YonderfulApi.Models;
using System;

namespace YonderfulApi.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase 
    {
        private readonly ICategoryService _categoryService;
        private readonly IPictureService _pictureService;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryService categoryService, IPictureService pictureService, IMapper mapper)
        {
            _categoryService = categoryService;
            _pictureService = pictureService;
            _mapper = mapper;
        }


        [HttpGet("{categoryId}")]
        public async Task<IActionResult> GetCategory(int categoryId)
        {
            var category = await _categoryService.GetCategory(categoryId);
            if(category == null) {
                return NotFound();
            }
            return Ok(_mapper.Map<CategoryDto>(category));
        }
        
        [HttpGet]
        public async Task<IActionResult> GetCategoryList() 
        {
            var categoryList = await _categoryService.GetCategoryList();
            if(categoryList == null) {
                return NotFound();
            }
            return Ok(_mapper.Map<IList<CategoryDto>>(categoryList));
        }

        [HttpPost]
        public async Task<IActionResult> PostCategory(CategoryDto category) 
        {   
            var iconId = await createPictureFromFileString(category.Icon);
            var defaultBackgroundId = await createPictureFromFileString(category.DefaultBackground);
            var newCategory = await _categoryService.PostCategory(category.Title, iconId, defaultBackgroundId);
            if(newCategory == null) {
                return BadRequest();
            }
            return Created(nameof(GetCategory), _mapper.Map<CategoryDto>(newCategory));
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCategory(int categoryId) {
            var removedCategory = await _categoryService.DeleteCategory(categoryId);
            return removedCategory ? Ok() : BadRequest();
        }

        private async Task<int> createPictureFromFileString(string fileString) {
            string fileName = fileString.Split('/')[^1];
            string fileType = fileString.Split('.')[^1];
            byte[] content = System.IO.File.ReadAllBytes(fileString);

            var newPicture = await _pictureService.PostPicture(fileName, fileType, content);
            if(newPicture == null) {
                return _pictureService.GetPictureByNameAndFormat(fileName, fileType).Id;
            }
            return newPicture.Id;
        }
    }
}