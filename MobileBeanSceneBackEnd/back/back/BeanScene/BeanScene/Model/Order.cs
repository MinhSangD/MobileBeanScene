using MongoDB.Bson.Serialization.Attributes;

namespace BeanScene.Model
{
    public class Order
    {
        
            [BsonId] 
            [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
            
            public string? _id { get; set; }
            public int orderNo { get; set; }

            public string status { get; set; }
            public string note { get; set; }
            public string name { get; set; }
            public string table { get; set; }
            public string dateTime { get; set; }

            public List<OrderItem> menuIds { get; set; }
    
    }
}
