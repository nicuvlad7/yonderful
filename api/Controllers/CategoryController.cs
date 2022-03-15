using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using YonderfulApi.DTOs;
using YonderfulApi.Service;
using System.Drawing;

namespace YonderfulApi.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase 
    {
        //TODO

        private Image transformFileStringToImage(string fileString) {
            return Image.FromFile(fileString);
        }
    }
}