using MongoDB.Bson.Serialization.Attributes;

namespace BeanScene.Model
{
    public class Table
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string _id { get; set; }
        public string section { get; set; }
        public string code { get; set; }
    }
}
