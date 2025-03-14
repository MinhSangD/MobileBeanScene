using Microsoft.AspNetCore.Mvc;
using BeanScene.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;



namespace BeanScene.Controllers
{/// <summary>
/// Food category controller, how cool is that 
/// </summary>
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : Controller
    {
        MongoClient client;
        string databaseName;
        //Get method is used to get all the products from the mongodb database "Products" collection 
        // constructor
        public CategoryController(IOptions<BeanSceneDatabaseSettings> databaseSettings)
        {
            databaseName = databaseSettings.Value.DatabaseName;
            client = new MongoClient(databaseSettings.Value.ConnectionString);
            var database = client.GetDatabase(databaseName);
            var collection = database.GetCollection<BsonDocument>("Categories");
            string[] cat = new string[6] { "entrees", "mains", "desserts", "drinks", "sides", "specials" };
            for (int i = 0 ; i < cat.Length; i++)
            {
                var filter = Builders<BsonDocument>.Filter.Eq("name", cat[i]);
                var existingDocument = collection.Find(filter).FirstOrDefault();
                if (existingDocument == null)
                {
                    collection.InsertOne(new BsonDocument
        {
            { "name", cat[i] }
        });
                }
            }

        }
        [HttpGet]
        public IActionResult Get()
        {
            var collection = client.GetDatabase(databaseName).GetCollection<Category>("Categories").AsQueryable();
            return collection == null ? NotFound() : Ok(collection);
        }
        [HttpPut]
        public IActionResult Put(Category category)
        {
            var filter = Builders<Category>.Filter.Eq("_id", category._id);
            if (filter is null)
            {
                return NotFound();
            }
            var update = Builders<Category>.Update.Set("name", category.name);
            client.GetDatabase(databaseName).GetCollection<Category>("Categories").UpdateOne(filter, update);
            return Ok("successfully modified");
        }
        [HttpPost]
        public IActionResult Post(Category category)
        {
            client.GetDatabase(databaseName).GetCollection<Category>("Categories").InsertOne(category);
            return CreatedAtAction(nameof(Get), new { id = category._id }, category);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var collection = client.GetDatabase(databaseName).GetCollection<Menu>("Categories");
            var filter = Builders<Menu>.Filter.Eq("_id", id);
            collection.DeleteOne(filter);
            return filter == null ? NotFound() : Ok(filter);
        }
        [HttpGet("items/{categoryMatch}")]// building url with item/category name
        public IActionResult GetItemsByCategory(string categoryMatch) //pass in category not null 
        {
            var collection = client.GetDatabase(databaseName).GetCollection<Menu>("Menu");// get all menu instance 
            var filteredList = collection.AsQueryable().Where(x => x.category.ToLower().Contains(categoryMatch.ToLower()));// find all item in menu that has the category name

            return filteredList.Any() ? Ok(filteredList) : NotFound();//just a standard return 
        }
        /// this code was supported by chatGPT, I made some adjustment to it but overall I understand it and it's main function is to separate it from menu find items, 
        /// The main finding menu item in menu was working fine with both item and category, just item, or no item and no category.
        /// this is used to find edge case no item and category 
    }
}

