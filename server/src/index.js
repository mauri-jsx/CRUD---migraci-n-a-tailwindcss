import { app } from "./app.js";

//confiracion
app.set("port", process.env.PORT || 4000)


//servidor
app.listen(app.get("port"), () => {
    console.log(`SERVIDOR ANDANDO EN EL PUERTO ${app.get("port")}`);
});