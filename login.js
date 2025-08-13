import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERNAME = "admin";
const PASSWORD = "12345";

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      serveFile("index.html", "text/html", res);
    } else if (req.url === "/index.js") {
      serveFile("index.js", "application/javascript", res);
    }
    else if (req.url === "/dashboard.js"){
        serveFile("dashboard.js","application/javascript",res);
    } else if (req.url==="/logout"){
         
         res.writeHead(302, { Location: "/" ,
            "Set-Cookie":"auth=false; HttpOnly= true; Path=/; Max-Age=3600"
    }); // Redirect to same page
           res.end();
           
}else if (req.url === "/dashboard") {
      const cookies = parseCookies(req);
      if (cookies.auth !== "true") {
        
      
        // Not authenticated, redirect to login page
        res.writeHead(302, { Location: "/" });
        res.end();
      }
      serveFile("dashboard.html", "text/html", res);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  } else if (req.method === "POST" && req.url === "/login") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const { username, password } = JSON.parse(body);
        if (username === USERNAME && password === PASSWORD) {
          res.writeHead(200, {
            "Content-Type": "application/json",
            "Set-Cookie": "auth=true; HttpOnly; Path=/; Max-Age=3600", // 1 hour expiry
          });
          res.end(JSON.stringify({ success: true, message: "Login successful!" }));
        } else {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, message: "Invalid credentials" }));
        }
      } catch {
        res.writeHead(400);
        res.end("Bad Request");
      }
    });
  }
});

// Helper to parse cookies from request header
function parseCookies(req) {
  const list = {};
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(";").forEach(cookie => {
    let [name, ...rest] = cookie.split("=");
    name = name?.trim();
    if (!name) return;
    const value = rest.join("=").trim();
    list[name] = decodeURIComponent(value);
  });
  return list;
}

function serveFile(fileName, contentType, res) {
  const filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading file");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
}

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});




