### 1. **Explain what are prototypes and how does class inheritance make use of them?**

Prototypes allow objects in JavaScript to inherit properties and methods from other objects. When a class or object is created, it’s associated with a prototype, which acts as a "template" for that object. This helps save memory because all objects of the same class can share methods and properties instead of duplicating them. With class inheritance, the new class inherits the prototype of the original class, allowing you to efficiently reuse code.

---

### 2. **When starting a new project how would you choose between OOP and Functional Programming?**

The choice between **OOP** and **Functional Programming** depends heavily on the project’s complexity and technical requirements. For instance, if the project involves complex data structures or has many interacting entities, OOP is ideal because it organizes code around objects with clear states and behaviors. However, for simpler applications or when transforming data is more important than dealing with objects, **Functional Programming** is preferable as it makes it easier to avoid side effects and work with pure functions. It all depends on how dynamic the logic is and how you expect it to scale over time.

---

### 3. **How does `Proxy` work in TypeScript and when is it useful?**

The **Proxy** in TypeScript is incredibly useful when you need to intercept and redefine an object's behavior at runtime. Essentially, it allows you to "listen" to interactions with an object and modify how its properties or methods respond. I use it a lot in APIs, where it's easier to intercept certain kinds of objects to manipulate them before processing. It’s perfect for scenarios where you need fine control over how an object is accessed or modified without changing the base code of the original object.

---

### 4. **What patterns/practices/tools would you use to implement simple cache for NoSQL database?**

For caching in **NoSQL** databases, I generally prefer keeping it simple by using **localStorage** or **sessionStorage** in web applications. However, for caching more intensive and concurrent queries, tools like **Redis** can be very useful for improving query performance. Redis is easy to integrate with NoSQL databases like **MongoDB** and allows you to store temporary data in memory, optimizing access to frequently requested data.

---

### 5. **What libraries do you consider necessary for any application? Which ones do you use most commonly?**

I always use essential libraries like **Axios** for handling HTTP requests quickly and flexibly. For the backend, **Express.js** is my go-to for its simplicity and flexibility, while on the frontend I prefer **React** for creating dynamic interfaces. Additionally, **JWT** is used for handling secure authentication, **Jest** for unit testing, **Sequelize** for managing SQL databases, and **Dotenv** for environment variable management.

---

### 6. **How would you choose a backend? When would you use HTTP server, serverless functions, or Websockets?**

The choice of backend depends greatly on the type of application and its needs. I would use a standard HTTP backend when I need to create a **REST API** that is straightforward and easy to maintain, for example, when the client only requires occasional requests. For smaller projects or those with low concurrency, **serverless** services like **AWS Lambda** are great as they optimize costs and scale automatically. For applications needing real-time interactions, such as constant data updates or push notifications, **WebSockets** are ideal because they enable bidirectional communication in real-time between the server and client.

---

### 7. **Code explanation**

The issue here was that the `getId` method was losing the `this` context when extracted via destructuring. I changed the method to an **arrow function**, which automatically retains the `this` context. This ensures that the `lastId` variable is correctly incremented and referenced each time `getId` is called.
