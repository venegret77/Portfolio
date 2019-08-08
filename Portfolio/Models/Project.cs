using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Models
{
    public class Project
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Header { get; set; } // заголовок
        [Required]
        public string Body { get; set; } // описание
        [Required]
        public DateTime DateStart { get; set; } // дата начала
        [Required]
        public DateTime DateEnd { get; set; } // дата окончания
        [Required]
        public string Stack { get; set; }
        [Required]
        public int UserID { get; set; }
    }
}
