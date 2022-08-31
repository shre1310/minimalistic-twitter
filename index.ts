import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    //new user created
const newUser = await prisma.user.create({
    data:{
    email  : "heya@codefirst.io",
    username: "cashreap",
    
},
});
console.log("New User:");
console.log(newUser);

//new tweet created and link to the new user
const firstTweet = await prisma.tweet.create({
    data: {
        text: "New to twitter",
        userId: newUser.id,
    },
});
console.log("Fisrt tweet");
console.log(firstTweet);

//fetch the new user using its unique email address
// and fetch its tweets at the same time

const newUserWithTweets = await prisma.user.findUnique({
    where: {
        email: "heya@codefirst.io",
    },
    include: {tweets: true},
});
console.log("new user with tweets");
console.log(newUserWithTweets);
}

main()
.catch((e)=> {
    throw e;
})
.finally(async ()=> {
    await prisma.$disconnect();
})