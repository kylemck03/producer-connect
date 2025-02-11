package main

import (
	// "context"
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type UserInfo struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name"`
	Email    string             `json:"email"`
	Password string             `json:"password"`
}

var collection *mongo.Collection

func main() {
	fmt.Println("Starting the application...")

	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file")
		log.Fatal("Error loading .env file")
		return
	}

	MONGODB_URI := os.Getenv(("MONGODB_URI"))
	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		fmt.Println("Error connecting to MongoDB:", err)
		log.Fatal("Error connecting to MongoDB")
		return
	}

	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		fmt.Println("Error pinging MongoDB:", err)
		log.Fatal("Error pinging MongoDB", err)
		return
	}

	fmt.Println("Connected to MongoDB!")
	collection = client.Database("golang_db").Collection("users")

	app := fiber.New()

	app.Get("api/v1/users", getUsers)
	app.Post("api/v1/users", createUser)
	app.Patch("api/v1/users/:id", updateUser)
	app.Delete("api/v1/users/:id", deleteUser)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(app.Listen(":" + port))
}

func getUsers(c *fiber.Ctx) error {
	var users []UserInfo

	cursor, err := collection.Find(context.Background(), bson.M{})

	// if users == nil {
	// 	return c.Status(404).JSON(fiber.Map{"error": "No users found"})
	// }

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Error fetching users"})
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var user UserInfo
		if err := cursor.Decode(&user); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Error decoding user"})
		}
		users = append(users, user)
	}

	return c.JSON(users)
}

func createUser(c *fiber.Ctx) error {
	user := new(UserInfo)

	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	if user.Name == "" || user.Email == "" || user.Password == "" {
		return c.Status(400).JSON(fiber.Map{"error": "All fields are required"})
	}

	result, err := collection.InsertOne(context.Background(), user)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Error creating user"})
	}

	user.ID = result.InsertedID.(primitive.ObjectID)
	return c.JSON(user)
}

func updateUser(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	user := new(UserInfo)
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	update := bson.M{
		"$set": bson.M{
			"name":     user.Name,
			"email":    user.Email,
			"password": user.Password,
		},
	}

	result, err := collection.UpdateOne(context.Background(), bson.M{"_id": objectID}, update)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Error updating user"})
	}

	if result.MatchedCount == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}

	return c.JSON(user)
}

func deleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	result, err := collection.DeleteOne(context.Background(), bson.M{"_id": objectID})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Error deleting user"})
	}

	if result.DeletedCount == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}

	return c.JSON(fiber.Map{"message": "User deleted successfully"})
}
