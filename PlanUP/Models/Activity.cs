using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PlanUP.Models
{
    public class Activity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ActivityID { get; set; }
        public string ActivityName { get; set; }
        public string ActivityType { get; set; }
        public float? Grade { get; set; }
        public DateTime Date { get; set; }

        [ForeignKey("AppUser")]
        public string UserID { get; set; }
        public AppUser? User { get; set; }

        [ForeignKey("StudentModule")]
        public int ModuleID { get; set; }
        public StudentModule? StudentModule { get; set; }

    }
}
