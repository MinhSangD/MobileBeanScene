using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using BeanScene.Model;
using Microsoft.AspNetCore.Authorization;
using BCrypt.Net;
namespace BeanScene.Controllers
{/// <summary>
/// Staff controller that would help you control staff data
/// </summary>
    [Authorize("BasicAuthentication")]
    [ApiController]

    [Route("[controller]")]
    public class StaffController : Controller
    {
        MongoClient client;
        string databaseName;

        public StaffController(IOptions<BeanSceneDatabaseSettings> databaseSettings)
        {
            databaseName = databaseSettings.Value.DatabaseName;
            client = new MongoClient(databaseSettings.Value.ConnectionString);
        }
        //GET staff data from database
        [HttpGet]
        public IActionResult Get()
        {
            var collection = client.GetDatabase(databaseName).GetCollection<Staff>("Staff").AsQueryable();
            return collection == null ? NotFound() : Ok(collection);
        }
        //find and verify staff
        [HttpGet("{username}/{password}")]
        public IActionResult Get(string username, string password)
        {
            var collection = client.GetDatabase(databaseName).GetCollection<Staff>("Staff");

            var filter = collection.Find(x => x.username == username && x.password == password).FirstOrDefault();
            return filter == null ? NotFound() : Ok(filter);
        }
        //delete staff
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var collection = client.GetDatabase(databaseName).GetCollection<Staff>("Staff");
            var filter = Builders<Staff>.Filter.Eq("_id", id);
            collection.DeleteOne(filter);
            return filter == null ? NotFound() : Ok(filter);
        }
        //update staff data
        [HttpPut]
        public IActionResult Put(Staff staff)
        {
            var filter = Builders<Staff>.Filter.Eq("_id", staff._id);
            if (filter is null)
            {
                return NotFound();
            }
            var update = Builders<Staff>.Update.Set("firstname", staff.firstname).Set("lastname", staff.lastname).Set("password", staff.password).Set("role", staff.role).Set("username", staff.username).Set("email", staff.email);
            client.GetDatabase(databaseName).GetCollection<Staff>("Staff").UpdateOne(filter, update);


            return Ok("successfully modified");

        }
        //create new staff
        [HttpPost]
        public IActionResult Post(Staff staff)
        {
            client.GetDatabase(databaseName).GetCollection<Staff>("Staff").InsertOne(staff);
            return CreatedAtAction(nameof(Get), new { id = staff._id }, staff);
        }
        ///Hashing the password
        //[HttpPost]
        //public IActionResult Post(Staff staff)
        //{
        //    string hashedPassword = BCrypt.Net.BCrypt.HashPassword(staff.password);
        //    staff.password = hashedPassword;
        //    client.GetDatabase(databaseName).GetCollection<Staff>("Staff").InsertOne(staff);
        //    return CreatedAtAction(nameof(Get), new { id = staff._id }, staff);
        //}
    }
}
