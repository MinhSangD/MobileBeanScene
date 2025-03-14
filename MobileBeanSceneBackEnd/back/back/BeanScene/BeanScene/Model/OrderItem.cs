using MongoDB.Bson.Serialization.Attributes;

namespace BeanScene.Model
{
    public class OrderItem
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? _id { get; set; }

        public int quantity { get; set; }
    }
}
