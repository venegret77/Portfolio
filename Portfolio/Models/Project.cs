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
        public string Header { get; set; } // заголовок
        public string Body { get; set; } // описание
        public DateTime DateStart { get; set; } // дата начала
        public DateTime DateEnd { get; set; } // дата окончания
        public string Stack { get; set; }
    }
}
