using BeanScene.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
namespace BeanScene.Controllers
{/// <summary>
/// Get your table controlled with all the HTTP requests
/// </summary>
    [ApiController]
    [Route("[controller]")]
    public class TableController : Controller
    {

        MongoClient client;
        string databaseName;



        public TableController(IOptions<BeanSceneDatabaseSettings> databaseSettings)
        {
            databaseName = databaseSettings.Value.DatabaseName;
            client = new MongoClient(databaseSettings.Value.ConnectionString);
            var database = client.GetDatabase(databaseName);
            var collection = database.GetCollection<BsonDocument>("Table");

            for (int i = 1; i <= 10; i++)
            {
                var filter = Builders<BsonDocument>.Filter.Eq("code", "O" + i.ToString());
                var existingDocument = collection.Find(filter).FirstOrDefault();
                if (existingDocument == null)
                {
                    collection.InsertOne(new BsonDocument
        {
            { "code", "O" + i.ToString() },
            { "section", "Outside" }
        });
                }
            }
            for (int i = 1; i <= 10; i++)
            {
                var filter = Builders<BsonDocument>.Filter.Eq("code", "M" + i.ToString());
                var existingDocument = collection.Find(filter).FirstOrDefault();
                if (existingDocument == null)
                {
                    collection.InsertOne(new BsonDocument
        {
            { "code", "M" + i.ToString() },
            { "section", "Main" }
        });
                }
            }
            for (int i = 1; i <= 10; i++)
            {
                var filter = Builders<BsonDocument>.Filter.Eq("code", "B" + i.ToString());
                var existingDocument = collection.Find(filter).FirstOrDefault();
                if (existingDocument == null)
                {
                    collection.InsertOne(new BsonDocument
        {
            { "code", "B" + i.ToString() },
            { "section", "Balcony" }
        });
                }
            }
        }
        //https://www.youtube.com/watch?v=0fB9qg-oR04 showed me how to seed data ,I came up with the loop and then ChatGPT came up with the way to check if the collection already has the seeded data
        [HttpGet]
        public IActionResult Get()
        {
            var collection = client.GetDatabase(databaseName).GetCollection<Table>("Table").AsQueryable();
            return collection == null ? NotFound() : Ok(collection);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var collection = client.GetDatabase(databaseName).GetCollection<Table>("Table");
            var filter = Builders<Table>.Filter.Eq("_id", id);
            collection.DeleteOne(filter);
            return filter == null ? NotFound() : Ok(filter);
        }

        [HttpPost]
        public IActionResult Post(Table table)
        {
            client.GetDatabase(databaseName).GetCollection<Table>("Table").InsertOne(table);
            return CreatedAtAction(nameof(Get), new { id = table._id }, table);
        }
        
    }
}
