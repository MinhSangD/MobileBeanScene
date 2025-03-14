using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using BeanScene.Model;
namespace BeanScene.Controllers
{/// <summary>
/// Control All the yummy dishes here 
/// </summary>
    [ApiController]
    [Route("[controller]")]
    public class MenuController : Controller
    {
        MongoClient client;
        string databaseName;
        //Get method is used to get all the products from the mongodb database "Products" collection 
        // constructor
        public MenuController(IOptions<BeanSceneDatabaseSettings> databaseSettings)
        {
            databaseName = databaseSettings.Value.DatabaseName;
            client = new MongoClient(databaseSettings.Value.ConnectionString);
        }
        [HttpGet]
        public IActionResult Get()
        {
            var collection = client.GetDatabase(databaseName).GetCollection<Menu>("Menu").AsQueryable();
            return collection == null ? NotFound() : Ok(collection);
        }
        [HttpPut]
        public IActionResult Put(Menu menu)
        {
            var filter = Builders<Menu>.Filter.Eq("_id", menu._id);
            if (filter is null)
            {
                return NotFound();
            }
            var update = Builders<Menu>.Update.Set("name", menu.name).Set("description", menu.description).Set("price", menu.price).Set("stock", menu.stock).Set("category", menu.category);
            client.GetDatabase(databaseName).GetCollection<Menu>("Menu").UpdateOne(filter, update);


            return Ok("successfully modified");

        }
        [HttpPost]
        public IActionResult Post(Menu menu)
        {
            client.GetDatabase(databaseName).GetCollection<Menu>("Menu").InsertOne(menu);
            return CreatedAtAction(nameof(Get), new { id = menu._id }, menu);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var collection = client.GetDatabase(databaseName).GetCollection<Menu>("Menu");
            var filter = Builders<Menu>.Filter.Eq("_id", id);
            collection.DeleteOne(filter);
            return filter == null ? NotFound() : Ok(filter);
        }

        [HttpGet("{nameMatch?}/{categoryMatch?}")]
        public IActionResult Get(string? nameMatch, string? categoryMatch)
        {
            var collection = client.GetDatabase(databaseName).GetCollection<Menu>("Menu");
            var filteredList = collection.AsQueryable();

            // Filter by category if categoryMatch is provided
            if (!string.IsNullOrEmpty(categoryMatch))
            {
                filteredList = filteredList.Where(x => x.category.ToLower().Contains(categoryMatch.ToLower()));
            }

            // Filter by name if nameMatch is provided
            if (!string.IsNullOrEmpty(nameMatch))
            {
                filteredList = filteredList.Where(x => x.name.ToLower().Contains(nameMatch.ToLower()));
            }

            return filteredList.Any() ? Ok(filteredList) : NotFound();
        }

    }
}
