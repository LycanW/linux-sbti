# Static site: Nginx serves HTML/JS/CSS + PNG sprites only (no dev reference art in image).
FROM nginx:1.27-alpine

COPY deploy/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY index.html app.js style.css /usr/share/nginx/html/
COPY assets/sprites /usr/share/nginx/html/assets/sprites

EXPOSE 80
