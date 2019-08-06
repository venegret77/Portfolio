using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Models;

namespace Portfolio.Controllers
{
    /// <summary>
    /// Основной контроллер
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly ProjectsContext db; //контекст
        /// <summary>
        /// Конструктор
        /// </summary>
        /// <param name="context">Контекст данных</param>
        public MainController(ProjectsContext context) => db = context;
        /// <summary>
        /// Запрос на получение данных о проектах
        /// </summary>
        /// <returns>Возвращает все проекты</returns>
        [HttpGet("[action]")]
        async public Task<IEnumerable<UserProjectsWithPhoto>> GetProjects()
        {
            List<UserProjectsWithPhoto> Result = new List<UserProjectsWithPhoto>();
            var _User = await db.Users.FirstOrDefaultAsync(u => u.Login == User.Identity.Name);
            var _Projects = await db.UserProjects.Where(p => p.IdUser == _User.ID).ToListAsync();
            foreach (var p in _Projects)
            {
                var proj = await db.Projects.FirstOrDefaultAsync(pr => pr.ID == p.IdProject);
                Result.Add(new UserProjectsWithPhoto
                {
                    Project = proj,
                    ProjectPhotos = await db.ProjectPhotos.Where(ph => ph.ProjectID == proj.ID).ToListAsync()
                });
            }
            return Result;
        }
        [HttpGet("[action]")]
        async public Task<User> GetUser()
        {
            if (User.Identity.Name != null)
                return await db.Users.FirstOrDefaultAsync(u => u.Login == User.Identity.Name);
            return new User();
        }
    }
}