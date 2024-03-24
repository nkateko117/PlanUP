using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PlanUP.Models
{
    public class StudentModule
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ModuleID { get; set; }
        public string ModuleName { get; set; }
       
        [ForeignKey("AppUser")]
        public string UserID { get; set; }
        public AppUser? User { get; set; }
    }
}