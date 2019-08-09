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
    public class RegistrationController : ControllerBase
    {
        private ProjectsContext db;
        IHostingEnvironment _appEnvironment;

        public RegistrationController(ProjectsContext context, IHostingEnvironment appEnvironment)
        {
            db = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/Registration/CheckLogin
        [HttpGet("[action]")]
        public bool CheckLogin(string login)
        {
            var user = db.Users.Where(u => u.Login == login).ToList();
            if (user.Count == 1)
                return true;
            else
                return false;
        }

        // POST: api/Registration
        [HttpPost]
        public async Task<IActionResult> Registration([FromForm] RegistrationModel model)
        {
            var filePath = "/files/" + model.Photo.FileName;
            using (var stream = new FileStream(_appEnvironment.WebRootPath + filePath, FileMode.Create))
            {
                await model.Photo.CopyToAsync(stream);
            }
            await db.Users.AddAsync(new Models.User
            {
                PhotoRef = filePath,
                Name = model.Name,
                Login = model.Login,
                Password = model.Password,
                Description = model.Description,
                Email = model.Email,
                Stack = model.Stack
            });
            await db.SaveChangesAsync();
            await Authenticate(model.Login); // аутентификация
            return Ok();
        }

        private async Task Authenticate(string userName)
        {
            // создаем один claim
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
            };
            // создаем объект ClaimsIdentity
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            // установка аутентификационных куки
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}