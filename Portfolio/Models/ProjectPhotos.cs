using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Models
{
    public class ProjectPhotos
    {
        [Key]
        public int PhotoID { get; set; }
        public int ProjectID { get; set; } // id проекта
        public string PhotoRef { get; set; } // ссылка
        public string PhotoName { get; set; } // подпись
    }
}
