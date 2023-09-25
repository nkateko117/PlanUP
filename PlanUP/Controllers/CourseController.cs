using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlanUP.DbContext;
using PlanUP.Models;
using System.Data;

namespace PlanUP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        protected readonly DataContext _appDbContext;

        public CourseController(DataContext appDbContext) 
        {
            _appDbContext = appDbContext;
        }

        [HttpGet("GetAllModules")]
        public async Task<IActionResult> GetAllModules()
        {
            try
            {
                var results = await _appDbContext.StudentModule.ToListAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Could not retrieve Student Modules");
            }
        }

        [HttpGet("GetStudentModules/{userId}")]
        public async Task<IActionResult> GetStudentModules(string userId)
        {
            try
            {
                var results = await _appDbContext.StudentModule.Where(a => a.UserID == userId).ToListAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Could not retrieve Student Modules" );
            }
        }

        [HttpGet("GetActivities/{userId}")]
        public async Task<IActionResult> GetActivities(string userId)
        {
            try
            {
                var results = await _appDbContext.Activity.Where(a => a.UserID == userId).ToListAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Could not retrieve Student Activities" });
            }
        }

        [HttpPost]
        [Route("AddModule")]
        public async Task<ActionResult> AddModule(StudentModule module)
        {
            try
            {
                _appDbContext.Set<StudentModule>().Add(module);
                await _appDbContext.SaveChangesAsync();
                return Ok(new { message = "Module Added" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "There was an error adding module." });
            }
        }

        [HttpPost]
        [Route("AddActivity")]
        public async Task<ActionResult> AddActivity(Activity activity)
        {
            try
            {
                _appDbContext.Set<Activity>().Add(activity);
                await _appDbContext.SaveChangesAsync();
                return Ok(new { message = activity.ActivityType + " Added" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "There was an error adding activity." });
            }
        }

        [HttpPut("UpdateModule/{id}")]
        public async Task<IActionResult> UpdateModule(int id, [FromBody] StudentModule module)
        {
            try
            {
                var existingModule = _appDbContext.StudentModule.Where(a => a.ModuleID == id).FirstOrDefault();
                if (existingModule == null)
                {
                    return NotFound(new { message = "Could not find module from the database, try again later" });
                }
                _appDbContext.Attach(existingModule);
                existingModule.ModuleName = module.ModuleName;
                await _appDbContext.SaveChangesAsync();
                return Ok(new { message = "Module updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "There was an error updating module." });
            }
        }

        [HttpPut("UpdateActivity/{id}")]
        public async Task<IActionResult> UpdateActivity(int id, [FromBody] Activity activity)
        {
            try
            {
                var existingActivity = _appDbContext.Activity.Where(a => a.ActivityID == id).FirstOrDefault();
                if (existingActivity == null)
                {
                    return NotFound(new { message = "Could not find activity in the database, try again later" });
                }
                _appDbContext.Attach(existingActivity);
                existingActivity.ActivityName = activity.ActivityName;
                existingActivity.ActivityType = activity.ActivityType;
                existingActivity.ModuleID = activity.ModuleID;
                existingActivity.Date = activity.Date;
                existingActivity.Color = activity.Color;
                existingActivity.Grade = activity.Grade;
                existingActivity.isComplete=activity.isComplete;
                await _appDbContext.SaveChangesAsync();
                return Ok(new { message = activity.ActivityName + " updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "There was an error updating activity." });
            }
        }

        [HttpDelete]
        [Route("DeleteModule/{id}")]
        public async Task<IActionResult> DeleteModule(int id)
        {
            try
            {
                var module = _appDbContext.StudentModule.Where(a=>a.ModuleID== id).FirstOrDefault();

                if (module == null)
                {
                    return NotFound(new { message = "Could not find module in the database, try again later" });
                }

                _appDbContext.Set<StudentModule>().Remove(module);
                await _appDbContext.SaveChangesAsync();

                return Ok(new { message = "Module Deleted Successfully" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "There was an error deleting module." });
            }
        }

        [HttpDelete]
        [Route("DeleteActivity/{id}")]
        public async Task<IActionResult> DeleteActivity(int id)
        {
            try
            {
                var activity = _appDbContext.Activity.Where(a => a.ActivityID == id).FirstOrDefault();

                if (activity == null)
                {
                    return NotFound(new { message = "Could not find activity in the database, try again later" });
                }

                _appDbContext.Set<Activity>().Remove(activity);
                await _appDbContext.SaveChangesAsync();

                return Ok(new { message = "Activity Deleted Successfully" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "There was an error deleting activity." });
            }
        }
    }
}
