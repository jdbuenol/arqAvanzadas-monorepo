FROM node:21
 
WORKDIR /app
 
COPY package.json .
 
RUN npm install
 
COPY . .

ENV NEXT_PUBLIC_STRIPE_KEY=pk_test_51P4tTPEssW8WFySdYQER6kKHWiTygdR8f61FN5mHf8Y6sA8k04ZcBYgvOkWPjuERLsGOd2NYn1AKPuKzbKsdQrTR00VxbNVBIw
ENV NEXT_PUBLIC_NODE_AMBASSADOR=http://35.226.5.41:8000
 
RUN npm run build
 
CMD ["npm", "run", "start"]