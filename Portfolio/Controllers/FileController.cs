using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Models;
using System.Web;
using Microsoft.AspNetCore.Hosting;


namespace Portfolio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly ProjectsContext db;
        IHostingEnvironment _appEnvironment;

        public FileController(ProjectsContext context, IHostingEnvironment appEnvironment)
        {
            db = context;
            _appEnvironment = appEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> AddFile([FromForm] FileModel model)
        {
            try
            {
                var filePath = "/files/" + model.Photo.FileName;
                var isExists = System.IO.File.Exists(_appEnvironment.WebRootPath + filePath);
                Random rnd = new Random();
                while (isExists == true)
                {
                    filePath = "/files/" + rnd.Next(100000, 999999).ToString() + model.Photo.FileName;
                    isExists = System.IO.File.Exists(_appEnvironment.WebRootPath + filePath);
                }
                using (var stream = new FileStream(_appEnvironment.WebRootPath + filePath, FileMode.Create))
                {
                    await model.Photo.CopyToAsync(stream);
                }
                await db.ProjectPhotos.AddAsync(new Models.ProjectPhotos
                {
                    PhotoRef = filePath,
                    PhotoName = model.Photo.FileName,
                    ProjectID = 0
                });
                await db.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest(); ;
            }
        }
    }
}