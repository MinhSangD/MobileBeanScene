using BeanScene.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BeanScene.Controllers
{/// <summary>
/// A simple controller for Orders
/// </summary>
        [ApiController]
        [Route("[controller]")]
        public class OrdersController : ControllerBase
        {
            MongoClient client;
            string databaseName;
            //Get method is used to get all the categories from the mongo db database "Categories" collection

            //constructor
            public OrdersController(IOptions<BeanSceneDatabaseSettings> databaseSettings)
            {
                databaseName = databaseSettings.Value.DatabaseName;
                client = new MongoClient(databaseSettings.Value.ConnectionString);
            }

            [HttpGet]
            public IActionResult Get()
            {
                var collection = client.GetDatabase(databaseName).GetCollection<Order>("Orders").AsQueryable();

                return collection == null ? NotFound() : Ok(collection);
            }

            [HttpPost]
            public IActionResult Post(Order p)
            {
                var collection = client.GetDatabase(databaseName).GetCollection<Order>("Orders").AsQueryable().OrderByDescending(c => c.orderNo).FirstOrDefault();

                if (collection != null)
                {
                    p.orderNo = Convert.ToInt32(((Order)collection).orderNo) + 1;
                }

                client.GetDatabase(databaseName).GetCollection<Order>("Orders").InsertOne(p);

                return CreatedAtAction(nameof(Get), new { id = p._id }, p);
            }
            [HttpPut("{id}/status")]
            public IActionResult Put(string id, [FromBody] string status)
            {
                var filter = Builders<Order>.Filter.Eq("_id", id);
                if (filter is null) { return NotFound(); }
                var update = Builders<Order>.Update.Set("status", status);
                client.GetDatabase(databaseName).GetCollection<Order>("Orders").UpdateOne(filter, update);
                return Ok("Order Updated");
            }
    }
}
