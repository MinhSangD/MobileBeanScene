using MongoDB.Bson.Serialization.Attributes;

namespace BeanScene.Model
{
    public class Staff
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? _id { get; set; }
        public string email { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string password { get; set; }
        public string role { get; set; }
        public string username { get; set; }

    }
}
