import { serveDir, serveFile } from "@std/http/file-server";

Deno.serve(async (req: Request) => {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // If requesting the root path, serve index.html
    if (pathname === "/" || pathname === "/index.html") {
        return await serveFile(req, "./index.html");
    }

    // For all other requests, try to serve files from the current directory
    try {
        return await serveDir(req, {
            fsRoot: ".",
            urlRoot: "",
            showDirListing: false,
            enableCors: true
        });
    } catch {
        // If file not found, serve index.html (for SPA routing)
        return await serveFile(req, "./index.html");
    }
});