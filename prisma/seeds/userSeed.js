import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedUsers() {
  const newUser = await prisma.user.create({
    data: {
      first_name: 'Md. Rafidul',
      last_name: 'Islam',
      occupation: 'Software Engineer',
      phone: '+8801111111111',
      email: 'rafidul@example.com',
      dob: new Date('1997-11-12'),
      nationality: 'Bangladeshi',
      address: 'Patiya, Chittagong',
      password_hash: 'hashed_password', // Replace with an actual hashed password
      self_introduction: 'Hello, I am Rafidul!',
      skill_description: 'Experienced in software development.',
      languages: {
        create: [
          { language_name: 'English' },
          { language_name: 'Bengali' },
        ],
      },
      // Add other related models if needed
    },
  });

  console.log('User created:', newUser);
}

export default seedUsers; // Add this line

seedUsers()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
