FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG REACT_APP_BASE_API_URL
ARG REACT_APP_CLOUDINARY_CLOUD_NAME
ARG REACT_APP_CLOUDINARY_UPLOAD_PRESET
ENV REACT_APP_BASE_API_URL=$REACT_APP_BASE_API_URL
ENV REACT_APP_CLOUDINARY_CLOUD_NAME=$REACT_APP_CLOUDINARY_CLOUD_NAME
ENV REACT_APP_CLOUDINARY_UPLOAD_PRESET=$REACT_APP_CLOUDINARY_UPLOAD_PRESET
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY fullchain.pem /etc/nginx/ssl/fullchain.pem
COPY privkey.pem /etc/nginx/ssl/privkey.pem
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]