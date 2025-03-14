using MongoDB.Bson.Serialization.Attributes;

namespace BeanScene.Model
{
    public class Menu
    {
        [BsonId]
        //we are making the is property_id as the primary key

        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)] // it is allowing to pass the parameter as type string instead of object id
        //mongodb will handle the conversion from string into object id

        public string? _id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string price { get; set; }
        public string stock { get; set; }

        public string category { get; set; }

    }
}
