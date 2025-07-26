import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { SignUpDto } from '../auth/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async isDatabaseEmpty(): Promise<boolean> {
    const userCount = await this.prisma.user.count();
    return userCount === 0;
  }

  private generateMockUser(index: number): SignUpDto & {
    firstName?: string;
    lastName?: string;
    location?: string;
    birthday?: Date;
    address?: string;
    country?: string;
    bio?: string;
  } {
    const firstNames = [
      'John',
      'Jane',
      'Michael',
      'Sarah',
      'David',
      'Emily',
      'James',
      'Emma',
      'Robert',
      'Olivia',
      'William',
      'Ava',
      'Richard',
      'Isabella',
      'Joseph',
      'Sophia',
      'Thomas',
      'Mia',
      'Christopher',
      'Charlotte',
      'Charles',
      'Amelia',
      'Daniel',
      'Harper',
      'Matthew',
      'Evelyn',
      'Anthony',
      'Abigail',
      'Mark',
      'Emily',
      'Donald',
      'Elizabeth',
      'Steven',
      'Sofia',
      'Paul',
      'Madison',
      'Andrew',
      'Avery',
      'Joshua',
      'Ella',
      'Kenneth',
      'Scarlett',
      'Kevin',
      'Grace',
      'Brian',
      'Chloe',
      'George',
      'Victoria',
      'Timothy',
      'Riley',
      'Ronald',
      'Aria',
      'Jason',
      'Lily',
      'Edward',
      'Aubrey',
      'Jeffrey',
      'Zoey',
      'Ryan',
      'Penelope',
      'Jacob',
      'Layla',
      'Gary',
      'Riley',
      'Nicholas',
      'Nora',
      'Eric',
      'Lily',
      'Jonathan',
      'Eleanor',
      'Stephen',
      'Hannah',
      'Larry',
      'Luna',
      'Justin',
      'Savannah',
      'Scott',
      'Brooklyn',
      'Brandon',
      'Leah',
      'Benjamin',
      'Zoe',
      'Frank',
      'Stella',
      'Gregory',
      'Hazel',
      'Raymond',
      'Violet',
      'Samuel',
      'Aurora',
      'Patrick',
      'Lucy',
      'Alexander',
      'Anna',
      'Jack',
      'Samantha',
      'Dennis',
      'Caroline',
      'Jerry',
      'Genesis',
      'Tyler',
      'Aaliyah',
      'Aaron',
      'Kennedy',
      'Jose',
      'Kinsley',
      'Adam',
      'Allison',
    ];

    const lastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
      'Rodriguez',
      'Martinez',
      'Hernandez',
      'Lopez',
      'Gonzalez',
      'Wilson',
      'Anderson',
      'Thomas',
      'Taylor',
      'Moore',
      'Jackson',
      'Martin',
      'Lee',
      'Perez',
      'Thompson',
      'White',
      'Harris',
      'Sanchez',
      'Clark',
      'Ramirez',
      'Lewis',
      'Robinson',
      'Walker',
      'Young',
      'Allen',
      'King',
      'Wright',
      'Scott',
      'Torres',
      'Nguyen',
      'Hill',
      'Flores',
      'Green',
      'Adams',
      'Nelson',
      'Baker',
      'Hall',
      'Rivera',
      'Campbell',
      'Mitchell',
      'Carter',
      'Roberts',
      'Gomez',
      'Phillips',
      'Evans',
      'Turner',
      'Diaz',
      'Parker',
      'Cruz',
      'Edwards',
      'Collins',
      'Reyes',
      'Stewart',
      'Morris',
      'Morales',
      'Murphy',
      'Cook',
      'Rogers',
      'Gutierrez',
      'Ortiz',
      'Morgan',
      'Cooper',
      'Peterson',
      'Bailey',
      'Reed',
      'Kelly',
      'Howard',
      'Ramos',
      'Kim',
      'Cox',
      'Ward',
      'Richardson',
      'Watson',
      'Brooks',
      'Chavez',
      'Wood',
      'James',
      'Bennett',
      'Gray',
      'Mendoza',
      'Ruiz',
      'Hughes',
      'Price',
      'Alvarez',
      'Castillo',
      'Sanders',
      'Patel',
      'Myers',
      'Long',
      'Ross',
      'Foster',
      'Jimenez',
      'Powell',
      'Jenkins',
      'Perry',
      'Russell',
    ];

    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[index % lastNames.length];
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${index + 1}`;
    const email = `${username}@example.com`;

    const cities = [
      'New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
      'Dallas',
      'San Jose',
      'Austin',
      'Jacksonville',
      'Fort Worth',
      'Columbus',
      'Charlotte',
      'San Francisco',
      'Indianapolis',
      'Seattle',
      'Denver',
      'Washington',
      'Boston',
      'El Paso',
      'Nashville',
      'Detroit',
      'Oklahoma City',
      'Portland',
      'Las Vegas',
      'Memphis',
      'Louisville',
      'Baltimore',
      'Milwaukee',
      'Albuquerque',
      'Tucson',
      'Fresno',
      'Sacramento',
      'Mesa',
      'Kansas City',
      'Atlanta',
      'Long Beach',
      'Colorado Springs',
      'Raleigh',
      'Miami',
      'Virginia Beach',
      'Omaha',
      'Oakland',
      'Minneapolis',
      'Tulsa',
      'Arlington',
      'Tampa',
      'New Orleans',
      'Wichita',
      'Cleveland',
      'Bakersfield',
    ];

    const countries = [
      'United States',
      'Canada',
      'United Kingdom',
      'Germany',
      'France',
      'Italy',
      'Spain',
      'Netherlands',
      'Belgium',
      'Switzerland',
      'Austria',
      'Sweden',
      'Norway',
      'Denmark',
      'Finland',
      'Poland',
      'Czech Republic',
      'Hungary',
      'Slovakia',
      'Slovenia',
      'Croatia',
      'Serbia',
      'Bulgaria',
      'Romania',
      'Greece',
      'Portugal',
      'Ireland',
      'Iceland',
      'Luxembourg',
      'Malta',
      'Cyprus',
      'Estonia',
      'Latvia',
      'Lithuania',
      'Australia',
      'New Zealand',
      'Japan',
      'South Korea',
      'Singapore',
      'Hong Kong',
      'Taiwan',
      'Israel',
    ];

    const bios = [
      'Passionate about technology and innovation',
      'Love traveling and exploring new cultures',
      'Fitness enthusiast and health advocate',
      'Creative artist and designer',
      'Business professional with a passion for growth',
      'Food lover and amateur chef',
      'Music enthusiast and concert goer',
      'Bookworm and literature lover',
      'Sports fan and team supporter',
      'Nature lover and outdoor enthusiast',
      'Photography hobbyist and visual storyteller',
      'Gaming enthusiast and tech geek',
      'Fashion lover and style influencer',
      'Pet lover and animal advocate',
      'Coffee addict and cafe explorer',
      'Yoga practitioner and wellness seeker',
      'Movie buff and film critic',
      'Craft beer enthusiast and brewery visitor',
      'Plant parent and gardening lover',
      'Adventure seeker and thrill chaser',
    ];

    const city = cities[index % cities.length];
    const country = countries[index % countries.length];
    const bio = bios[index % bios.length];

    // Generate random birthday between 18-65 years old
    const currentYear = new Date().getFullYear();
    const minAge = 18;
    const maxAge = 65;
    const randomAge =
      Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
    const birthYear = currentYear - randomAge;
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1;
    const birthday = new Date(birthYear, birthMonth - 1, birthDay);

    return {
      username,
      email,
      password: 'password123',
      firstName,
      lastName,
      location: city,
      birthday,
      address: `${Math.floor(Math.random() * 9999) + 1} ${['Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Maple Dr'][index % 5]}`,
      country,
      bio,
    };
  }

  async createMockUsers(count: number = 100): Promise<void> {
    this.logger.log(`Starting to create ${count} mock users...`);

    const isDatabaseEmpty = await this.isDatabaseEmpty();
    if (!isDatabaseEmpty) {
      this.logger.log('Database is not empty. Skipping seed creation.');
      return;
    }

    const usersToCreate = Array.from({ length: count }, (_, index) =>
      this.generateMockUser(index),
    );

    for (let i = 0; i < usersToCreate.length; i++) {
      try {
        const userData = usersToCreate[i];
        const hashPassword = await bcrypt.hash(userData.password, 10);

        // Use Prisma directly to create user with all fields
        await this.prisma.user.create({
          data: {
            username: userData.username,
            email: userData.email,
            password: hashPassword,
            firstName: userData.firstName,
            lastName: userData.lastName,
            location: userData.location,
            birthday: userData.birthday,
            address: userData.address,
            country: userData.country,
            bio: userData.bio,
          },
        });

        if ((i + 1) % 10 === 0) {
          this.logger.log(`Created ${i + 1} users...`);
        }
      } catch (error) {
        this.logger.error(`Failed to create user ${i + 1}: ${error.message}`);
      }
    }

    this.logger.log(`Successfully created ${count} mock users!`);
  }

  async runSeeds(): Promise<void> {
    this.logger.log('Running database seeds...');
    await this.createMockUsers(100);
    this.logger.log('Database seeds completed!');
  }
}
