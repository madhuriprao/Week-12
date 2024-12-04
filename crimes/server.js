import express from "express";
import axios  from "axios";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const PORT = 3000;

// Load Swagger YAML
const swaggerDocument = YAML.load("swagger.yaml");

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/crimes", async(req, res) => {
    try{
        const response = await axios.get("https://brottsplatskartan.se/api/events/?location=stockholm")
        res.json(response.data.data[0].headline);
        // console.log(response.data.data[0].headline);  // debbuging was done here. 
        console.log(response.data.data[0].headline); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching data." });
        }
});

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
})