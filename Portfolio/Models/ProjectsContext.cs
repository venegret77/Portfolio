using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Models
{
    public class ProjectsContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectPhotos> ProjectPhotos { get; set; }
        public ProjectsContext(DbContextOptions<ProjectsContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
