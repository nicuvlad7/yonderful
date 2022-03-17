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
            var categoryDto = TransformCategoryDtoForOutput(_mapper.Map<CategoryDto>(category));
            return Ok(categoryDto);
        }
        
        [HttpGet]
        public async Task<IActionResult> GetCategoryList() 
        {
            var categoryList = await _categoryService.GetCategoryList();
            if(categoryList == null) {
                return NotFound();
            }
            var categoryDtoList = _mapper.Map<IList<CategoryDto>>(categoryList);
            return Ok(TransformCategoryDtoListForOutput(categoryDtoList));
        }

        [HttpPost]
        public async Task<IActionResult> PostCategory(CategoryDto category) 
        {   
            Category newCategory = CreateCategory(category);
            
            var createdCategory = await _categoryService.PostCategory(newCategory);
            if(createdCategory == null) {
                return BadRequest();
            }
            return Created(nameof(GetCategory), _mapper.Map<CategoryDto>(createdCategory));
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCategory(int categoryId) {
            var removedCategory = await _categoryService.DeleteCategory(categoryId);
            return removedCategory ? Ok() : BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult> PutCategory(int categoryId, CategoryDto updatedCategory) {
            Category categoryToPut = CreateCategory(updatedCategory);

            var newCategory = await _categoryService.PutCategory(categoryId, categoryToPut);
            if(newCategory == null) {
                return BadRequest();
            }
            return Created(nameof(GetCategory), _mapper.Map<CategoryDto>(newCategory));
        }

        private int CreatePictureFromFileString(string fileString) {
            var newPicture = new Picture 
            {
                Name = fileString.Split('/')[^1],
                FileType = fileString.Split('.')[^1],
                Content = System.IO.File.ReadAllBytes(fileString)
            };
            var existingPicture = _pictureService.GetPictureByNameFormatContent(newPicture);
            if(existingPicture == null) {
                return _pictureService.PostPicture(newPicture).Id;
            }
            return existingPicture.Id;
        }

        private async Task<String> GetPictureContent(string pictureIdStr) {
            var iconPicture = await _pictureService.GetPicture(Int32.Parse(pictureIdStr));
            return System.Text.Encoding.Default.GetString(iconPicture.Content);
        }

        private async Task<CategoryDto> TransformCategoryDtoForOutput(CategoryDto categoryDto) {
            if(categoryDto != null) {
                categoryDto.Icon = await GetPictureContent(categoryDto.Icon);
                categoryDto.DefaultBackground = await GetPictureContent(categoryDto.DefaultBackground);
            }
            return categoryDto;
        }

        private async Task<LinkedList<CategoryDto>> TransformCategoryDtoListForOutput(IList<CategoryDto> categoryList) {
            LinkedList<CategoryDto> outputCategoryList = new LinkedList<CategoryDto>();
            foreach(CategoryDto categoryDto in categoryList) {
                outputCategoryList.AddLast(await TransformCategoryDtoForOutput(categoryDto));
            }
            return outputCategoryList;
        }

        private Category CreateCategory(CategoryDto categoryDto) {
            Category newCategory = new Category {
                Title = categoryDto.Title,
                IconId =  CreatePictureFromFileString(categoryDto.Icon),
                DefaultBackgroundId = CreatePictureFromFileString(categoryDto.DefaultBackground)
            };
            return newCategory;
        }
    }
}