import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve static images from the public/images directory.
    "/images/*": (req) => {
      const path = new URL(req.url).pathname.slice("/images/".length);
      return new Response(Bun.file(`./public/images/${path}`));
    },

    // Serve icons from the public/icons directory.
    "/icons/*": (req) => {
      const path = new URL(req.url).pathname.slice("/icons/".length);
      return new Response(Bun.file(`./public/icons/${path}`));
    },

    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
