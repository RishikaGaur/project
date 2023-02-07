#automatically finds distribution details
FROM node:12

#create directory named app
WORKDIR /app

#setup environmental variable
ENV NODE_ENV production

#install dependenies
COPY package*.json ./#view cluster
RUN npm install

#copy contents of current directory to app directory
#we do not want to copy node_module as it has versions based on os so we will ignore it
COPY . .

#globally install pm2, help in production of node project
RUN npm install -g pm2

#port application is running
EXPOSE 3000

#run command
CMD ["pm2-runtime","index.js"]


#go to aws
#1-set up container
#go to ECR
#create new repository named "try"
#view try
#run view push commands in cmd/vscode
#you will see that image of try will be created
#2- set up cluster-AWS fargate
#go to ECS
#create cluster-networking only
#create new task definition-name,task size,add container(image uri,port)
#view cluster-create new service(security group,load balancer)
#after this we will see a task is created
#view task -can access api using public IP or can use DNS of load balancer
#3-domain name for project
#Go to route 53
#hosted zones-create records
