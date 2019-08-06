using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Models
{
    public class ProjectAndPhotos
    {
        public Project Project { get; set; }
        public List<ProjectPhotos> ProjectPhotos { get; set; }
    }
}
