import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";

export async function POST(req) {
    try {
        // Connect to the database
        await connectToDatabase();

        // Parse the request body
        const itemData = await req.json(); // Use .json() if the body is JSON

        console.log(itemData);
        

        // Create a new item
        const newItem = await Item.create(itemData);

        // Return the newly created item data
        return new Response(JSON.stringify(newItem), {
            status: 201, // 201 Created
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating item:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500, // Internal Server Error
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GET() {
    try {
        // Connect to the database
        await connectToDatabase();

        // Fetch all items
        const items = await Item.find(); // You can also use .find({}) to explicitly state you want all documents

        // Return the list of items
        return new Response(JSON.stringify(items), {
            status: 200, // OK
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching items:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500, // Internal Server Error
            headers: { 'Content-Type': 'application/json' },
        });
    }
}