using MongoDB.Bson.Serialization.Attributes;

namespace BeanScene.Model
{
    public class Category
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]

        public string? _id { get; set; }
        public string name { get; set; }

    }

}
