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
            var categoryDto = transformCategoryDtoForOutput(_mapper.Map<CategoryDto>(category));
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
            return Ok(transformCategoryDtoListForOutput(categoryDtoList));
        }

        [HttpPost]
        public async Task<IActionResult> PostCategory(CategoryDto category) 
        {   
            var iconId = createPictureFromFileString(category.Icon);
            var defaultBackgroundId = createPictureFromFileString(category.DefaultBackground);
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

        [HttpPut]
        public async Task<ActionResult> PutCategory(int categoryId, CategoryDto updatedCategory) {
            var iconId = createPictureFromFileString(updatedCategory.Icon);
            var defaultBackgroundId = createPictureFromFileString(updatedCategory.DefaultBackground);
            var newCategory = await _categoryService.PutCategory(categoryId, updatedCategory.Title, iconId, defaultBackgroundId);
            if(newCategory == null) {
                return BadRequest();
            }
            return Created(nameof(GetCategory), _mapper.Map<CategoryDto>(newCategory));
        }

        private int createPictureFromFileString(string fileString) {
            string fileName = fileString.Split('/')[^1];
            string fileType = fileString.Split('.')[^1];
            byte[] content = System.IO.File.ReadAllBytes(fileString);
            
            var newPicture = _pictureService.GetPictureByNameFormatContent(fileName, fileType, content);

            if(newPicture == null) {
                return _pictureService.PostPicture(fileName, fileType, content).Id;
            }
            return newPicture.Id;
        }

        private async Task<String> getPictureContent(string pictureIdStr) {
            var iconPicture = await _pictureService.GetPicture(Int32.Parse(pictureIdStr));
            return System.Text.Encoding.Default.GetString(iconPicture.Content);
        }

        private async Task<CategoryDto> transformCategoryDtoForOutput(CategoryDto categoryDto) {
            if(categoryDto != null) {
                categoryDto.Icon = await getPictureContent(categoryDto.Icon);
                categoryDto.DefaultBackground = await getPictureContent(categoryDto.DefaultBackground);
            }
            return categoryDto;
        }

        private async Task<LinkedList<CategoryDto>> transformCategoryDtoListForOutput(IList<CategoryDto> categoryList) {
            LinkedList<CategoryDto> outputCategoryList = new LinkedList<CategoryDto>();
            foreach(CategoryDto categoryDto in categoryList) {
                outputCategoryList.AddLast(await transformCategoryDtoForOutput(categoryDto));
            }
            return outputCategoryList;
        }
    }
}