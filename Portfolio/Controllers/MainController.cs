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
        public IEnumerable<ProjectAndPhotos> GetProjects()
        {
            List<ProjectAndPhotos> Result = new List<ProjectAndPhotos>();
            foreach (var p in db.Projects)
            {
                Result.Add(new ProjectAndPhotos
                {
                    Project = p,
                    ProjectPhotos = db.ProjectPhotos.Where(ph => ph.ProjectID == p.ID).ToList()
                });
            }
            return Result;
        }
    }
}